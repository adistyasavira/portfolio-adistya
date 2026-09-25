export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  keyFeatures: string[];
  liveUrl?: string;
  githubUrl?: string;
  stars?: number;
  highlight?: boolean;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  credentialUrl?: string;
  recipientName: string;
  grade?: string;
  description: string;
  certificateImage?: string;
}

export interface TechStackItem {
  name: string;
  category: 'frontend' | 'backend' | 'tools';
  experienceLevel: string;
  color: string;
  iconType: string;
  description: string;
}

export interface GuestbookComment {
  id: string;
  author: string;
  comment: string;
  timestamp: string;
  isPinned?: boolean;
  likes: number;
  badge?: string;
  replyCount?: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface SocialLink {
  name: string;
  handle: string;
  url: string;
  icon: string;
  color: string;
}

export interface ProfileData {
  name: string;
  role: string;
  titles: string[];
  statusText: string;
  email: string;
  location: string;
  domain: string;
  tagline: string;
  bio: string;
  education: string;
  experience: string;
  photoUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  instagramUrl: string;
  metrics: {
    projectsCount: number;
    certificatesCount: number;
    completedWorks: number;
    codeExperienceMonths: number;
  };
}
