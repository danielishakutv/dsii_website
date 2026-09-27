'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type NavChild = { href: string; label: string };
type NavLink = { href: string; label: string; children?: NavChild[] };

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  {
    href: '/about',
    label: 'About Us',
    children: [
      { href: '/about', label: 'Who We Are' },
      { href: '/team', label: 'Our Team' },
    ],
  },
  { href: '/projects', label: 'Projects' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/health-awareness', label: 'Health Awareness' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // A dropdown left open behind a click elsewhere, or after Escape, traps the
  // pointer over the rest of the page, so close it on both.
  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  function openNow(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  }

  // Small grace period so the pointer can cross the gap from the trigger
  // to the panel without the menu vanishing underneath it.
  function closeSoon() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 140);
  }

  function closeEverything() {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setMobileSubOpen(null);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/logo.jpg"
              alt="DSII Logo"
              className="h-14 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-[#14432e]">Deeds Support</h1>
              <p className="text-xs text-gray-500">Initiative International</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div
            ref={navRef}
            className="hidden lg:flex items-center lg:space-x-5 xl:space-x-8"
          >
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => openNow(link.label)}
                  onMouseLeave={closeSoon}
                >
                  <button
                    type="button"
                    aria-expanded={openDropdown === link.label}
                    aria-haspopup="true"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === link.label ? null : link.label
                      )
                    }
                    className="flex items-center gap-1 text-gray-600 hover:text-[#1e5c45] font-medium transition-colors duration-300 relative group whitespace-nowrap lg:text-sm xl:text-base cursor-pointer"
                  >
                    {link.label}
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openDropdown === link.label ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1e5c45] transition-all duration-300 group-hover:w-full" />
                  </button>

                  <div
                    className={`absolute left-0 top-full pt-3 transition-all duration-200 ${
                      openDropdown === link.label
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-1'
                    }`}
                  >
                    <div className="w-56 bg-white rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden py-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-5 py-3 text-sm text-gray-600 hover:text-[#1e5c45] hover:bg-gray-50 transition-colors duration-200"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-[#1e5c45] font-medium transition-colors duration-300 relative group whitespace-nowrap lg:text-sm xl:text-base"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1e5c45] transition-all duration-300 group-hover:w-full" />
                </Link>
              )
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/donate"
              className="bg-[#b86e32] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#d4915a] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-[40rem] pb-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col space-y-2 pt-4 border-t">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    type="button"
                    aria-expanded={mobileSubOpen === link.label}
                    onClick={() =>
                      setMobileSubOpen(
                        mobileSubOpen === link.label ? null : link.label
                      )
                    }
                    className="w-full flex items-center justify-between text-gray-600 hover:text-[#1e5c45] font-medium transition-colors duration-300 px-2 py-2"
                  >
                    {link.label}
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        mobileSubOpen === link.label ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileSubOpen === link.label ? 'max-h-40' : 'max-h-0'
                    }`}
                  >
                    <div className="flex flex-col border-l-2 border-[#1e5c45]/20 ml-3 pl-4 py-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeEverything}
                          className="text-gray-500 hover:text-[#1e5c45] text-sm transition-colors duration-300 py-2"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeEverything}
                  className="text-gray-600 hover:text-[#1e5c45] font-medium transition-colors duration-300 px-2 py-2"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/donate"
              onClick={closeEverything}
              className="bg-[#b86e32] text-white px-6 py-3 rounded-full font-semibold text-center hover:bg-[#d4915a] transition-all duration-300 mt-2"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
