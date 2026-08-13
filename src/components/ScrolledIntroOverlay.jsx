import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StandaloneIntroBlob from './StandaloneIntroBlob';

export default function ScrolledIntroOverlay({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 10 seconds waiting time for 4 shapes morphing (Square, Star, Triangle, Hexagon)
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Lock scrolling while overlay is active
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        zIndex: 99999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: isExiting ? 'none' : 'auto'
      }}
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => {
        if (isExiting && onComplete) {
          onComplete();
        }
      }}
    >
      <motion.div
        initial={{ scale: 1.05, opacity: 1 }}
        animate={isExiting ? { scale: 0, opacity: 0 } : { scale: 1.05, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <StandaloneIntroBlob />
      </motion.div>
    </motion.div>
  );
}
