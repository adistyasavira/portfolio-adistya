import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, ArrowUpRight } from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { InteractiveButton } from './InteractiveButton';
import { LanyardCard } from './LanyardCard';

interface HomeSectionProps {
  profile: ProfileData;
  onNavigateToPortfolio: () => void;
  onNavigateToContact: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  profile,
  onNavigateToPortfolio,
  onNavigateToContact,
}) => {
  // Only the two specific titles requested by the user
  const titles = [
    'junior programming',
    'UI/UX Enthusiast',
    'React & Next.js Developer',
    'Creative Web Designer',
    'Computer Science Student'
  ];

  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = titles[titleIndex % titles.length];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, 70);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
        }, 30);
      } else {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between pt-8 sm:pt-12 pb-8 overflow-hidden">
      {/* Dark Red Ambient Background Light */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Intro & Typography */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Status indicator: AVAILABLE FOR WORK */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide mb-6 border bg-red-950/40 border-red-800/60 text-red-400 shadow-sm shadow-red-950/50"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span>* {profile.statusText}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight mb-3 leading-[1.05] text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Frontend
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-500 to-red-400 drop-shadow-[0_0_25px_rgba(220,38,38,0.4)]">
                Developer
              </span>
            </motion.h1>

            {/* Rotating Subtitle: strictly 'junior programming' & 'undergraduate student computer science software engineering' */}
            <div className="h-10 mb-4 flex items-center">
              <span
                className="text-lg sm:text-xl font-semibold tracking-wide text-slate-200 capitalize font-mono"
              >
                {displayText}
              </span>
              <span className="inline-block w-2 h-5 bg-red-500 ml-1.5 animate-pulse shadow-[0_0_8px_#ef4444]" />
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-base sm:text-lg leading-relaxed max-w-xl mb-6 text-slate-300"
            >
              {profile.bio}
            </motion.p>

            {/* Tech chips */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {['HTML/CSS', 'VanillaJS', 'React/Next.js', 'TailwindCSS', 'Figma', 'UI/UX'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono rounded-lg border bg-red-950/30 border-red-900/50 text-slate-300 hover:border-red-600/50 hover:text-white transition-colors"
                >
                  #{tech}
                </span>
              ))}
            </div>

            {/* Highly Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <InteractiveButton
                variant="primary"
                size="lg"
                onClick={onNavigateToPortfolio}
                icon={<ArrowRight className="w-4 h-4" />}
                title="Explore Projects & Work"
              >
                <span>Explore Projects</span>
              </InteractiveButton>

              <InteractiveButton
                variant="secondary"
                size="lg"
                isDarkMode={true}
                onClick={onNavigateToContact}
                icon={<ArrowUpRight className="w-4 h-4 text-red-500" />}
                title="Contact Me"
              >
                <span>Contact Me</span>
              </InteractiveButton>
            </div>
          </div>

          {/* Right Column: Exclusively 3D Interactive Lanyard ID Card Badge */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full flex justify-center"
            >
              <LanyardCard profile={profile} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 pt-6 border-t border-red-950/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-red-500 font-bold">→</span>
          <span className="text-slate-300 uppercase">EXPLORE BELOW</span>
          <span>·</span>
          <span className="text-slate-400">open to internship & junior software developer opportunities</span>
        </div>

        <button
          onClick={onNavigateToPortfolio}
          className="flex items-center gap-1.5 hover:text-red-400 transition-colors cursor-pointer"
        >
          <span>SCROLL</span>
          <ChevronDown className="w-3.5 h-3.5 text-red-500 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
