import React from 'react';
import { ArrowUpRight, Clock, ExternalLink } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  onClick?: () => void;
  link?: string;
  colorClass: string;
  isPlaceholder?: boolean;
}

export function Card({ title, description, onClick, link, colorClass, isPlaceholder = false }: CardProps) {
  const handleInteraction = (e: React.MouseEvent) => {
    if (isPlaceholder) return;
    if (link) {
      e.preventDefault();
      window.open(link, '_blank');
    } else if (onClick) {
      onClick();
    }
  };

  const Component = link ? 'a' : 'button';

  return (
    <Component 
      onClick={handleInteraction}
      href={link || undefined}
      className={`w-full text-left group relative p-8 h-[280px] rounded-2xl overflow-hidden transition-all duration-500
        ${isPlaceholder 
          ? 'bg-gradient-to-br from-white/5 to-transparent cursor-default' 
          : 'bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 hover:-translate-y-1'
        }
        backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/10
        hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)]`}
      disabled={isPlaceholder}
    >
      <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-white/5 opacity-0 
        ${!isPlaceholder && 'group-hover:opacity-100'} transition-opacity duration-500`} />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
            {isPlaceholder ? (
              <Clock className="w-6 h-6 text-white/50" />
            ) : (
              <div className={`w-6 h-6 rounded-lg ${colorClass} backdrop-blur-sm transition-colors duration-300`} />
            )}
          </div>
          {!isPlaceholder && (
            link ? (
              <ExternalLink className="text-white/50 w-6 h-6 transform translate-x-2 -translate-y-2 group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-300" />
            ) : (
              <ArrowUpRight className="text-white/50 w-6 h-6 transform translate-x-2 -translate-y-2 group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-300" />
            )
          )}
        </div>
        
        <h3 className={`text-2xl font-bold mb-3 transition-colors ${
          isPlaceholder ? 'text-white/50' : 'text-white group-hover:text-white/90'
        }`}>
          {title}
        </h3>
        
        <p className={`transition-colors line-clamp-3 ${
          isPlaceholder ? 'text-white/30' : 'text-gray-300 group-hover:text-white/70'
        }`}>
          {description}
        </p>
        
        {!isPlaceholder && (
          <div className="absolute bottom-8 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
      </div>
    </Component>
  );
}