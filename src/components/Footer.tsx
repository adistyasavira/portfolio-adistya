import React from 'react';
import { ArrowUp, Code2, Sparkles } from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { motion } from 'motion/react';

interface FooterProps {
  onScrollToTop: () => void;
  onReplayIntro: () => void;
  profile: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onReplayIntro, profile }) => {
  return (
    <footer className="border-t py-8 transition-colors bg-[#060203] border-red-950/70 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-red-500" />
          <span>© {profile.name} · All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05, color: '#ef4444' }}
            whileTap={{ scale: 0.95 }}
            onClick={onReplayIntro}
            className="flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>Replay Intro</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2, color: '#ef4444' }}
            whileTap={{ scale: 0.95 }}
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-red-500" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
