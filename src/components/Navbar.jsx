import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onOpenForm }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleJoinClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (onOpenForm) onOpenForm();
  };

  return (
    <>
      <motion.nav 
        className="navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="navbar-container">
          {/* Authentic Logo */}
          <div className="navbar-logo">
            <img 
              src="https://msgsndr-private.storage.googleapis.com/companyPhotos/827693ea-f4ab-4df8-b31c-160a3cd4c9e0.png" 
              alt="RevenueLab360 Logo" 
              className="site-logo-img"
            />
          </div>
  
          {/* Desktop Links */}
          <ul className="navbar-links">
            <li><a href="#home" className="active">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#product">Product</a></li>
            <li><a href="#about">About us</a></li>
          </ul>
  
          {/* Buttons (Actions) */}
          <div className="navbar-actions">
            <a 
              href="https://app.revenuelab360.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-signin"
            >
              Sign in
            </a>
            <button onClick={handleJoinClick} className="btn-join">
              <span>Join Now</span>
              <ArrowUpRight size={16} />
            </button>
  
            {/* Hamburger toggle button (visible only on mobile) */}
            <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>
  
      {/* Mobile Glassmorphic Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu-wrapper"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu">
              <ul className="mobile-links">
                <li><a href="#home" className="active" onClick={() => setIsOpen(false)}>Home</a></li>
                <li><a href="#services" onClick={() => setIsOpen(false)}>Services</a></li>
                <li><a href="#product" onClick={() => setIsOpen(false)}>Product</a></li>
                <li><a href="#about" onClick={() => setIsOpen(false)}>About us</a></li>
                <li className="mobile-divider"></li>
                <li className="mobile-action-links">
                  <a 
                    href="https://app.revenuelab360.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mobile-btn-signin" 
                    onClick={() => setIsOpen(false)}
                  >
                    Sign in
                  </a>
                  <button onClick={handleJoinClick} className="mobile-btn-join">
                    <span>Join Now</span>
                    <ArrowUpRight size={16} />
                  </button>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
