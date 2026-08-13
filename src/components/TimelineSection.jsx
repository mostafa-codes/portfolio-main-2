import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { 
  Layers, 
  Layout, 
  Users, 
  Workflow, 
  Bot, 
  CreditCard, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import './TimelineSection.css';

// 6 Core Revenue Pillars Data with authentic copy
const timelinePillars = [
  {
    step: '01',
    title: 'Operating System',
    tagline: 'The Complete Revenue Operating System',
    icon: Layers,
    description: 'One unified platform connecting marketing, sales, automation, and billing in a smart command center — giving you total clarity and absolute control over your revenue growth.',
    bullets: [
      'Built for any business model: Service agencies, e-commerce, academies, medical centers & real estate.',
      'Fully integrated in one place: Funnels, CRM, Automation, Conversations, Payments, and Analytics.',
      'Fewer tools, more control: Eliminate scattered subscriptions and run your business from one unified Dashboard.'
    ]
  },
  {
    step: '02',
    title: 'Funnels & Sites',
    tagline: 'Conversion-Ready Pages & Digital Access',
    icon: Layout,
    description: 'Turn visitors into qualified leads, and leads into paying customers. Build high-converting landing pages, offers, and membership portals without coding complexity.',
    bullets: [
      'Conversion-ready websites & landing pages: Fast, responsive pages engineered for maximum sales conversion.',
      'Smart Funnels, Forms & Surveys: Design clear customer paths that collect data and qualify leads automatically.',
      'Memberships & Digital Access: Create exclusive member areas, sell courses, or deliver digital products effortlessly.'
    ]
  },
  {
    step: '03',
    title: 'Smart CRM',
    tagline: 'Central Contact Database & Visual Sales Kanban',
    icon: Users,
    description: 'Track every lead and opportunity from initial contact to closed deal. Manage your pipeline with visual clarity and intelligent customer segmentation.',
    bullets: [
      'Smart management for every contact: Organize all customers and leads in a centralized smart database.',
      'Visual & clear Pipelines: Monitor every sales opportunity step-by-step through customized visual stages.',
      'Smart Segmentation & Real-time Tracking: Target specific audience segments and analyze conversion health in real time.'
    ]
  },
  {
    step: '04',
    title: 'Automation Engine',
    tagline: 'Multi-Channel Workflows on Autopilot',
    icon: Workflow,
    description: 'Put your growth engine on autopilot. Execute behavior-driven automation scenarios across WhatsApp, Email, SMS, and Social DM in a single workflow.',
    bullets: [
      'Multi-channel automation: Launch campaigns via Email, WhatsApp, SMS, and social messages from one builder.',
      'Behavior-based Workflows: Trigger intelligent scenarios reacting to clicks, form fills, bookings, and purchases.',
      'Instant automated follow-ups: Maintain non-stop conversation momentum and eliminate response delays.'
    ]
  },
  {
    step: '05',
    title: 'AI Assistant & Booking',
    tagline: 'Unified Inbox & Instant Calendar Booking',
    icon: Bot,
    description: 'Stop losing leads inside message threads. RevenueLab360 brings WhatsApp, Instagram, Facebook, and SMS into one AI-driven inbox with instant calendar booking.',
    bullets: [
      'Unified Inbox for all channels: WhatsApp, Facebook, Instagram, SMS, and live chat — all in one inbox.',
      'Smart calendar & instant bookings: Allow clients to book consultations based on your real-time availability.',
      'AI qualification flows: Qualify prospects automatically inside conversation threads to close deals faster.'
    ]
  },
  {
    step: '06',
    title: 'Payments & MRR',
    tagline: 'Global Gateways & Recurring Subscription MRR',
    icon: CreditCard,
    description: 'Collect payments globally and locally, manage recurring subscriptions, and monitor your monthly recurring revenue (MRR) with total financial clarity.',
    bullets: [
      'Local & global payment gateways: Connect Stripe, credit cards, Fawry, Apple Pay, and crypto gateways seamlessly.',
      'Subscriptions & Recurring Revenue: Build predictable income with automated recurring billing and renewals.',
      'Revenue analytics & ROI clarity: Track sales performance in real time to identify top-performing acquisition channels.'
    ]
  }
];

export default function TimelineSection({ isIntroFinished = true }) {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 20%', 'end 80%']
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section className="timeline-section-container" ref={containerRef}>
      {/* Background Ambient Glows */}
      <div className="timeline-ambient-glow center-glow" />
      <div className="timeline-ambient-glow side-glow" />

      {/* Header */}
      <div className="timeline-header-block">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="timeline-badge font-mono">
            <Sparkles size={14} className="text-amber-400" />
            <span>CORE ARCHITECTURE</span>
          </div>

          <h2 className="timeline-main-title">
            The 6 Pillars Of Your <br />
            <span className="title-gradient-orange">Revenue Operating System</span>
          </h2>

          <p className="timeline-subtitle">
            Explore how RevenueLab360 replaces scattered tools with a seamlessly connected, high-performance growth engine built for scale.
          </p>
        </motion.div>
      </div>

      {/* Timeline Wrapper */}
      <div ref={ref} className="timeline-list-wrapper">
        {timelinePillars.map((item, index) => {
          const IconComp = item.icon;
          return (
            <div key={index} className="timeline-item-row">
              {/* Sticky Node Column (Left) */}
              <div className="timeline-sticky-node-col">
                <div className="timeline-node-dot-outer">
                  <div className="timeline-node-dot-inner" />
                </div>
                <div className="timeline-step-title">
                  <span className="step-num">{item.step}.</span>
                  <span className="step-text">{item.title}</span>
                </div>
              </div>

              {/* Content Card Column (Right) */}
              <div className="timeline-content-col">
                <motion.div 
                  className="timeline-card-box"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="card-header-icon-row">
                    <div className="card-icon-badge">
                      <IconComp size={22} />
                    </div>
                    <span className="card-tagline">{item.tagline}</span>
                  </div>

                  <h3 className="card-title-heading">{item.title}</h3>
                  <p className="card-description-text">{item.description}</p>

                  <div className="card-bullets-list">
                    {item.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="bullet-row-item">
                        <CheckCircle2 size={16} className="bullet-icon-check" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}

        {/* Vertical Glowing Beam Line */}
        <div
          style={{ height: height + 'px' }}
          className="timeline-vertical-track-line"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform
            }}
            className="timeline-glowing-beam-fill"
          />
        </div>
      </div>
    </section>
  );
}
