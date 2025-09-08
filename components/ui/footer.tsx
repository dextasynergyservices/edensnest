"use client";

import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Sitemap", href: "/sitemap.xml" },
  ];

  return (
    <footer
      className="mt-0"
      style={{
        background:
          "linear-gradient(135deg, rgba(25,135,135,1) 0%, rgba(6,12,31,1) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-[2px] bg-white/10 mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white">
          <div>&copy; {year} Edens Nest. All rights reserved.</div>

          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
