import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import CVButton from "@/components/CVButton";
import { registerGsap, ScrollTrigger } from "@/lib/motion/gsap";

const NAV = [
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [heroPassed, setHeroPassed] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setHeroPassed(true);
      return undefined;
    }

    registerGsap();
    const hero = document.querySelector("[data-testid='hero-section']");
    if (!hero) return undefined;

    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: "bottom top+=80",
      onEnter: () => setHeroPassed(true),
      onLeaveBack: () => setHeroPassed(false),
    });

    return () => trigger.kill();
  }, [location.pathname]);

  useEffect(() => {
    if (open) {
      registerGsap();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const onHome = location.pathname === "/";
  const onDarkHero = onHome && !heroPassed;

  return (
    <header
      data-testid="site-header"
      className={`sticky top-0 z-50 transition-all duration-500 ${
        onDarkHero
          ? scrolled
            ? "bg-[#0B0A09]/85 backdrop-blur-xl border-b border-[#F2F0EA]/10"
            : "bg-transparent border-b border-transparent"
          : scrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-hairline"
            : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-editorial flex items-center justify-between h-16 md:h-20">
        <Link
          to="/"
          data-testid="header-logo-link"
          className="group"
        >
            <span
              data-header-wordmark
              className={`font-serif font-medium tracking-tight transition-all duration-500 text-lg md:text-xl ${
                onDarkHero ? "text-[#F2F0EA]" : "text-foreground"
              }`}
            >
            Ahmed Mohsen Mostafa
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              data-testid={`nav-link-${item.label.toLowerCase()}`}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors ${
                  isActive
                    ? "text-terracotta"
                    : onDarkHero
                      ? "text-[#F2F0EA]/75 hover:text-terracotta"
                      : "text-foreground/80 hover:text-terracotta"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <CVButton
            variant={onDarkHero ? "inverted" : "header"}
            source="header"
            testId="header-download-cv"
            className={onDarkHero ? "!min-h-[40px] !px-4 !py-2 text-sm" : ""}
          />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          data-testid="mobile-menu-toggle"
          className={`md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 ${
            onDarkHero ? "text-[#F2F0EA]" : "text-foreground"
          }`}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div
          data-testid="mobile-menu"
          className="md:hidden border-t border-hairline bg-background"
        >
          <div className="container-editorial py-6 flex flex-col gap-5">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                data-testid={`mobile-nav-link-${item.label.toLowerCase()}`}
                className="font-serif text-2xl"
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex items-center flex-wrap gap-3 pt-3 border-t border-hairline">
              <CVButton variant="header" source="mobile-menu" testId="mobile-download-cv" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
