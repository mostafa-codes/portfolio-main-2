"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export function BlurReveal({
  children,
  className,
  delay = 0,
  speedReveal = 1.5,
  speedSegment = 0.5,
  trigger = true,
  onAnimationComplete,
  onAnimationStart,
  as = "p",
  style,
  inView = false,
  once = true,
  letterSpacing,
}) {
  const MotionTag = motion[as] || motion.p;

  const stagger = 0.03 / speedReveal;
  const baseDuration = 0.3 / speedSegment;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
    exit: {
      transition: {
        staggerChildren: stagger,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, filter: "blur(12px)", y: 10 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: baseDuration,
      },
    },
    exit: { opacity: 0, filter: "blur(12px)", y: 10 },
  };

  return (
    <AnimatePresence mode="popLayout">
      {trigger && (
        <MotionTag
          initial="hidden"
          whileInView={inView ? "visible" : undefined}
          animate={inView ? undefined : "visible"}
          exit="exit"
          variants={containerVariants}
          viewport={{ once }}
          className={className}
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
          style={style}
        >
          <span className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>
            {children}
          </span>
          {children &&
            children.split(" ").map((word, wordIndex, wordsArray) => (
              <span
                key={`word-${wordIndex}`}
                className="inline-block whitespace-nowrap"
                style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
                aria-hidden="true"
              >
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={`char-${wordIndex}-${charIndex}`}
                    variants={itemVariants}
                    className="inline-block"
                    style={{
                      display: 'inline-block',
                      ...(letterSpacing ? { marginRight: letterSpacing } : {})
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordIndex < wordsArray.length - 1 && (
                  <motion.span
                    key={`space-${wordIndex}`}
                    variants={itemVariants}
                    className="inline-block"
                    style={{ display: 'inline-block' }}
                  >
                    &nbsp;
                  </motion.span>
                )}
              </span>
            ))}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}

export default BlurReveal;
