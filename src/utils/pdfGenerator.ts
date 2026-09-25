import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO, PROJECTS_DATA } from '../data/portfolioData';
import { ProfileData } from '../types/portfolio';

export function downloadResumePDF(customProfile?: ProfileData): void {
  try {
    const profile = customProfile || PERSONAL_INFO;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 18;
    let y = 22;

    // Top Red Accent Bar
    doc.setFillColor(220, 38, 38); // Crimson Red
    doc.rect(0, 0, pageWidth, 4, 'F');

    // Name
    doc.setTextColor(15, 23, 42); // Slate 900 (Dark/Black)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text(profile.name.toUpperCase(), margin, y);

    // Subtitle / Target Role
    y += 7;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(220, 38, 38); // Crimson Red
    doc.text(profile.role.toUpperCase(), margin, y);

    // Contact bar on the right
    y += 6;
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105); // Slate 500
    const contactInfo = `${profile.email}  |  +62 857-7724-7552  |  https://linkedin.com/in/adistyasavira  |  https://github.com/adistyasavira`;
    doc.text(contactInfo, margin, y);

    y = 48;

    // Helper for Section Titles
    const renderSectionHeader = (title: string) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text(title.toUpperCase(), margin, y);
      
      // Underline bar in Crimson
      doc.setDrawColor(220, 38, 38);
      doc.setLineWidth(0.8);
      doc.line(margin, y + 2, margin + 28, y + 2);
      
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.2);
      doc.line(margin + 30, y + 2, pageWidth - margin, y + 2);
      
      y += 8;
    };

    // SECTION 1: PROFESSIONAL SUMMARY
    renderSectionHeader('Professional Summary');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    
    const summaryLines = doc.splitTextToSize(
      profile.bio,
      pageWidth - margin * 2
    );
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 4.5 + 4;

    // SECTION 2: EDUCATION
    renderSectionHeader('Education');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(profile.education, margin, y);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text('2024 - Present (Undergraduate)', pageWidth - margin, y, { align: 'right' });
    y += 4.5;
    
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text('• Core Coursework: Data Structures, Algorithms, Software Engineering, Web Technologies, Database Systems.', margin + 2, y);
    y += 4;
    doc.text('• Academic Performance: Distinction / Honor Roll.', margin + 2, y);
    y += 8;

    // SECTION 3: WORK EXPERIENCE
    renderSectionHeader('Work Experience');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text('Administration & Taxation at PT. DnA Puspita Persada Murni', margin, y);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Jul 2023 - Sep 2024', pageWidth - margin, y, { align: 'right' });
    y += 5;
    
    const expPoints = [
      '• Managed daily administrative workflows, documentation, and data entry processes.',
      '• Ensured accurate taxation reporting and compliance with local tax regulations.',
      '• Streamlined internal filing systems for better data retrieval and accuracy.'
    ];

    expPoints.forEach((pt) => {
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      doc.text(pt, margin + 2, y);
      y += 4.2;
    });
    y += 4;

    // SECTION 4: FEATURED PORTFOLIO PROJECTS (Otomatis dari portfolioData.ts)
    renderSectionHeader('Featured Engineering Projects');

    // Mengambil maksimal 3 project teratas agar muat di 1 halaman A4
    const topProjects = PROJECTS_DATA.slice(0, 3);

    topProjects.forEach((proj) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(proj.title, margin + 2, y);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(185, 28, 28);
      const techString = proj.technologies.slice(0, 5).join(', '); // Nampilin maksimal 5 tech
      doc.text(`[${techString}]`, pageWidth - margin, y, { align: 'right' });
      y += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      
      // Bungkus teks deskripsi biar nggak nabrak batas kertas
      const descLines = doc.splitTextToSize(`- ${proj.shortDescription}`, pageWidth - margin * 2 - 4);
      doc.text(descLines, margin + 4, y);
      y += descLines.length * 4.5 + 1;
    });
    y += 2;

    // SECTION 5: TECHNICAL COMPETENCIES
    renderSectionHeader('Technical Competencies & Tooling');

    const skillCategories = [
      { cat: 'Languages', items: 'HTML5, CSS3, JavaScript (ES6+), TypeScript' },
      { cat: 'Frameworks & Libs', items: 'React.js, Tailwind CSS, Framer Motion, Bootstrap' },
      { cat: 'Tools & Practices', items: 'Git, GitHub, Figma, VS Code, Responsive Design' }
    ];

    skillCategories.forEach((sc) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`• ${sc.cat}:`, margin + 2, y);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text(sc.items, margin + 46, y);
      y += 4.5;
    });

    // Footer note
    y = 285;
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y - 2, pageWidth - margin, y - 2);
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(`Official resume document generated from https://${profile.domain} · Available for immediate internship.`, margin, y + 2);

    // Save PDF file
    doc.save(`Resume_${profile.name.replace(/\s+/g, '_')}_Frontend_Engineer.pdf`);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#ef4444', '#dc2626', '#f43f5e', '#b91c1c'],
      });
    } catch {}
  } catch (err) {
    console.error('Failed to generate resume PDF', err);
  }
}