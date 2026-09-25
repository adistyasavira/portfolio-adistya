import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Menu, X, Sparkles } from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { InteractiveButton } from './InteractiveButton';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onDownloadResume: () => void;
  onReplayIntro: () => void;
  profile: ProfileData;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onDownloadResume,
  onReplayIntro,
  profile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md transition-colors duration-200 border-b bg-[#060203]/90 border-red-950/80 text-slate-100 shadow-sm shadow-red-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Wordmark */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate('home')}
            className="group flex items-center gap-2 text-left focus-visible:outline-none cursor-pointer"
          >
            <span
              className="text-lg font-bold tracking-tight text-white group-hover:text-red-400 transition-colors"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {profile.domain}
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" title="Available for work" />
          </motion.button>
        </div>

        {/* Clean Desktop Navigation links in English */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-slate-400 hover:text-red-300'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-400 rounded-full shadow-[0_0_8px_#ef4444]"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Actions Zone: Replay Intro, Download CV, and Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Replay Intro button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onReplayIntro}
            title="Replay Intro Splash"
            className="p-2 rounded-xl transition-all cursor-pointer text-xs flex items-center gap-1.5 text-slate-400 hover:text-red-300 hover:bg-red-950/40 border border-transparent hover:border-red-900/50"
          >
            <Sparkles className="w-4 h-4 text-red-500" />
            <span className="hidden xl:inline text-xs">Intro</span>
          </motion.button>

          {/* Interactive Download CV Button */}
          <InteractiveButton
            variant="primary"
            size="sm"
            onClick={onDownloadResume}
            icon={<Download className="w-3.5 h-3.5" />}
            iconPosition="left"
            className="hidden sm:inline-flex"
            title="Download Official Resume PDF"
          >
            <span>Download CV</span>
          </InteractiveButton>

          {/* Mobile Menu Hamburger */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open mobile menu"
            className="md:hidden p-2 rounded-xl transition-colors cursor-pointer border text-slate-200 bg-red-950/40 border-red-900/50"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b px-4 pt-3 pb-5 space-y-3 bg-[#0a0305] border-red-950/80 text-white"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-red-950/70 text-red-400 font-bold border border-red-800/60'
                      : 'text-slate-300 hover:bg-red-950/30'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-red-950/50 flex flex-col gap-2">
              <InteractiveButton
                variant="primary"
                size="md"
                onClick={() => {
                  onDownloadResume();
                  setMobileMenuOpen(false);
                }}
                icon={<Download className="w-4 h-4" />}
                iconPosition="left"
                className="w-full"
              >
                <span>Download CV</span>
              </InteractiveButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
