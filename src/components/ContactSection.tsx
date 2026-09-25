import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { createClient } from '@supabase/supabase-js'; // <-- Import Supabase
import {
  Send,
  MessageSquare,
  Linkedin,
  Github,
  Instagram,
  Youtube,
  Mail,
  Video,
  Heart,
  Pin,
  CheckCircle2,
  AlertCircle,
  Share2,
  Sparkles,
  Globe,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SOCIAL_LINKS } from '../data/portfolioData';
import { ProfileData } from '../types/portfolio';
import { InteractiveButton } from './InteractiveButton';

// 1. Inisialisasi Supabase Client (Langsung pakai kunci)
const supabaseUrl = 'https://isvgsxwnkqqxnknejqun.supabase.co'; 
const supabaseKey = 'sb_publishable_qc5MMWodPW003X1T5K8EXg_Q8Qrs9n-'; 
const supabase = createClient(supabaseUrl, supabaseKey);

interface ContactSectionProps {
  profile: ProfileData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  // State untuk Form Pesan Pribadi (Formspree)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // State untuk Guestbook (Supabase)
  const [comments, setComments] = useState<any[]>([]);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentPosting, setCommentPosting] = useState(false);

  // 2. Tarik Data Komentar dari Supabase saat web dibuka
  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false }); // Urutkan dari yang paling baru

      if (data && !error) {
        setComments(data);
      } else {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  // Format tanggal biar rapi (contoh: Sep 25, 20:13)
  const formatTimestamp = (dateString: string) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    }).format(date);
  };

  // 3. Fungsi Kirim Pesan Formspree (Tetap sama)
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('error');
      return;
    }
    setFormStatus('sending');
    try {
      const response = await fetch('https://formspree.io/f/mvkgbgbl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        try {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ['#ef4444'] });
        } catch {}
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 4000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  // 4. Fungsi Posting Komentar ke Supabase
  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !commentAuthor.trim()) return;

    setCommentPosting(true);

    // Kirim data ke tabel 'guestbook'
    const { data, error } = await supabase
      .from('guestbook')
      .insert([{ author: commentAuthor.trim(), comment: commentText.trim() }])
      .select();

    if (data && !error) {
      // Kalau sukses, tambahin data baru ke paling atas daftar di layar (tanpa perlu refresh)
      setComments([data[0], ...comments]);
      setCommentText('');
      setCommentAuthor('');
    } else {
      console.error('Error posting comment:', error);
    }
    
    setCommentPosting(false);
  };

  // 5. Fungsi Update Likes ke Supabase
  const handleLikeComment = async (id: any, currentLikes: number) => {
    // Ubah angka di layar secara instan (Optimistic UI)
    setComments(
      comments.map((c) => (c.id === id ? { ...c, likes: currentLikes + 1 } : c))
    );

    // Update data di database secara background
    await supabase
      .from('guestbook')
      .update({ likes: currentLikes + 1 })
      .eq('id', id);
  };

  const renderSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'github': return <Github className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      case 'tiktok': return <Video className="w-4 h-4" />;
      case 'mail': return <Mail className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-12 sm:py-20 relative">
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-red-950/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-semibold tracking-wider text-red-500 uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            Let's Connect & Collaborate
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Have an internship inquiry, project idea, or frontend developer opening? Send a message directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN (Formspree Contact) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl border transition-colors relative overflow-hidden bg-[#0c0406] border-red-950/70 shadow-xl">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <Mail className="w-5 h-5 text-red-500" />
                  <h3 className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Send a Message
                  </h3>
                </div>
                <p className="text-xs text-slate-400">Fill out the form below and I will respond to your email promptly.</p>
              </div>

              {formStatus === 'success' && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your message has been sent successfully! Thank you for reaching out.</span>
                </motion.div>
              )}

              {formStatus === 'error' && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-300 text-xs flex items-center gap-2 mb-6">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Failed to send message. Please try again later.</span>
                </motion.div>
              )}

              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Alex Morgan / Recruitment Team" className="w-full px-4 py-2.5 rounded-xl text-sm transition-colors border outline-none bg-black/40 border-red-950/80 focus:border-red-500 text-white placeholder-slate-600" />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="e.g. recruiter@company.com" className="w-full px-4 py-2.5 rounded-xl text-sm transition-colors border outline-none bg-black/40 border-red-950/80 focus:border-red-500 text-white placeholder-slate-600" />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">Your Message *</label>
                  <textarea name="message" required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Write your internship offer, project collaboration, or question here..." className="w-full px-4 py-2.5 rounded-xl text-sm transition-colors border outline-none resize-none bg-black/40 border-red-950/80 focus:border-red-500 text-white placeholder-slate-600" />
                </div>
                <InteractiveButton type="submit" variant="primary" size="md" disabled={formStatus === 'sending'} icon={<Send className="w-4 h-4" />} className="w-full">
                  <span>{formStatus === 'sending' ? 'Sending Message...' : 'Send Message Now'}</span>
                </InteractiveButton>
              </form>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border transition-colors bg-[#0c0406] border-red-950/70 shadow-xl">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <Share2 className="w-5 h-5 text-red-500" />
                  <h3 className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Verified Professional Channels</h3>
                </div>
                <p className="text-xs text-slate-400">Connect across social and developer platforms:</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <motion.a key={link.name} href={link.name === 'Email' ? `mailto:${profile.email}` : link.url} target="_blank" rel="noreferrer" whileHover={{ scale: 1.025, y: -2 }} whileTap={{ scale: 0.95 }} className="p-3.5 rounded-xl border flex items-center justify-between transition-all group bg-red-950/20 border-red-900/40 hover:border-red-600/60 hover:bg-red-900/30 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-black/60 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                        {renderSocialIcon(link.icon)}
                      </div>
                      <div>
                        <span className="block text-xs font-bold leading-tight group-hover:text-red-400 transition-colors">{link.name}</span>
                        <span className="text-[11px] font-mono text-slate-400 truncate max-w-[130px] block">{link.name === 'Email' ? profile.email : link.handle}</span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-500 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all">→</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Supabase Guestbook) */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-2xl border transition-colors bg-[#0c0406] border-red-950/70 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-red-950/60 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className="w-5 h-5 text-red-500" />
                    <h3 className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Guestbook & Comments</h3>
                  </div>
                  <p className="text-xs text-slate-400">Leave your feedback, greetings, or thoughts on this portfolio.</p>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-red-950/60 border border-red-900/60 text-red-400">
                  {comments.length}
                </span>
              </div>

              <form onSubmit={handlePostComment} className="mb-6 space-y-3">
                <input type="text" required value={commentAuthor} onChange={(e) => setCommentAuthor(e.target.value)} placeholder="Your Name or Alias..." className="w-full px-4 py-2 rounded-xl text-xs font-mono transition-colors border outline-none bg-black/40 border-red-950/80 focus:border-red-500 text-white placeholder-slate-600" />
                <div className="relative">
                  <textarea required rows={2} value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Share your thoughts or feedback here..." className="w-full px-4 py-2.5 rounded-xl text-xs transition-colors border outline-none resize-none bg-black/40 border-red-950/80 focus:border-red-500 text-white placeholder-slate-600" />
                </div>
                <div className="flex justify-end">
                  <InteractiveButton type="submit" variant="primary" size="sm" disabled={commentPosting} icon={<Send className="w-3.5 h-3.5" />}>
                    <span>{commentPosting ? 'Posting...' : 'Post Comment'}</span>
                  </InteractiveButton>
                </div>
              </form>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {comments.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 text-sm font-mono">No comments yet. Be the first to say hi!</div>
                ) : (
                  comments.map((comment) => (
                    <motion.div key={comment.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl border transition-colors ${comment.is_pinned ? 'bg-red-950/30 border-red-700/60 shadow-sm' : 'bg-black/40 border-red-950/60'}`}>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-red-950/80 border border-red-800/60 flex items-center justify-center text-red-400 text-xs font-bold font-mono">
                            {comment.author ? comment.author.charAt(0).toUpperCase() : '?'}
                          </div>
                          <div>
                            <span className="block text-xs font-bold leading-none text-white">{comment.author}</span>
                            <span className="text-[10px] font-mono text-slate-400">{formatTimestamp(comment.created_at)}</span>
                          </div>
                        </div>
                        {comment.is_pinned && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-600/30 text-red-300 border border-red-500/40">
                            <Pin className="w-3 h-3 text-red-400 rotate-45" /><span>PINNED</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs leading-relaxed mb-3 text-slate-300">{comment.comment}</p>
                      <div className="flex items-center justify-end">
                        <button onClick={() => handleLikeComment(comment.id, comment.likes)} className={`inline-flex items-center gap-1.5 text-xs font-mono transition-colors cursor-pointer px-2 py-1 rounded-lg ${comment.likes > 0 ? 'text-red-400 hover:text-red-300' : 'text-slate-500 hover:text-slate-300'}`}>
                          <Heart className={`w-3.5 h-3.5 ${comment.likes > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                          <span>{comment.likes || 0}</span>
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};