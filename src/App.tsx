import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { IntroSplash } from './components/IntroSplash';
import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { downloadResumePDF } from './utils/pdfGenerator';
import { PERSONAL_INFO } from './data/portfolioData';
import { ProfileData } from './types/portfolio';

export default function App() {
  // Profile state with localStorage persistence
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem('portfolio_user_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return PERSONAL_INFO;
  });

  // Always locked to Dark Mode as requested
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleUpdateProfile = (updated: ProfileData) => {
    setProfile(updated);
    try {
      localStorage.setItem('portfolio_user_profile', JSON.stringify(updated));
    } catch {}
  };

  const handleResetProfile = () => {
    setProfile(PERSONAL_INFO);
    try {
      localStorage.removeItem('portfolio_user_profile');
    } catch {}
  };

  // Active navigation section
  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'portfolio' | 'contact'>('home');

  // Intro Splash state
  const [showIntro, setShowIntro] = useState<boolean>(true);

  const handleDownloadResume = () => {
    downloadResumePDF(profile);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-[#050203] text-slate-100 bg-tech-grid-dark selection:bg-red-500/30 selection:text-red-200">
      {/* Intro Splash Screen (English, smooth pacing, cinematic) */}
      <IntroSplash
        isOpen={showIntro}
        onComplete={() => setShowIntro(false)}
        profile={profile}
      />

      {/* Navigation Bar (No theme toggle, no language toggle) */}
      <Navbar
        activeSection={activeSection}
        onNavigate={(sec) => {
          setActiveSection(sec as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onDownloadResume={handleDownloadResume}
        onReplayIntro={() => {
          setShowIntro(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        profile={profile}
      />

      {/* Main Content Area with Smooth Page Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <HomeSection
                profile={profile}
                onNavigateToPortfolio={() => setActiveSection('portfolio')}
                onNavigateToContact={() => setActiveSection('contact')}
              />
            </motion.div>
          )}

          {activeSection === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <AboutSection
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                onResetProfile={handleResetProfile}
                onDownloadResume={handleDownloadResume}
                onNavigateToPortfolio={() => setActiveSection('portfolio')}
              />
            </motion.div>
          )}

          {activeSection === 'portfolio' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <PortfolioSection />
            </motion.div>
          )}

          {activeSection === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <ContactSection profile={profile} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        onScrollToTop={handleScrollToTop}
        onReplayIntro={() => {
          setShowIntro(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        profile={profile}
      />
    </div>
  );
}
