import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  colorClass: string;
}

export function Modal({ isOpen, onClose, title, description, colorClass }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 p-6 md:p-8 transform transition-all">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl ${colorClass}`} />
            <h2 className="text-3xl font-bold text-white">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <p className="text-lg text-white/90 leading-relaxed">
            {description}
          </p>
          
          {/* Additional content section */}
          <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Public Key</h3>
            <p className="text-white/70">
              nHUWpuUAaL7d6BKgzU7ttADu9UbeFUSnxMh4wESSBpATascVDUUm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}