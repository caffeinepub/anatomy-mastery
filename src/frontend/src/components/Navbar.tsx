import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useGetAllBodySystems } from "@/hooks/useQueries";
import { useIsCallerAdmin } from "@/hooks/useQueries";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Bone,
  BookOpen,
  Brain,
  ChevronDown,
  Menu,
  ShieldPlus,
  Utensils,
  Wind,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const SYSTEM_ICONS: Record<string, React.ElementType> = {
  "skeletal-system": Bone,
  "nervous-system": Brain,
  "cardiovascular-system": Activity,
  "respiratory-system": Wind,
  "digestive-system": Utensils,
};

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [systemsOpen, setSystemsOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const { data: systems } = useGetAllBodySystems();
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();

  const isActive = (path: string) => currentPath === path;
  const isLoggingIn = loginStatus === "logging-in";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-xs">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" data-ocid="nav.link">
          <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center">
            <ShieldPlus className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-lg text-teal-900">
            Anatomy<span className="text-teal-600">Mastery</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive("/")
                ? "bg-teal-50 text-teal-700"
                : "text-foreground/70 hover:text-foreground hover:bg-muted"
            }`}
            data-ocid="nav.link"
          >
            Home
          </Link>

          {/* Body Systems Dropdown */}
          <div className="relative" onMouseLeave={() => setSystemsOpen(false)}>
            <button
              type="button"
              onMouseEnter={() => setSystemsOpen(true)}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPath.startsWith("/system")
                  ? "bg-teal-50 text-teal-700"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              }`}
            >
              Body Systems
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${systemsOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {systemsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl border border-border shadow-lg p-1"
                  data-ocid="nav.dropdown_menu"
                >
                  {systems?.map((system) => {
                    const Icon = SYSTEM_ICONS[system.slug] || BookOpen;
                    return (
                      <Link
                        key={String(system.id)}
                        to="/system/$slug"
                        params={{ slug: system.slug }}
                        onClick={() => setSystemsOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground/80 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                        data-ocid="nav.link"
                      >
                        <Icon className="w-4 h-4 text-teal-600" />
                        {system.name}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/blog"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              currentPath.startsWith("/blog")
                ? "bg-teal-50 text-teal-700"
                : "text-foreground/70 hover:text-foreground hover:bg-muted"
            }`}
            data-ocid="nav.link"
          >
            Blog
          </Link>

          <Link
            to="/contact"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive("/contact")
                ? "bg-teal-50 text-teal-700"
                : "text-foreground/70 hover:text-foreground hover:bg-muted"
            }`}
            data-ocid="nav.link"
          >
            Contact
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/admin")
                  ? "bg-teal-50 text-teal-700"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              }`}
              data-ocid="nav.link"
            >
              Admin
            </Link>
          )}
        </div>

        {/* Auth Button */}
        <div className="hidden md:flex items-center gap-2">
          {identity ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => clear()}
              className="text-teal-700 border-teal-200 hover:bg-teal-50"
              data-ocid="nav.button"
            >
              Sign Out
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => login()}
              disabled={isLoggingIn}
              className="bg-teal-700 hover:bg-teal-800 text-white"
              data-ocid="nav.primary_button"
            >
              {isLoggingIn ? "Signing In..." : "Sign In"}
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md hover:bg-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-border bg-white"
          >
            <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-medium text-foreground/80 hover:bg-teal-50 hover:text-teal-700"
                data-ocid="nav.link"
              >
                Home
              </Link>
              <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Body Systems
              </div>
              {systems?.map((system) => {
                const Icon = SYSTEM_ICONS[system.slug] || BookOpen;
                return (
                  <Link
                    key={String(system.id)}
                    to="/system/$slug"
                    params={{ slug: system.slug }}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 pl-6 pr-3 py-2.5 rounded-md text-sm text-foreground/80 hover:bg-teal-50 hover:text-teal-700"
                    data-ocid="nav.link"
                  >
                    <Icon className="w-4 h-4 text-teal-600" />
                    {system.name}
                  </Link>
                );
              })}
              <Link
                to="/blog"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-medium text-foreground/80 hover:bg-teal-50 hover:text-teal-700"
                data-ocid="nav.link"
              >
                Blog
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-medium text-foreground/80 hover:bg-teal-50 hover:text-teal-700"
                data-ocid="nav.link"
              >
                Contact
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-md text-sm font-medium text-foreground/80 hover:bg-teal-50 hover:text-teal-700"
                  data-ocid="nav.link"
                >
                  Admin
                </Link>
              )}
              <div className="pt-2 pb-1">
                {identity ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      clear();
                      setMobileOpen(false);
                    }}
                    className="w-full text-teal-700 border-teal-200"
                    data-ocid="nav.button"
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => {
                      login();
                      setMobileOpen(false);
                    }}
                    disabled={isLoggingIn}
                    className="w-full bg-teal-700 hover:bg-teal-800 text-white"
                    data-ocid="nav.primary_button"
                  >
                    {isLoggingIn ? "Signing In..." : "Sign In"}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
