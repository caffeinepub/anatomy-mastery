import { Link } from "@tanstack/react-router";
import { BookOpen, Heart, Mail, ShieldPlus } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-teal-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                <ShieldPlus
                  className="w-4.5 h-4.5 text-white"
                  strokeWidth={2.5}
                />
              </div>
              <span className="font-display font-bold text-lg">
                Anatomy<span className="text-teal-300">Mastery</span>
              </span>
            </div>
            <p className="text-teal-200/80 text-sm leading-relaxed">
              Your comprehensive resource for Human Anatomy — designed to help
              NEET and medical entrance exam students excel.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-teal-200 mb-3 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/blog", label: "Study Blog" },
                { to: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-teal-200/70 hover:text-white text-sm transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Body Systems */}
          <div>
            <h4 className="font-display font-semibold text-teal-200 mb-3 text-sm uppercase tracking-wider">
              Body Systems
            </h4>
            <ul className="space-y-2">
              {[
                "skeletal-system",
                "nervous-system",
                "cardiovascular-system",
                "respiratory-system",
                "digestive-system",
              ].map((slug) => (
                <li key={slug}>
                  <Link
                    to="/system/$slug"
                    params={{ slug }}
                    className="text-teal-200/70 hover:text-white text-sm transition-colors capitalize"
                    data-ocid="footer.link"
                  >
                    {slug
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-teal-200/60">
          <p>
            © {year}. Built with{" "}
            <Heart className="inline w-3.5 h-3.5 text-red-400 mx-0.5" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-300 hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-1 text-teal-200/60">
            <BookOpen className="w-3.5 h-3.5" />
            <span>NEET Anatomy Resource</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
