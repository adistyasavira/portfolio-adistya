import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, ShieldCheck } from 'lucide-react';
import { CertificateItem } from '../types/portfolio';
import { InteractiveButton } from './InteractiveButton';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
}) => {
  if (!certificate) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border z-10 my-8 bg-[#0c0305] border-red-900/60 text-white"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-red-950/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-red-500" />
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">
                Official Credential Verification
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                title="Print Certificate"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-red-950/60 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-red-950/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Certificate Canvas - SEKARANG LANGSUNG NAMPILIN GAMBAR */}
          <div className="p-4 sm:p-6 bg-black/90 flex justify-center items-center min-h-[300px]">
            {/* Pakai 'as any' biar TypeScript lu gak error karena kita baru nambahin properti certificateImage */}
            {(certificate as any).certificateImage ? (
              <img
                src={(certificate as any).certificateImage}
                alt={certificate.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-md shadow-[0_0_30px_rgba(220,38,38,0.15)] border border-red-900/40"
              />
            ) : (
              <p className="text-slate-500 font-mono text-sm">Image credential not found.</p>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-red-950/60 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="truncate pr-4">{certificate.title}</span>
            <InteractiveButton
              variant="primary"
              size="sm"
              onClick={onClose}
            >
              <span>Close Modal</span>
            </InteractiveButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};