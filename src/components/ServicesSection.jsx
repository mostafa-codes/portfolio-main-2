import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ServicesSection.css';

// ─── EXACT CDN LOGO URL MAPPINGS PROVIDED BY USER ───
const LOGO_SRC = {
  WhatsApp: 'https://cdn.worldvectorlogo.com/logos/whatsapp-3.svg',
  Stripe: 'https://cdn.worldvectorlogo.com/logos/stripe-2.svg',
  Meta: 'https://cdn.worldvectorlogo.com/logos/meta-3.svg',
  HubSpot: 'https://cdn.worldvectorlogo.com/logos/hubspot-1.svg',
  Calendly: 'https://cdn.worldvectorlogo.com/logos/calendly.svg',
  Mailchimp: 'https://cdn.worldvectorlogo.com/logos/mailchimp-freddie-icon.svg',
  WordPress: 'https://cdn.worldvectorlogo.com/logos/wordpress-2.svg',
  Shopify: 'https://cdn.worldvectorlogo.com/logos/shopify.svg',
  DocuSign: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAMFBMVEVHcExIAPJHAP//U0v/UlL/U1P/UlL/UlLLPpX/UlL/UlJMAP8AAADyTU2xOTmwOTkPZwfVAAAACnRSTlMA/hQV5UK+lyp2V8WCPQAAAG9JREFUKJHN0ksOgCAMRdEiXwvo/nerBDAlwBt7pydp2gBRTbPIeEuyAYtrgMwBIUN0CFkjPOmohdwa5saaSq1bnDNhusS+Ewpd4Dd5MfYt7xYS6BFagIYAWoCe9lhsg67+k9hVFPpjxUUH/RUVwAdJkBnqpOOYqgAAAABJRU5ErkJggg==',
  ActiveCampaign: 'https://w7.pngwing.com/pngs/283/881/png-transparent-activecampaign-app-logo-tech-companies-thumbnail.png',
  Zapier: 'https://cdn.worldvectorlogo.com/logos/zapier.svg',
  Google: 'https://cdn.worldvectorlogo.com/logos/google-g-2015.svg',
  PayPal: 'https://cdn.worldvectorlogo.com/logos/paypal-4.svg',
  Slack: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg',
  TikTok: 'https://cdn.worldvectorlogo.com/logos/tiktok-1.svg',
  Notion: 'https://cdn.worldvectorlogo.com/logos/notion-2.svg',
  Zoom: 'https://cdn.worldvectorlogo.com/logos/zoom-app.svg',
  OpenAI: 'https://cdn.worldvectorlogo.com/logos/openai-2.svg',
  Intercom: 'https://cdn.worldvectorlogo.com/logos/intercom-2.svg',
  Salesforce: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg',
  Mailgun: 'https://cdn.worldvectorlogo.com/logos/mailgun.svg',
  Twilio: 'https://cdn.worldvectorlogo.com/logos/twilio.svg',
  Figma: 'https://cdn.worldvectorlogo.com/logos/figma-icon.svg',
  Trello: 'https://cdn.worldvectorlogo.com/logos/trello.svg'
};

const stats = [
  { targetValue: 1612, prefix: '+$', suffix: ' / mo', duration: 3.2, label: 'Savings on Replaced Software Subscriptions' },
  { targetValue: 80, prefix: '+', suffix: '%', duration: 2.3, label: 'Team Efficiency & Productivity Boost' },
  { targetValue: 60, prefix: '-', suffix: '%', duration: 2.1, label: 'Reduction in Direct Operational Overhead' },
  { targetValue: 24, prefix: '', suffix: '/7', duration: 1.5, label: 'Autopilot AI Execution & Follow-up Workflows' }
];

const row1Integrations = [
  'WhatsApp', 'Stripe', 'Meta', 'HubSpot', 'Calendly', 'Mailchimp', 
  'WordPress', 'Shopify', 'DocuSign', 'ActiveCampaign', 'Zapier', 'Google',
  'PayPal', 'Slack', 'TikTok', 'Notion'
];

const row2Integrations = [
  'Zoom', 'OpenAI', 'Intercom', 'Salesforce', 'Mailgun', 'Twilio', 
  'Figma', 'Trello', 'WhatsApp', 'Stripe', 'HubSpot', 'Zapier',
  'Google', 'Meta', 'Shopify', 'Calendly'
];

function AnimatedCounter({ targetValue, prefix = '', suffix = '', duration = 1.5, isIntroFinished = true }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted || !isIntroFinished) return;
    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutProgress * targetValue));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, isIntroFinished, targetValue, duration]);

  useEffect(() => {
    if (isIntroFinished && !hasStarted) {
      setHasStarted(true);
    }
  }, [isIntroFinished]);

  return (
    <motion.span 
      onViewportEnter={() => { if (isIntroFinished) setHasStarted(true); }} 
      viewport={{ once: true, amount: 0.2 }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
}

export default function ServicesSection({ isIntroFinished = true }) {
  return (
    <section className="services-section" id="services">
      {/* Ambient Glows */}
      <div className="services-ambient-glow center-glow" />
      <div className="services-ambient-glow side-glow" />

      <div className="services-container">
        {/* ─── SECTION HEADER ─── */}
        <motion.div 
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="services-title">
            Unified Revenue Infrastructure <br />
            <span className="title-gradient">Engineered For Scale</span>
          </h2>

          <p className="services-subtitle">
            Consolidate your entire business stack. We replace fragmented tools with an all-in-one revenue operating engine designed to maximize conversion, automate follow-ups, and accelerate growth.
          </p>
        </motion.div>

        {/* ─── METRICS STRIP WITH INDIVIDUAL DYNAMIC COUNTERS ─── */}
        <motion.div 
          className="metrics-strip frosted-noise-strip"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="metrics-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="metric-item">
                <div className="metric-value">
                  <AnimatedCounter 
                    targetValue={stat.targetValue}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={stat.duration}
                    isIntroFinished={isIntroFinished}
                  />
                </div>
                <div className="metric-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── DUAL OPPOSITE-DIRECTION MARQUEE TICKERS (500+ INTEGRATIONS) ─── */}
        <div className="integrations-container">
          <div className="integrations-title">
            <span>Seamlessly Compatible With 500+ Platforms & Ecosystem Tools</span>
          </div>

          <div className="dual-ticker-wrapper">
            {/* ROW 1: Moves Right to Left */}
            <div className="ticker-track-row ticker-row-left">
              {row1Integrations.concat(row1Integrations).map((item, idx) => (
                <div key={'row1-' + idx} className="ticker-chip">
                  <span className="ticker-logo-icon">
                    <img 
                      src={LOGO_SRC[item]} 
                      alt={item} 
                      className="ticker-logo-img" 
                      loading="lazy"
                    />
                  </span>
                  <span className="chip-text">{item}</span>
                </div>
              ))}
            </div>

            {/* ROW 2: Moves Left to Right (Opposite Direction) */}
            <div className="ticker-track-row ticker-row-right">
              {row2Integrations.concat(row2Integrations).map((item, idx) => (
                <div key={'row2-' + idx} className="ticker-chip">
                  <span className="ticker-logo-icon">
                    <img 
                      src={LOGO_SRC[item]} 
                      alt={item} 
                      className="ticker-logo-img" 
                      loading="lazy"
                    />
                  </span>
                  <span className="chip-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
