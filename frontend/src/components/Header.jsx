import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, Download } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/lib/data";

const NAV = [
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      data-testid="site-header"
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-hairline"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-editorial flex items-center justify-between h-16 md:h-20">
        <Link
          to="/"
          data-testid="header-logo-link"
          className="flex items-center gap-3 group"
        >
          <span className="font-serif text-lg md:text-xl font-medium tracking-tight">
            Ahmed Mostafa
          </span>
          <span className="hidden md:inline overline text-subtle">
            Marketing · Research · Analytics
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
                    : "text-foreground/80 hover:text-terracotta"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            data-testid="header-linkedin-link"
            className="inline-flex items-center gap-1.5 text-sm text-foreground/80 hover:text-terracotta transition-colors"
          >
            LinkedIn <ArrowUpRight size={14} />
          </a>
          <a
            href={profile.cvUrl}
            data-testid="header-download-cv"
            className="inline-flex items-center gap-2 border border-foreground/80 px-4 py-2 text-sm hover:bg-foreground hover:text-background transition-all"
          >
            <Download size={14} /> Download CV
          </a>
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          data-testid="mobile-menu-toggle"
          className="md:hidden inline-flex items-center justify-center w-9 h-9 text-foreground"
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
            <div className="flex items-center gap-3 pt-3 border-t border-hairline">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm"
              >
                LinkedIn <ArrowUpRight size={14} />
              </a>
              <a
                href={profile.cvUrl}
                className="inline-flex items-center gap-2 border border-foreground/80 px-4 py-2 text-sm"
              >
                <Download size={14} /> Download CV
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
