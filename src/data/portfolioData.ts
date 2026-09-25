import { ProjectItem, CertificateItem, TechStackItem, GuestbookComment, SocialLink, ProfileData } from '../types/portfolio';

export const DEFAULT_AVATAR = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg viewBox="0 0 240 280" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="280" fill="#0d0205"/>
  <path d="M0 40H240M0 80H240M0 120H240M0 160H240M0 200H240M0 240H240" stroke="#ef444415" stroke-width="1"/>
  <path d="M40 0V280M80 0V280M120 0V280M160 0V280M200 0V280" stroke="#ef444415" stroke-width="1"/>
  
  <!-- Developer Figure -->
  <circle cx="120" cy="95" r="48" fill="#1c070c"/>
  <path d="M88 100C88 74 102 62 120 62C138 62 152 74 152 100C152 124 138 138 120 138C102 138 88 124 88 100Z" fill="#e2c8b8"/>
  <path d="M82 88C82 62 96 50 120 50C146 50 160 64 158 90C152 82 142 78 130 78C116 78 102 80 92 90C87 94 85 92 82 88Z" fill="#120406"/>
  
  <!-- Sleek Glasses -->
  <rect x="94" y="90" width="20" height="14" rx="3.5" stroke="#120406" stroke-width="3" fill="#ef444420"/>
  <rect x="126" y="90" width="20" height="14" rx="3.5" stroke="#120406" stroke-width="3" fill="#ef444420"/>
  <line x1="114" y1="96" x2="126" y2="96" stroke="#120406" stroke-width="2.5"/>
  
  <!-- Suit / Hoodie -->
  <path d="M50 280L62 195C66 172 84 156 106 154L120 170L134 154C156 156 174 172 178 195L190 280H50Z" fill="#140408"/>
  <path d="M106 154L120 188L134 154H106Z" fill="#b91c1c"/>
  <path d="M116 170L120 280L124 170H116Z" fill="#dc2626"/>
  
  <!-- Glowing Crimson Halo -->
  <circle cx="180" cy="60" r="70" fill="url(#avatarGlow)" opacity="0.45"/>
  <defs>
    <radialGradient id="avatarGlow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#ef4444" stop-opacity="0"/>
    </radialGradient>
  </defs>
</svg>
`)}`;

export const PERSONAL_INFO: ProfileData = {
  name: 'Adistya Savira Putri',
  role: 'Frontend Developer',
  titles: [
    'Junior Programming',
    'Computer Science Student | Software Engineering'
  ],
  statusText: 'AVAILABLE FOR INTERNSHIP * CRAFTING PIXEL-PERFECT WEB EXPERIENCES * FRONTEND DEVELOPER * UI/UX DESIGNER',
  email: 'adistyasaviraa@gmail.com',
  location: 'Indonesia',
  domain: 'github.com/adistyasavira',
  tagline: 'Bridging the gap between design and engineering to create responsive, intuitive web applications.',
  bio: 'A passionate Software Engineering student (Binusian 2028) specializing in modern frontend development and UI/UX design. From crafting intuitive interfaces in Figma to writing clean, native JavaScript and building Next.js platforms, I enjoy turning complex problems into seamless digital experiences. Currently seeking frontend or UI/UX internship opportunities.',
  education: 'Computer Science - Software Engineering',
  experience: 'Administration & Taxation PT. DnA Puspita Persada Murni',
  photoUrl: '/adistya.png',
  linkedinUrl: 'https://www.linkedin.com/in/adistya-savira-putri-a05013421?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  githubUrl: 'https://github.com/adistyasavira',
  instagramUrl: 'https://instagram.com/adistyasavira',
  metrics: {
    projectsCount: 5,
    certificatesCount: 2,
    completedWorks: 12,
    codeExperienceMonths: 24,
  }
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'LinkedIn',
    handle: 'Adistya Savira Putri',
    url: 'https://www.linkedin.com/in/adistya-savira-putri-a05013421?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    icon: 'linkedin',
    color: '#0A66C2'
  },
  {
    name: 'GitHub',
    handle: '@adistyasavira',
    url: 'https://github.com/adistyasavira',
    icon: 'github',
    color: '#24292F'
  },
  {
    name: 'Instagram',
    handle: '@adistyasavira',
    url: 'https://instagram.com/adistyasavira',
    icon: 'instagram',
    color: '#E4405F'
  },
  {
    name: 'Email',
    handle: 'adistyasaviraa@gmail.com',
    url: 'mailto:adistyasaviraa@gmail.com',
    icon: 'mail',
    color: '#10B981'
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'project-titipin',
    title: 'Titipin - Fullstack Next.js Platform',
    category: 'Fullstack Web Application',
    shortDescription: 'A modern fullstack platform built with Next.js and Supabase, complete with comprehensive SDLC documentation and system architecture.',
    fullDescription: 'Titipin is a comprehensive fullstack application utilizing the Next.js App Router and TypeScript for the frontend, with Supabase (PLpgSQL) handling the database management. Beyond coding, this project emphasizes proper Software Engineering practices, including deep documentation such as UML designs, SDLC planning, and risk analysis initially designed for a PKM-KC proposal.',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'PLpgSQL'],
    keyFeatures: [
      'Modern fullstack architecture using Next.js and Supabase',
      'Database management and migrations utilizing PLpgSQL',
      'Comprehensive Software Engineering documentation (UML, SDLC, Test Cases)',
      'Responsive, integrated deployment via Vercel'
    ],
    liveUrl: 'https://titipin-v2bx.vercel.app/',
    githubUrl: 'https://github.com/adistyasavira/titipin',
    stars: 5,
    highlight: true,
  },
  {
    id: 'project-beefluent',
    title: 'BeeFluent SaaS Landing Page & Calculator',
    category: 'Frontend Web Application',
    shortDescription: 'Premium dark-themed SaaS landing page featuring an interactive multi-course pricing calculator built without external frameworks.',
    fullDescription: 'A high-converting landing page explicitly designed for academic course assistance. This project demonstrates clean layout management, responsive structures, and dynamic computational logic relying purely on native web technologies.',
    technologies: ['HTML5', 'CSS3 Grid', 'Vanilla JavaScript'],
    keyFeatures: [
      'Interactive Multi-Course Calculator with instant pricing validation',
      'Custom Progressional Discounts with modular calculation logic',
      'Built entirely with native semantics, zero external UI frameworks',
      'Responsive dark-themed UI layout'
    ],
    liveUrl: 'https://adistyasavira.github.io/beefluent-landing-page/',
    githubUrl: 'https://github.com/adistyasavira/beefluent-landing-page',
    stars: 4,
    highlight: true,
  },
  {
    id: 'project-ecodash',
    title: 'EcoDash - Waste Management & Eco-Marketplace (UI/UX)',
    category: 'UI/UX Design',
    shortDescription: 'A comprehensive mobile app design for a digital waste platform featuring location-based pick-ups, eco-education, and a sustainable DIY marketplace.',
    fullDescription: 'EcoDash is an end-to-end UI/UX design concept aimed at revolutionizing household waste management and promoting a circular economy. The platform integrates a smart location-based waste pick-up service, connecting users with the nearest deposit centers and dispatching drivers directly to their homes. Beyond logistics, EcoDash empowers users through an educational module on upcycling waste into valuable items, supported by a dedicated marketplace where users can sell their eco-friendly DIY creations.',
    technologies: ['Figma', 'UI/UX Design', 'User Flow', 'Prototyping'],
    keyFeatures: [
      'Smart location-based waste pick-up system with driver integration',
      'Interactive educational hub for upcycling and eco-friendly DIY projects',
      'Integrated sustainable marketplace for buying and selling recycled goods',
      'Complex and comprehensive user flow covering logistics to e-commerce'
    ],
    liveUrl: 'https://www.figma.com/proto/ABMxzXDaFErtkbX5rpLs49/ECODASH?node-id=35-279&p=f&t=Gq6btwq56bFkbVJN-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=35%3A279',
    githubUrl: '', 
    stars: 5,
    highlight: true,
  },
  {
    id: 'project-clash-of-bang',
    title: 'Clash of baNG - Game Community Platform',
    category: 'Frontend Web Application',
    shortDescription: 'An interactive community website for gamers, developed as a Human-Computer Interaction (HCI) lab project focusing on user experience.',
    fullDescription: 'This project is a web-based community platform built for a Human-Computer Interaction course. It features multiple interconnected pages including user registration, profiles, and detailed game lore (troops and stories). Developed using native HTML, CSS, and JavaScript, the project emphasizes user-centric design principles, responsive layouts, and interactive elements tailored specifically for a gaming audience.',
    technologies: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'HCI Principles'],
    keyFeatures: [
      'Multi-page architecture with consistent theme and navigation',
      'User authentication interface (Register/Login forms)',
      'Rich content presentation for game lore and character profiles',
      'Implementation of Human-Computer Interaction (HCI) design principles'
    ],
    liveUrl: 'https://adistyasavira.github.io/clash-of-bang/', 
    githubUrl: 'https://github.com/adistyasavira/clash-of-bang', 
    stars: 4,
    highlight: false,
  },
  {
    id: 'project-reclaimed-id',
    title: 'REclaimed.ID - E-Waste Management App (UI/UX)',
    category: 'UI/UX Design',
    shortDescription: 'A conceptual mobile app design bridging households and recycling facilities to tackle urban e-waste, featuring smart valuation and transparent tracking.',
    fullDescription: 'Created for a UI/UX competition, REclaimed.ID tackles the growing electronic waste problem in urban areas. The app bridges the logistical gap between households, couriers, and recycling plants. The design focuses on building user trust through an end-to-end tracking system and incentivizes recycling via a Smart Valuation feature that estimates the material value of old electronics for e-wallet rewards.',
    technologies: ['Figma', 'UI/UX Design', 'User Research', 'Prototyping'],
    keyFeatures: [
      'Smart Valuation interface for real-time electronic waste pricing',
      'Transparent end-to-end logistics tracking system',
      'Gamified reward system with e-wallet and eco-restoration integrations',
      'High-fidelity interactive mobile prototype built in Figma'
    ],
    liveUrl: 'https://www.figma.com/proto/QcIoDaOHyb4R6NtWSaeUZo/REClaimed.ID?node-id=47-213&starting-point-node-id=47%3A213&t=mgy7mvTaX8oqPFW3-1', 
    githubUrl: '', 
    stars: 3,
    highlight: true,
  },
  {
    id: 'project-voltify',
    title: 'Voltify - Energy Consumption Tracker (UI/UX)',
    category: 'UI/UX Design',
    shortDescription: 'A mobile app design concept for tracking household electricity usage, featuring cost calculation and visual data forecasting.',
    fullDescription: 'Developed as an early academic project, Voltify is a mobile application design aimed at helping users monitor and calculate their monthly electricity consumption. The prototype includes features for inputting appliance usage, calculating estimated daily and monthly costs (in kWh), and visualizing data through forecast graphs. This project highlights my foundational interest in creating functional, data-driven user interfaces from the very beginning of my studies.',
    technologies: ['Figma', 'UI/UX Design', 'Wireframing', 'Data Visualization'],
    keyFeatures: [
      'Energy cost calculator based on appliance wattage and duration of use',
      'Monthly usage insights and electricity cost prediction graphs',
      'Clean, mobile-first user interface with a consistent color palette',
      'Complete user onboarding and authentication flow'
    ],
    liveUrl: 'https://www.figma.com/proto/DRYaD1DmQ76jSU43nqoYcS/SoftDes?node-id=25-2&p=f&t=Og6ugsog8VPqvcxX-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=25%3A2&show-proto-sidebar=1', 
    githubUrl: '', 
    stars: 3,
    highlight: false,
  },
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'cert-uiux-techfest-2026',
    title: 'UI/UX COMPETITION PARTICIPANT - TECHFEST 2026',
    issuer: 'Himpunan Mahasiswa Teknik Informatika (HIMTI) BINUS University',
    issueDate: '2026',
    credentialId: '-',
    recipientName: 'ADISTYA SAVIRA PUTRI',
    grade: 'Participant',
    description: 'Participated in the UI/UX Competition at TECHFEST 2026 "CITE: Competition for Innovation across Time Eras".',
    certificateImage: '/lomba.png' 
  },
  {
    id: 'cert-webinar-techfest-2026',
    title: 'WEBINAR PARTICIPANT - TECHFEST 2026',
    issuer: 'Himpunan Mahasiswa Teknik Informatika (HIMTI) BINUS University',
    issueDate: '2026',
    credentialId: '-',
    recipientName: 'ADISTYA SAVIRA PUTRI',
    grade: 'Participant',
    description: 'Participated in the webinar at TECHFEST 2026 "CITE: Competition for Innovation across Time Eras".',
    certificateImage: '/seminar1.png'
  },
  {
    id: 'cert-seminar-swe-2025',
    title: 'SEMINAR PARTICIPANT - BREAKING INTO SOFTWARE ENGINEERING',
    issuer: 'HIMTI BINUS University',
    issueDate: 'May 16, 2025',
    credentialId: '-',
    recipientName: 'Adistya Savira Putri',
    grade: 'Participant',
    description: 'Participated in the seminar "Breaking into Software Engineering: What Companies Look For in Fresh Grads".',
    certificateImage: '/seminar2.jpeg' 
  }
];

export const TECH_STACK_DATA: TechStackItem[] = [
  {
    name: 'HTML5',
    category: 'frontend',
    experienceLevel: 'Advanced',
    color: '#E34F26',
    iconType: 'html5',
    description: 'Semantic markup, WCAG accessibility, and robust DOM structuring.'
  },
  {
    name: 'CSS3',
    category: 'frontend',
    experienceLevel: 'Advanced',
    color: '#1572B6',
    iconType: 'css3', 
    description: 'Flexbox, Grid matrices, custom properties, and responsive layout design.'
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    experienceLevel: 'Intermediate',
    color: '#F7DF1E',
    iconType: 'javascript',
    description: 'DOM manipulation, async/await, and building logic architectures without frameworks.'
  },
  {
    name: 'React.js & Next.js',
    category: 'frontend',
    experienceLevel: 'Intermediate',
    color: '#61DAFB',
    iconType: 'react',
    description: 'Component architecture, state management, and modern fullstack frameworks.'
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    experienceLevel: 'Advanced',
    color: '#38BDF8',
    iconType: 'tailwind',
    description: 'Utility-first responsive layouts and rapid UI prototyping.'
  },
  {
    name: 'Database (Supabase/MySQL)',
    category: 'backend',
    experienceLevel: 'Beginner',
    color: '#3ECF8E',
    iconType: 'mysql',
    description: 'Basic relational database structuring and backend-as-a-service integration.'
  },
  {
    name: 'Figma (UI/UX)',
    category: 'tools',
    experienceLevel: 'Advanced',
    color: '#F24E1E',
    iconType: 'figma', 
    description: 'Interactive prototyping, wireframing, and user flow design.'
  },
  {
    name: 'Git & GitHub',
    category: 'tools',
    experienceLevel: 'Intermediate',
    color: '#F05032',
    iconType: 'github',
    description: 'Version control, repository management, and Pages deployment.'
  }
];