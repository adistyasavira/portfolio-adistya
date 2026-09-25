import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Code2, Layers, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { InteractiveButton } from './InteractiveButton';

interface ProjectDetailViewProps {
  project: ProjectItem;
  onBack: () => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  onBack,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Back Button */}
      <div>
        <InteractiveButton
          variant="secondary"
          size="sm"
          onClick={onBack}
          icon={<ArrowLeft className="w-3.5 h-3.5 text-red-500" />}
          iconPosition="left"
        >
          <span>Back to Portfolio</span>
        </InteractiveButton>
      </div>

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Info Column */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-mono text-red-500 font-semibold uppercase tracking-wider block mb-1">
              {project.category}
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {project.title}
            </h2>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-slate-300">
            {project.fullDescription}
          </p>

          {/* Key Highlights */}
          <div className="p-6 rounded-2xl border bg-[#0e0407] border-red-950/80">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-500" />
              <span>Key Project Highlights & Capabilities</span>
            </h3>

            <ul className="space-y-3">
              {project.keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-slate-300">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Used */}
          <div>
            <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-red-500" />
              <span>Technologies & Architecture</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono rounded-lg border bg-red-950/30 border-red-900/50 text-red-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block"
              >
                <InteractiveButton
                  variant="primary"
                  size="md"
                  icon={<ExternalLink className="w-4 h-4" />}
                >
                  <span>Live Demo</span>
                </InteractiveButton>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block"
              >
                <InteractiveButton
                  variant="secondary"
                  size="md"
                  icon={<Github className="w-4 h-4" />}
                >
                  <span>Source Code</span>
                </InteractiveButton>
              </a>
            )}
          </div>
        </div>

        {/* Right Visual / Tech Blueprint Column */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl border border-red-900/40 p-6 overflow-hidden relative bg-[#0a0305] shadow-2xl">
            {/* Top Mock Window Header */}
            <div className="flex items-center justify-between pb-4 border-b border-red-950/60 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                {project.id}.tsx
              </span>
            </div>

            {/* Visual Preview Banner */}
            <div className="aspect-video w-full rounded-xl bg-gradient-to-tr from-red-950/80 via-[#18050a] to-[#0a0204] border border-red-900/50 p-6 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute inset-0 bg-tech-grid-dark opacity-30 pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-red-600/30 text-red-300 border border-red-500/40">
                  PRODUCTION READY
                </span>
                <Code2 className="w-5 h-5 text-red-400 opacity-60" />
              </div>

              <div className="relative z-10 my-auto text-center py-6">
                <h3
                  className="text-xl sm:text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {project.title}
                </h3>
                <p className="text-xs text-red-200/80 max-w-sm mx-auto font-mono">
                  {project.category}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>⭐ {project.stars} Stars</span>
                <span className="text-emerald-400">STATUS: ACTIVE</span>
              </div>
            </div>

            {/* Quick Summary Strip */}
            <div className="mt-6 pt-4 border-t border-red-950/40 grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-500 block">CATEGORY</span>
                <span className="text-slate-200 font-semibold">{project.category}</span>
              </div>
              <div>
                <span className="text-slate-500 block">RELEASED</span>
                <span className="text-slate-200 font-semibold">2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
