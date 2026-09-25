import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FolderGit2,
  Award,
  Cpu,
  ArrowRight,
  ExternalLink,
  Code2,
  Layers,
  Sparkles,
  Eye,
} from 'lucide-react';
import {
  PROJECTS_DATA,
  CERTIFICATES_DATA,
  TECH_STACK_DATA,
} from '../data/portfolioData';
import { ProjectItem, CertificateItem } from '../types/portfolio';
import { ProjectDetailView } from './ProjectDetailView';
import { CertificateModal } from './CertificateModal';
import { InteractiveButton } from './InteractiveButton';

export const PortfolioSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates' | 'techStack'>('projects');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);

  // If a project is selected for details, show the dedicated detail view
  if (selectedProject) {
    return (
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectDetailView
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
          />
        </div>
      </section>
    );
  }

  const frontendSkills = TECH_STACK_DATA.filter((s) => s.category === 'frontend');
  const backendSkills = TECH_STACK_DATA.filter((s) => s.category === 'backend');
  const toolSkills = TECH_STACK_DATA.filter((s) => s.category === 'tools');

  return (
    <section className="py-12 sm:py-20 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-950/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-mono font-semibold tracking-wider text-red-500 uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            PORTFOLIO SHOWCASE
          </span>
          <h2
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Featured Works & Achievements
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Explore key engineering projects, industry certifications, and technical stack proficiencies.
          </p>

          {/* Segmented Filter Control */}
          <div className="inline-flex p-1.5 rounded-2xl border bg-black/60 border-red-950/80 backdrop-blur-md mt-6 shadow-lg shadow-black/60">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'projects'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-900/50 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Projects ({PROJECTS_DATA.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'certificates'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-900/50 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Certifications ({CERTIFICATES_DATA.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('techStack')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'techStack'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-900/50 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Tech Stack</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Projects Showcase */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PROJECTS_DATA.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border p-5 flex flex-col justify-between transition-all group bg-[#0d0406] border-red-950/70 hover:border-red-600/50 shadow-xl shadow-black/80"
              >
                <div>
                  {/* Card Visual Header */}
                  <div className="relative aspect-video rounded-xl bg-gradient-to-tr from-red-950/80 via-[#18050a] to-[#0a0204] border border-red-900/40 p-4 mb-4 flex flex-col justify-between overflow-hidden">
                    <div className="absolute inset-0 bg-tech-grid-dark opacity-30 pointer-events-none" />

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-black/60 border border-red-900/60 text-red-300">
                        {project.category}
                      </span>
                      <Code2 className="w-4 h-4 text-red-400" />
                    </div>

                    <div className="relative z-10 my-auto text-center py-2">
                      <h4
                        className="text-lg font-bold text-white tracking-tight group-hover:text-red-400 transition-colors"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {project.title}
                      </h4>
                    </div>

                    <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>{project.technologies.slice(0, 3).join(' · ')}</span>
                      <span>⭐ {project.stars}</span>
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4 text-slate-300">
                    {project.shortDescription}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tItem) => (
                      <span
                        key={tItem}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md border bg-red-950/30 border-red-900/50 text-slate-300"
                      >
                        {tItem}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-red-950/50 flex items-center justify-between gap-2">
                  <InteractiveButton
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedProject(project)}
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                    className="w-full"
                  >
                    <span>View Project Details</span>
                  </InteractiveButton>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl border border-red-900/60 hover:border-red-500 hover:bg-red-950/40 text-red-400 hover:text-white transition-colors"
                      title="Live Demo Preview"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tab 2: Certificates Showcase */}
        {activeTab === 'certificates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATES_DATA.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border p-5 flex flex-col justify-between transition-all group bg-[#0d0406] border-red-950/70 hover:border-red-600/50 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-red-600/15 text-red-500 border border-red-500/30">
                      <Award className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-950/60 border border-red-800/60 text-red-400 font-semibold">
                      {cert.grade}
                    </span>
                  </div>

                  <h3
                    className="text-base font-bold tracking-tight mb-2 text-white"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {cert.title}
                  </h3>

                  <p className="text-xs font-mono text-slate-400 mb-1">
                    {cert.issuer}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono mb-4">
                    {cert.issueDate} · ID: {cert.credentialId}
                  </p>

                  <p className="text-xs line-clamp-2 leading-relaxed mb-4 text-slate-400">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-red-950/50">
                  <InteractiveButton
                    variant="secondary"
                    size="sm"
                    isDarkMode={true}
                    onClick={() => setSelectedCertificate(cert)}
                    icon={<Eye className="w-3.5 h-3.5 text-red-500" />}
                    iconPosition="left"
                    className="w-full"
                  >
                    <span>View Official Credential</span>
                  </InteractiveButton>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tab 3: Tech Stack Matrix */}
        {activeTab === 'techStack' && (
          <div className="space-y-8">
            {[
              { title: 'Frontend Technologies', skills: frontendSkills },
              { title: 'Backend & Database Architecture', skills: backendSkills },
              { title: 'Developer Tooling & Workflows', skills: toolSkills },
            ].map((group, groupIdx) => (
              <div
                key={groupIdx}
                className="p-6 sm:p-8 rounded-2xl border transition-colors bg-[#0c0406] border-red-950/80 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-red-600/15 text-red-500 flex items-center justify-center font-bold">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3
                    className="text-lg font-bold tracking-tight text-white"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {group.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {group.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="p-4 rounded-xl border flex flex-col justify-between transition-colors bg-red-950/20 border-red-900/40 hover:border-red-600/50 text-white"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold font-mono">{skill.name}</span>
                        <span className="text-[10px] text-red-400 font-mono font-bold px-2 py-0.5 rounded bg-red-950/60 border border-red-900/60">
                          {skill.experienceLevel}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {skill.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificate High-Res Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  );
};
