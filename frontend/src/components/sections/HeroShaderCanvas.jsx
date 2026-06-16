import { useEffect, useRef, useState } from "react";

/**
 * Layer 0 — Magical entrance (WebGL2 raymarch)
 * Ported from CodePen "Dark City Ambience" by Matthias Hurrle (@atzedent) — zxKmgpj.
 * Warm volumetric scene that resolves out of black, with gentle pointer parallax.
 * Tuned toward the terracotta accent; degrades to a warm gradient when WebGL2 is absent.
 */

const VERT = `#version 300 es
precision highp float;
in vec4 position;
void main(){ gl_Position = position; }`;

const FRAG = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec2 move;
uniform vec2 wheel;
#define FC gl_FragCoord.xy
#define R resolution
#define T (25.+time)
#define S smoothstep
#define N normalize
#define MN min(R.x,R.y)
#define rnd(p) fract(sin(dot(p,vec2(12.9898,78.233)))*345678.)
#define rot(a) mat2(cos((a)-vec4(0,11,33,0)))
float box(vec3 p, vec3 s, float r) {
  p=abs(p)-s+r;
  return length(max(p,.0))+min(.0,max(max(p.x,p.y),p.z))-r;
}
float map(vec3 p) {
  vec3 q=cos(p*1.8+5e2);
  float s=sign(p.y);
  p.y=abs(p.y)-2.5;
  vec2 id=floor(p.xz-s);
  if (mod(id.y,2.)==.0) { p.x-=T*.5; id.x=floor(p.x-s); }
  float f=1.-dot(abs(fract(p*42.)-.5)-.25,vec3(1))*.5;
  p.xz=fract(p.xz-s)-.5;
  return box(p,vec3(.1+.3*rnd(id),2.-.6*rnd(id),.2),f*f*.0125)-1e-3*f;
}
vec3 norm(vec3 p) {
  float h=1e-3;
  vec2 k=vec2(-1,1);
  return N(
    k.xyy*map(p+k.xyy*h)+
    k.yxy*map(p+k.yxy*h)+
    k.yyx*map(p+k.yyx*h)+
    k.xxx*map(p+k.xxx*h)
  );
}
bool march(inout vec3 p, vec3 rd, out float dd) {
  for (int i; i++<400;) {
    float d=map(p);
    if (abs(d)<1e-3) return true;
    if (dd>15.) return false;
    p+=rd*d*.5; dd+=d*.5;
  }
}
float occ(vec3 p, vec3 n, float d) { return clamp(map(p+n*d)/d,.0,1.); }
vec3 dir(vec2 uv, vec3 p, vec3 t, float z) {
  vec3 up=vec3(0,1,0), f=N(t-p), r=N(cross(up,f)), u=N(cross(f,r));
  return mat3(r,u,f)*N(vec3(uv,z));
}
void cam(inout vec3 p) { p.xz*=rot(.2-move.x/MN+.2*T*.01); }
vec3 render(vec2 uv) {
  vec3 col=vec3(0), p=vec3(0,-.3,-23.5-wheel.y/MN-1e2*sin(T*5e-3));
  cam(p);
  vec3 rd=dir(uv,p,vec3(0,5.5,0),1.2), lp=p;
  lp.z+=.5;
  float dd;
  if (march(p,rd,dd)) {
    vec3 n=norm(p), l=N(lp-p);
    float dif=clamp(dot(l,n),.0,1.),
      spe=pow(clamp(dot(N(lp-rd),n),.0,1.),21.),
      ao=occ(p,n,.5)*.8*occ(p,n,1.),
      ld=distance(lp,p),
      atten=1./(1.+ld*.25+ld*ld*.125);
    vec3 mat=vec3(4.4,1.5,.55);
    col+=.08+dif*mat*ao*atten;
    col+=spe*atten;
  }
  col=mix(vec3(0),col,exp(-125e-5*dd*dd*dd));
  col=tanh(col*col);
  col=sqrt(col);
  col=mix(vec3(0),col,min(time*.3,1.));
  vec2 c=FC/R;
  c*=1.-c.yx;
  float vig=c.x*c.y*25.;
  vig=pow(vig,.5);
  col*=vig;
  return col;
}
void main() {
  vec2 uv=(FC-.5*R)/MN;
  vec3 col=render(uv);
  O=vec4(col,1);
}`;

function createProgram(gl) {
  const vs = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vs, VERT);
  gl.compileShader(vs);
  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fs, FRAG);
  gl.compileShader(fs);
  if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
    console.warn("Hero shader compile failed:", gl.getShaderInfoLog(fs));
    return null;
  }
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  return program;
}

export default function HeroShaderCanvas() {
  const canvasRef = useRef(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      setSupported(false);
      return;
    }

    const program = createProgram(gl);
    if (!program) {
      setSupported(false);
      return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    );
    gl.useProgram(program);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "resolution");
    const uTime = gl.getUniformLocation(program, "time");
    const uMove = gl.getUniformLocation(program, "move");
    const uWheel = gl.getUniformLocation(program, "wheel");

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Cap device pixel ratio: heavy raymarch, keep it cheap.
    const dpr = Math.min(window.devicePixelRatio || 1, reducedMotion ? 1 : 1.5) * 0.6;

    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    let move = [0, 0];
    const targetMove = [0, 0];
    const onPointer = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      const minDim = Math.min(canvas.width, canvas.height);
      targetMove[0] = nx * minDim * 0.6;
      targetMove[1] = -ny * minDim * 0.6;
    };
    if (!reducedMotion) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    let raf = 0;
    let visible = true;
    let startTime = performance.now();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reducedMotion && !raf) {
          startTime = performance.now() - elapsed;
          raf = requestAnimationFrame(loop);
        }
      },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    let elapsed = 0;

    const draw = (t) => {
      resize();
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, t * 1e-3);
      gl.uniform2f(uMove, move[0], move[1]);
      gl.uniform2f(uWheel, 0, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (now) => {
      elapsed = now - startTime;
      move[0] += (targetMove[0] - move[0]) * 0.04;
      move[1] += (targetMove[1] - move[1]) * 0.04;
      draw(elapsed);
      if (visible && !document.hidden) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    const onVisibility = () => {
      if (!document.hidden && visible && !reducedMotion && !raf) {
        startTime = performance.now() - elapsed;
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (reducedMotion) {
      // Render a single resolved, well-lit frame and stop.
      draw(3500);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-[#0B0A09]" aria-hidden="true">
      {supported ? (
        <canvas ref={canvasRef} className="h-full w-full" />
      ) : (
        <div className="hero-shader-fallback h-full w-full" />
      )}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#0B0A09]" />
    </div>
  );
}
