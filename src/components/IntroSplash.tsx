import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Sparkles, Terminal, FastForward, CheckCircle } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface IntroSplashProps {
  onComplete: () => void;
  isOpen: boolean;
  profile: ProfileData;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete, isOpen, profile }) => {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);

  // Progressive status logs in 100% English
  const stages = [
    'Initializing Frontend Environment...',
    'Loading Projects & Developer Modules...',
    'Preparing Interactive Portfolio Showcase...',
    `Ready · ${profile.name}`,
  ];

  useEffect(() => {
    if (!isOpen) return;

    setProgress(0);
    setStageIndex(0);

    // Total duration ~4.0s (smooth, cinematic, not rushed)
    const intervalTime = 40;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 450);
          return 100;
        }

        if (next === 28) setStageIndex(1);
        if (next === 62) setStageIndex(2);
        if (next === 90) setStageIndex(3);

        return next;
      });
    }, intervalTime);

    // Allow ESC key to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearInterval(interval);
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onComplete]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050203] text-white select-none overflow-hidden"
        >
          {/* Subtle Dark Red Cyber Tech Grid Background */}
          <div className="absolute inset-0 bg-tech-grid-dark opacity-40 pointer-events-none" />

          {/* Crimson Radial Ambient Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-red-800/20 via-rose-700/15 to-transparent blur-3xl pointer-events-none" />

          {/* Skip Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="absolute top-6 right-6 flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 rounded-xl transition-all z-20 cursor-pointer shadow-lg hover:shadow-red-900/40"
          >
            <span>Skip Intro</span>
            <FastForward className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline text-[10px] text-slate-400 opacity-70">[ESC]</span>
          </motion.button>

          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg w-full">
            {/* Developer glyphs */}
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex items-center gap-4 text-slate-300 mb-8"
            >
              <div className="p-3 rounded-2xl bg-red-950/50 border border-red-800/60 text-red-400 shadow-lg shadow-red-950/60">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="p-3 rounded-2xl bg-red-950/50 border border-red-800/60 text-rose-400 shadow-lg shadow-red-950/60">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="p-3 rounded-2xl bg-red-950/50 border border-red-800/60 text-emerald-400 shadow-lg shadow-red-950/60">
                <Terminal className="w-5 h-5" />
              </div>
            </motion.div>

            {/* Main Welcome Headline */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Welcome to my
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-300 uppercase mt-1 drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                PORTFOLIO WEBSITE
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="text-xs font-mono text-red-300/80 mb-8 tracking-wider"
            >
              {profile.domain} · {profile.role.toUpperCase()}
            </motion.p>

            {/* Glowing Crimson Progress Bar */}
            <div className="w-64 sm:w-80 h-2 bg-red-950/60 border border-red-900/60 rounded-full overflow-hidden mb-3 p-[1px]">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-400 rounded-full shadow-[0_0_12px_#ef4444]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Status updates & Percentage */}
            <div className="flex items-center justify-between w-64 sm:w-80 text-[11px] font-mono text-slate-400 px-1">
              <span className="truncate max-w-[200px] text-slate-300 flex items-center gap-1.5">
                {progress === 100 ? (
                  <CheckCircle className="w-3 h-3 text-emerald-400 inline" />
                ) : (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                )}
                {stages[stageIndex]}
              </span>
              <span className="font-bold text-red-400 tabular-nums">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
