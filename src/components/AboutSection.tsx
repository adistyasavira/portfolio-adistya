import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  FolderGit2,
  Award,
  Briefcase,
  Code,
  Quote,
  Sparkles,
  Camera,
  Edit3,
  Check,
  X,
  RotateCcw,
  Globe,
  Mail,
  Linkedin,
  Github,
  GraduationCap,
} from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { InteractiveButton } from './InteractiveButton';

interface AboutSectionProps {
  profile: ProfileData;
  onUpdateProfile: (updated: ProfileData) => void;
  onResetProfile: () => void;
  onDownloadResume: () => void;
  onNavigateToPortfolio: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  profile,
  onUpdateProfile,
  onResetProfile,
  onDownloadResume,
  onNavigateToPortfolio,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<ProfileData>(profile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync edit form whenever profile changes
  const handleOpenEditModal = () => {
    setEditForm(profile);
    setIsEditModalOpen(true);
  };

  // Direct photo upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('Photo size exceeds 8MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        const updated = { ...profile, photoUrl: base64 };
        onUpdateProfile(updated);
        setEditForm((prev) => ({ ...prev, photoUrl: base64 }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(editForm);
    setIsEditModalOpen(false);
  };

  return (
    <section className="py-12 sm:py-20 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-red-950/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hidden file input for photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header with Edit Profile Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono font-semibold tracking-wider text-red-500 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              ABOUT ME & CREDENTIALS
            </span>
            <h2
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-1"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {profile.name}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Photo Card & Quick Bio Card */}
          <div className="lg:col-span-4 flex flex-col items-center">
            {/* Dedicated Profile Photo Card */}
            <div className="relative w-full max-w-sm rounded-2xl border border-red-950/20 p-4 shadow-2xl overflow-hidden group">
              {/* Photo Box */}
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-red-900/30 mb-4 flex items-center justify-center">
                <img
                  src={profile.photoUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />

                {/* Ambient photo border glow */}
                <div className="absolute inset-0 ring-1 ring-inset ring-red-500/20 pointer-events-none rounded-xl" />
              </div>
              
              {/* Identity Under Photo */}
              <div className="text-center px-2 pb-2">
                <h3
                  className="text-lg font-bold text-white tracking-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {profile.name}
                </h3>
                <p className="text-xs font-mono text-red-400 mt-0.5">
                  {profile.role}
                </p>
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400 mt-2">
                  <GraduationCap className="w-3.5 h-3.5 text-red-500" />
                  <span className="truncate">{profile.education}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Quote, Highlights & Tech Stack */}
          <div className="lg:col-span-8 space-y-6">
            <p className="text-base sm:text-lg leading-relaxed text-slate-300">
              {profile.bio}
            </p>

            {/* Quote Block */}
            <div className="p-5 rounded-2xl border border-red-900/40 bg-red-950/20 text-slate-200 relative transition-colors">
              <Quote className="w-5 h-5 text-red-500 mb-2 opacity-80" />
              <p className="text-sm italic font-medium leading-relaxed font-sans">
                "{profile.tagline}"
              </p>
            </div>

            {/* Key Highlights: Education and Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl border border-red-900/40 bg-red-950/25 hover:border-red-600/50 flex items-center gap-3.5 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-red-600/15 text-red-500 flex items-center justify-center shrink-0">
                  <Code className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-semibold text-red-400">Education</span>
                  <span className="text-slate-300">{profile.education}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-red-900/40 bg-red-950/25 hover:border-red-600/50 flex items-center gap-3.5 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-rose-600/15 text-rose-500 flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-semibold text-rose-400">Experience</span>
                  <span className="text-slate-300">{profile.experience}</span>
                </div>
              </div>
            </div>

            {/* 3 Metric Summary Cards */}
            <div className="grid grid-cols-3 gap-3 text-center pt-2">
              <div className="p-4 rounded-2xl border border-red-900/50 bg-gradient-to-b from-red-950/40 to-black/60 shadow-lg shadow-black/60">
                <FolderGit2 className="w-5 h-5 mx-auto mb-2 text-red-500" />
                <span
                  className="block text-2xl sm:text-3xl font-bold text-white"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {profile.metrics.projectsCount}+
                </span>
                <span className="text-[11px] font-mono text-slate-400 mt-1 block">
                  Completed Projects
                </span>
              </div>

              <div className="p-4 rounded-2xl border border-red-900/50 bg-gradient-to-b from-red-950/40 to-black/60 shadow-lg shadow-black/60">
                <Award className="w-5 h-5 mx-auto mb-2 text-rose-500" />
                <span
                  className="block text-2xl sm:text-3xl font-bold text-white"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {profile.metrics.certificatesCount}+
                </span>
                <span className="text-[11px] font-mono text-slate-400 mt-1 block">
                  Certifications
                </span>
              </div>

              <div className="p-4 rounded-2xl border border-red-900/50 bg-gradient-to-b from-red-950/40 to-black/60 shadow-lg shadow-black/60">
                <Briefcase className="w-5 h-5 mx-auto mb-2 text-red-400" />
                <span
                  className="block text-2xl sm:text-3xl font-bold text-white"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {profile.metrics.codeExperienceMonths}+
                </span>
                <span className="text-[11px] font-mono text-slate-400 mt-1 block">
                  Months Practice
                </span>
              </div>
            </div>

            {/* Interactive Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <InteractiveButton
                variant="primary"
                size="md"
                onClick={onDownloadResume}
                icon={<Download className="w-4 h-4" />}
                iconPosition="left"
              >
                <span>Download Resume (PDF)</span>
              </InteractiveButton>

              <InteractiveButton
                variant="secondary"
                size="md"
                isDarkMode={true}
                onClick={onNavigateToPortfolio}
              >
                <span>Explore Showcase Portfolio</span>
              </InteractiveButton>
            </div>
          </div>
        </div>
      </div>
  </section>
);
};
