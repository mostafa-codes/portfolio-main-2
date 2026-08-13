import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import Navbar from './components/Navbar';
import BlobSphere from './components/BlobSphere';
import ServicesSection from './components/ServicesSection';
import TimelineSection from './components/TimelineSection';
import FormModal from './components/FormModal';
import TextRevealHeader from './components/ui/TextRevealHeader';
import BlurReveal from './components/ui/BlurReveal';
import ScrolledIntroOverlay from './components/ScrolledIntroOverlay';
import './App.css';

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const overlayRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showStickyNavbar, setShowStickyNavbar] = useState(false);
  const [lastAction, setLastAction] = useState(null);

  // 100% Rock-Solid Scroll Position Detection across Page Reloads / Refreshes:
  const [isOutsideHeroOnLoad] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedY = sessionStorage.getItem('lastScrollY');
      if (savedY !== null) {
        return parseInt(savedY, 10) >= 200;
      }
      return window.scrollY >= 200;
    }
    return false;
  });

  // Track whether the scrolled intro overlay has completely finished fading out
  const [isOverlayFinished, setIsOverlayFinished] = useState(!isOutsideHeroOnLoad);

  // Save exact scroll position right before page reloads/unloads
  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem('lastScrollY', window.scrollY.toString());
    };
    window.addEventListener('beforeunload', saveScroll);
    window.addEventListener('scroll', saveScroll, { passive: true });
    return () => {
      window.removeEventListener('beforeunload', saveScroll);
      window.removeEventListener('scroll', saveScroll);
    };
  }, []);

  // 🎬 HERO INTRO TIMELINE (Used ONLY when refreshing inside Hero Section):
  // Step 0 (0.0s - 10.0s): Centered 10s wait — morphs Square -> Star -> Triangle -> Hexagon Logo inside Hero
  // Step 1 (10.0s): Hero BlobSphere glides right (10.0s -> 12.1s)
  // Step 2 (12.1s): Main Headline (TextRevealHeader) starts character reveal
  // Step 3 (13.6s): Small Description (BlurReveal) + Buttons start character blur reveal
  // Step 4 (15.6s): Top Navbar slides down ONLY after ALL text has completely finished and settled!
  const [introStep, setIntroStep] = useState(isOutsideHeroOnLoad ? 5 : 0);

  useEffect(() => {
    if (!isOutsideHeroOnLoad) {
      const timer1 = setTimeout(() => setIntroStep(1), 10000);
      const timer2 = setTimeout(() => setIntroStep(2), 12100);
      const timer3 = setTimeout(() => setIntroStep(3), 13600);
      const timer4 = setTimeout(() => setIntroStep(4), 15600);
      const timer5 = setTimeout(() => setIntroStep(5), 16600);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
      };
    }
  }, [isOutsideHeroOnLoad]);

  // Lock scrolling during Hero intro step 0 if inside Hero
  useEffect(() => {
    if (!isOutsideHeroOnLoad && introStep === 0) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else if (!isOutsideHeroOnLoad) {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [introStep, isOutsideHeroOnLoad]);

  // Scroll animation tracking
  const { scrollYProgress } = useScroll({
    target: overlayRef,
    offset: ["start start", "end end"]
  });

  // Hero parallax fade out
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.92]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.15]);
  const heroFilter = useTransform(scrollYProgress, [0, 0.35], ["blur(0px)", "blur(6px)"]);

  // Video expansion transforms
  const videoScale = useTransform(scrollYProgress, [0, 0.10, 0.65, 1], [0.3, 0.3, 1, 1]);
  const videoBorderRadius = useTransform(scrollYProgress, [0, 0.10, 0.65, 1], ["36px", "36px", "12px", "12px"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.10, 0.65, 1], [0, 0, 1, 1]);

  // Scroll playback window & sticky navbar trigger
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (videoRef.current) {
      if (latest >= 0.02 && latest <= 0.84) {
        if (videoRef.current.paused && isPlaying) {
          videoRef.current.play().catch(() => {});
        }
      } else {
        if (!videoRef.current.paused) {
          videoRef.current.pause();
        }
      }
    }

    if (latest > 0.85) {
      setShowStickyNavbar(true);
    } else {
      setShowStickyNavbar(false);
    }
  });

  // IntersectionObserver backup: Guarantees video PAUSES when section leaves viewport
  useEffect(() => {
    const videoElem = videoRef.current;
    if (!videoElem) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && videoElem && !videoElem.paused) {
            videoElem.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(videoElem);
    return () => observer.disconnect();
  }, []);

  // Click anywhere on video box to toggle play/pause
  const handleVideoClick = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }

      if (videoRef.current.paused) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          triggerActionFeedback('play');
        }).catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        triggerActionFeedback('pause');
      }
    }
  };

  const triggerActionFeedback = (action) => {
    setLastAction(action);
    setTimeout(() => {
      setLastAction(null);
    }, 700);
  };

  return (
    <div className="app-container">
      {/* Premium Noise Grain Overlay */}
      <div className="noise-overlay"></div>

      {/* ─── DEDICATED SEPARATE INTRO OVERLAY FOR REFRESH OUTSIDE HERO ─── */}
      {isOutsideHeroOnLoad && !isOverlayFinished && (
        <ScrolledIntroOverlay onComplete={() => setIsOverlayFinished(true)} />
      )}

      {/* ─── DYNAMIC FLOATING STICKY NAVBAR ─── */}
      <AnimatePresence>
        {showStickyNavbar && (
          <motion.div 
            className="sticky-navbar-wrapper"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Navbar onOpenForm={() => setIsFormOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── MAIN PAGE CONTENT (Fades in smoothly after overlay finishes if refreshed outside Hero) ─── */}
      <div style={{ opacity: isOutsideHeroOnLoad && !isOverlayFinished ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        
        {/* ─── FIXED HERO ─── */}
        <motion.div 
          id="fixed-hero"
          className="fixed-hero-container"
          style={{
            scale: heroScale,
            opacity: heroOpacity,
            filter: heroFilter
          }}
        >
          {/* TOP NAVBAR */}
          <motion.div
            className="top-navbar-holder"
            animate={{
              y: (isOutsideHeroOnLoad || introStep >= 4) ? 0 : -90,
              opacity: (isOutsideHeroOnLoad || introStep >= 4) ? 1 : 0
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ pointerEvents: (isOutsideHeroOnLoad || introStep >= 4) ? 'auto' : 'none' }}
          >
            <Navbar onOpenForm={() => setIsFormOpen(true)} />
          </motion.div>

          <main className="hero-section">
            {/* HERO 3D BLOB SPHERE: Completely unaffected by scrolled refresh */}
            <motion.div
              className="blob-motion-container"
              initial={{
                left: isOutsideHeroOnLoad ? "82%" : "50%",
                top: "50%",
                x: "-50%",
                y: "-50%",
                scale: isOutsideHeroOnLoad ? 1.0 : 1.05,
                opacity: 1
              }}
              animate={
                isOutsideHeroOnLoad
                  ? { left: "82%", top: "50%", x: "-50%", y: "-50%", scale: 1.0, opacity: 1 }
                  : (introStep === 0
                      ? { left: "50%", top: "50%", x: "-50%", y: "-50%", scale: 1.05, opacity: 1 }
                      : { left: "82%", top: "50%", x: "-50%", y: "-50%", scale: 1.0, opacity: 1 }
                    )
              }
              transition={{ duration: 2.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <BlobSphere />
            </motion.div>

            <div className="canvas-glow"></div>

            <div className="hero-grid">
              <div className="hero-left">
                {/* MAIN HEADLINE */}
                <TextRevealHeader 
                  active={isOutsideHeroOnLoad || introStep >= 2}
                  line1="Your Business Back"
                  line2Prefix="Under Your "
                  accentWord="Control."
                />

                {/* SMALL DESCRIPTION + BUTTONS */}
                <div 
                  className="hero-subcontent-wrapper"
                  style={{
                    visibility: (isOutsideHeroOnLoad || introStep >= 3) ? 'visible' : 'hidden',
                    pointerEvents: (isOutsideHeroOnLoad || introStep >= 3) ? 'auto' : 'none'
                  }}
                >
                  {(isOutsideHeroOnLoad || introStep >= 3) && (
                    <BlurReveal
                      className="hero-description"
                      speedReveal={1.6}
                      speedSegment={0.6}
                    >
                      A complete all-in-one revenue system that brings every tool you need to manage, automate, and scale your business — in one unified place.
                    </BlurReveal>
                  )}

                  <motion.div 
                    className="hero-actions"
                    animate={{
                      opacity: (isOutsideHeroOnLoad || introStep >= 3) ? 1 : 0,
                      y: (isOutsideHeroOnLoad || introStep >= 3) ? 0 : 15
                    }}
                    transition={{ duration: 0.8, delay: isOutsideHeroOnLoad ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button onClick={() => setIsFormOpen(true)} className="btn-primary">
                      <span>Get Started</span>
                      <ArrowUpRight size={18} />
                    </button>
                    <a href="#services" className="btn-secondary">
                      <span>Our Services</span>
                    </a>
                  </motion.div>

                  <motion.div 
                    className="text-accent-line"
                    animate={{
                      opacity: (isOutsideHeroOnLoad || introStep >= 3) ? 0.85 : 0,
                      scaleX: (isOutsideHeroOnLoad || introStep >= 3) ? 1 : 0
                    }}
                    transition={{ duration: 0.8, delay: isOutsideHeroOnLoad ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: 'left' }}
                  ></motion.div>
                </div>
              </div>
            </div>
          </main>
        </motion.div>

        {/* Scroll Track Spacer */}
        <div className="hero-scroll-spacer"></div>

        {/* ─── OVERLAY VIDEO SECTION ─── */}
        <section 
          id="overlay-video-section" 
          className="overlay-video-section" 
          ref={overlayRef}
        >
          <div className="overlay-video-sticky-container">
            {/* Layer 1: Static gradient */}
            <div className="showreel-section-bg-gradient" />

            {/* Layer 2: Solid overlay — fades in with scroll */}
            <motion.div 
              className="showreel-section-bg"
              style={{ opacity: bgOpacity }}
            />

            <div className="showreel-video-container">
              <motion.div 
                className="showreel-video-box"
                style={{
                  scale: videoScale,
                  borderRadius: videoBorderRadius
                }}
                onClick={handleVideoClick}
              >
                <div className="showreel-inner">
                  <video 
                    ref={videoRef}
                    src="https://storage.googleapis.com/msgsndr/XRpOCwgiGWq4n5okjjd0/media/6978b8684d506db2e844bbc2.mp4"
                    className="showreel-video-element"
                    playsInline
                    loop
                    muted={isMuted}
                    preload="auto"
                  />

                  {/* Minimal Sound Badge when muted */}
                  <AnimatePresence>
                    {isMuted && (
                      <motion.div 
                        className="showreel-controls-overlay showreel-controls-minimal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="sound-button-minimal" title="Click anywhere to unmute">
                          <VolumeX size={22} className="sound-icon-minimal" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Instant Visual Ripple Feedback on Play/Pause Click Anywhere */}
                  <AnimatePresence>
                    {lastAction && (
                      <motion.div 
                        className="video-click-feedback-badge"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1.15, opacity: 1 }}
                        exit={{ scale: 1.4, opacity: 0 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                      >
                        {lastAction === 'play' ? <Play size={28} fill="#ffffff" /> : <Pause size={28} fill="#ffffff" />}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── SERVICES SECTION ─── */}
        <ServicesSection isIntroFinished={isOverlayFinished} />

        {/* ─── 6 PILLARS TIMELINE SECTION ─── */}
        <TimelineSection isIntroFinished={isOverlayFinished} />

        {/* ─── FORM MODAL ─── */}
        <FormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      </div>
    </div>
  );
}
