import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSyncState } from '../hooks/useSyncState';
import { Globe } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const gradientOverlays = [
  "from-purple-950/90 to-blue-900/90",
  "from-blue-950/90 to-indigo-900/90",
  "from-indigo-950/90 to-purple-900/90",
  "from-purple-950/90 to-pink-900/90",
  "from-indigo-950/90 to-blue-900/90",
];

export default function LowerThirdDisplay() {
  const [data] = useSyncState({
    isVisible: true,
    bgType: 'transparent',
    bgImage: '/worship_scene_bg.png',
    customLogo: '',
    events: []
  });

  const bgStyles = {
    chroma: 'bg-[#00b140]',
    black: 'bg-black',
    transparent: 'bg-transparent',
  };

  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const handleResize = () => {
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 1080;
      setScale(Math.min(scaleX, scaleY));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={cn(
      "w-screen h-screen flex items-center justify-center transition-colors duration-500 overflow-hidden",
      bgStyles[data.bgType]
    )}>
      <div 
        className="relative w-[1920px] h-[1080px] font-sans shrink-0 overflow-hidden"
        style={{ transform: `scale(${scale})` }}
      >
      <AnimatePresence>
        {data.isVisible && (
          <div className="absolute bottom-16 left-16 flex items-end gap-10 pointer-events-none">
            
            {/* Rotating World Space / Custom Logo */}
            <motion.div 
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="flex items-center justify-center relative z-20"
            >
              <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-orange-400 via-purple-600 to-blue-600 p-[3px] shadow-[0_0_50px_rgba(147,51,234,0.6)]">
                <div className="absolute inset-0 rounded-full border border-white/20 m-1" />
                <div className="w-full h-full rounded-full bg-black/60 backdrop-blur-xl flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent mix-blend-overlay"></div>
                  
                  {data.customLogo ? (
                    <motion.div
                      animate={{ rotateY: [0, 360] }}
                      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                      className="w-full h-full flex items-center justify-center"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <img 
                        src={data.customLogo} 
                        alt="Church Logo" 
                        className="w-[85%] h-[85%] object-contain drop-shadow-lg"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ rotateY: [0, 360] }}
                      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                      className="flex items-center justify-center"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <Globe size={100} strokeWidth={0.8} className="text-white/90 drop-shadow-md" />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Stacked Cards Container */}
            <div className="flex flex-col gap-3 relative z-10">
              <AnimatePresence>
                {data.events.filter(e => e.isVisible !== false).map((evt, idx) => (
                  <motion.div
                    key={evt.id || idx}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ 
                    delay: idx * 0.12, 
                    type: "spring", 
                    stiffness: 120, 
                    damping: 20 
                  }}
                  className="relative overflow-hidden rounded-2xl shadow-2xl backdrop-blur-xl border border-white/10 w-[1400px] flex items-stretch group"
                >
                  {/* Background Image Setup */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
                    style={{ backgroundImage: `url(${data.bgImage || '/worship_scene_bg.png'})` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-r pointer-events-none mix-blend-multiply",
                    gradientOverlays[idx % gradientOverlays.length]
                  )} />

                  {/* Gentle color cast */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-r opacity-50 pointer-events-none",
                    gradientOverlays[idx % gradientOverlays.length]
                  )} />

                  {/* Glassmorphism shine */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                  {/* Left Accent Bar */}
                  <div className="w-3 relative z-10 bg-gradient-to-b from-orange-400 to-amber-600 shadow-[0_0_15px_rgba(246,173,85,0.6)]" />

                  {/* Content */}
                  <motion.div 
                    animate={{ opacity: [1, 1, 0, 1] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 10, 
                      times: [0, 0.8, 0.9, 1],
                      delay: idx * 0.5,
                      ease: "easeInOut" 
                    }}
                    className="flex-1 px-8 py-5 relative z-10 flex flex-col justify-center"
                  >
                    <h2 className="text-4xl font-black uppercase tracking-widest text-white drop-shadow-lg">
                      {evt.day}
                    </h2>
                    <p className="text-xl font-medium text-white/90 tracking-wide mt-1 drop-shadow-md z-10">
                      {evt.title}
                    </p>
                  </motion.div>

                  {/* Time Indicator (Pill) */}
                  <div className="relative z-10 px-8 py-5 flex items-center justify-center border-l border-white/10 bg-black/40 backdrop-blur-lg">
                    <div className="px-5 py-2.5 rounded-full bg-white/10 border border-white/30 shadow-inner">
                      <span className="text-[17px] font-bold text-white tracking-widest whitespace-nowrap">
                        {evt.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
              </AnimatePresence>
            </div>

          </div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
