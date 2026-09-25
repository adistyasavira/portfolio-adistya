import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ProfileData } from '../types/portfolio';

interface LanyardCardProps {
  profile: ProfileData;
}

export const LanyardCard: React.FC<LanyardCardProps> = ({ profile }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  //geraknya fleksibel
  const springConfig = { damping: 14, stiffness: 150, mass: 1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  //gerak kanan kiri atas bawah serong
  const moveX = useTransform(smoothX, [-1, 1], [-40, 40]);
  const moveY = useTransform(smoothY, [-1, 1], [-40, 40]);

  //efek ngayun natural
  const swingZ = useTransform(smoothX, [-1, 1], [-10, 10]); // Ayun miring kanan-kiri
  const swingX = useTransform(smoothY, [-1, 1], [10, -10]); // Ayun depan-belakang

  //kartunya miring nyesuain arah sorotan
  const tiltX = useTransform(smoothY, [-1, 1], [30, -30]);
  const tiltY = useTransform(smoothX, [-1, 1], [-30, 30]);

  //holo
  const sheenX = useTransform(smoothX, [-1, 1], [-50, 50]);
  const sheenY = useTransform(smoothY, [-1, 1], [-50, 50]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    //ngejepret balik ke tengah pas ditinggal
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="relative flex flex-col items-center select-none pt-2 pb-6 min-h-[400px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }} 
    >
      {/*bisa pindah tempat (x, y) sekaligus ngayun */}
      <motion.div
        className="flex flex-col items-center cursor-crosshair z-10"
        style={{
          originY: 0, 
          x: moveX,       
          y: moveY,       
          rotateZ: swingZ,
          rotateX: swingX,
        }}
      >
        {/* lanyard */}
        <div className="w-7 h-[110px] bg-gradient-to-b from-red-950 via-red-900 to-black border-x border-red-800/60 shadow-lg flex items-center justify-center relative overflow-hidden -mb-1 z-0">
          <span className="text-[7px] font-mono tracking-widest text-red-200 rotate-90 uppercase whitespace-nowrap opacity-90 font-bold">
            FRONTEND_ENGINEER
          </span>
          <div className="absolute inset-y-0 left-0.5 w-[1px] bg-red-500/60" />
          <div className="absolute inset-y-0 right-0.5 w-[1px] bg-red-500/60" />
        </div>

        {/* klip */}
        <div className="relative flex flex-col items-center z-20 pointer-events-none -mb-1">
          <div className="w-5 h-3 bg-gradient-to-b from-slate-300 via-slate-100 to-slate-400 rounded-sm shadow border border-slate-400" />
          <div className="w-3 h-4 border-2 border-slate-300 rounded-full -mt-1 bg-transparent" />
          <div className="w-6 h-2 bg-slate-900 rounded-full border border-slate-600 -mt-1 shadow-sm" />
        </div>

        {/* card */}
        <motion.div
          style={{
            rotateX: tiltX,
            rotateY: tiltY,
          }}
          className="w-64 sm:w-72 rounded-2xl p-5 shadow-2xl relative overflow-hidden border transition-colors bg-gradient-to-b from-[#180509] via-[#0d0205] to-[#050102] border-red-900/80 text-white z-10 mt-1"
        >
          {/* holo layer */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-red-500/40 to-white/10"
            style={{
              x: sheenX,
              y: sheenY,
            }}
          />

          <div className="flex justify-center mb-4 relative z-10">
            <div className="w-10 h-1.5 bg-black/60 rounded-full border border-red-900/60" />
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-red-950/60 mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
              <span className="text-[11px] font-mono tracking-wider text-red-400 uppercase font-semibold">
                ENGINEER PASS
              </span>
            </div>
            <span className="text-[10px] font-mono text-red-400 font-bold">
              ACCESS: GRANTED
            </span>
          </div>

          <div className="relative mb-4 flex justify-center relative z-10">
            <div className="relative w-40 h-48 rounded-xl overflow-hidden border border-red-900/60 shadow-inner bg-red-900/30 group">
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105 pointer-events-none"
              />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1 bg-black/85 backdrop-blur rounded text-[9px] font-mono text-slate-300 border border-red-900/50">
                <span className="truncate max-w-[80px]">{profile.domain}</span>
                <span className="text-red-400 font-bold">AUTHORIZED</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-4 relative z-10">
            <h3
              className="text-base font-bold tracking-tight text-white truncate px-1"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {profile.name.toUpperCase()}
            </h3>
            <p className="text-xs font-mono text-red-400 mt-0.5 font-medium truncate">
              {profile.role}
            </p>
            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 mt-1 truncate px-2">
              <span className="truncate">{profile.education}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-red-950/60 flex items-center justify-between relative z-10">
            <div className="flex items-end gap-[2px] h-7">
              {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6].map((w, idx) => (
                <div
                  key={idx}
                  className="bg-red-400/80 h-full"
                  style={{ width: `${(w % 3) + 1}px` }}
                />
              ))}
            </div>
            <div className="text-right">
              <span className="block text-[9px] font-mono text-slate-500">SYSTEM ID</span>
              <span className="text-[10px] font-mono text-red-300 font-semibold">
                B28-1504-CSSE
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <span className="text-[11px] font-mono text-slate-400 mt-6 flex items-center gap-1.5 opacity-80 pointer-events-none">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500" />
        Hover to Move & Tilt
      </span>
    </div>
  );
};