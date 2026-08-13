import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './FormModal.css';

export default function FormModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      // Save current scroll lock values
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;

      // Lock main body scroll
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      // Load LeadConnector form embed script dynamically
      const script = document.createElement('script');
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="form-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="form-modal-wrapper"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Authentic Circular Close Button (X) Positioned Right Above Top-Right Corner */}
            <button 
              className="form-modal-close-btn" 
              onClick={onClose} 
              aria-label="Close form"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            {/* Inner Black Card with Smooth Internal Scrollbar for Full Form */}
            <div className="form-modal-card">
              <iframe
                src="https://link.msgsndr.com/widget/form/7Cwhe5BKpcT0GJYtLfPe"
                className="form-modal-iframe"
                id="inline-7Cwhe5BKpcT0GJYtLfPe"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActive"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="RevenueLab360 Form"
                data-height="680"
                data-layout-iframe-id="inline-7Cwhe5BKpcT0GJYtLfPe"
                data-form-id="7Cwhe5BKpcT0GJYtLfPe"
                title="RevenueLab360 Form"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
