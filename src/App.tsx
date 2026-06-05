import React, { useEffect, useState } from "react";
import * as d3 from 'd3';
import { TabScrollNav } from "./components/TabScrollNav";
import { ParticleHeadline } from "./components/ParticleHeadline";
import { LiveTerminal } from "./components/LiveTerminal";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "motion/react";
import Lenis from "@studio-freight/lenis";
import {
  WireframeCube,
  WireframeChart,
  WireframeNodes,
  WireframeLinearStack,
  WireframeLinearCubes,
  WireframeLinearPanels,
  WireframeNetworkNode,
  WireframePhone,
  WireframeBoxes,
  WireframeServer,
  WireframeSVGEnterpriseStack,
  WireframeSVGChart,
  WireframeSVGNetwork,
  WireframeSVGStack,
  Wireframe3DChart,
  Wireframe3DNodes,
} from "./components/Wireframe";



const Navbar = ({ onBookCall }: { onBookCall: () => void }) => {
  return (
    <nav className="w-full h-[80px] flex items-center px-6 md:px-12 border-b-4 border-[var(--border)] bg-[var(--bg)] sticky top-0 z-50">
      <div className="flex-1 flex items-center">
        <button 
          onClick={() => {
            if ((window as any).lenis) {
              (window as any).lenis.scrollTo(0, { duration: 1.2 });
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="font-display font-black text-[24px] tracking-[0.2em] text-white hover:text-gray-300 transition-colors uppercase bg-transparent border-none p-0 cursor-pointer text-left"
        >
          ARCHANGEL
        </button>
      </div>
      <div className="hidden md:flex items-center justify-center gap-10 flex-1"></div>
      <div className="flex-1 flex justify-end gap-4">
        <button
          onClick={onBookCall}
          className="font-mono bg-white text-black hover:bg-black hover:text-white border-2 border-white text-[12px] font-black uppercase tracking-[0.15em] px-6 py-2.5 transition-all cursor-pointer rounded-none shadow-[4px_4px_0_0_rgba(255,255,255,0.2)]"
        >
          Contact
        </button>
      </div>
    </nav>
  );
};

const Hero = ({ onBookCall }: { onBookCall: () => void }) => {
  return (
    <motion.section id="hero"  className="relative bg-[var(--bg)] text-[var(--primary)] pt-[100px] md:pt-[160px] pb-[100px] px-6 w-full border-b-4 border-[var(--border)] overflow-hidden" 
      initial={{ opacity: 0, filter: "blur(8px)", y: 30 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 2px, transparent 2px)',
             backgroundSize: '24px 24px'
           }} 
      />
      <div className="max-w-[1200px] mx-auto w-full relative z-10 pt-[40px] px-2 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Block: Particle Headline & Paragraph */}
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left">
            <ParticleHeadline onClick={onBookCall} />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-body text-[16px] md:text-[18px] text-[var(--primary)]/80 leading-[1.6] max-w-[580px] mt-6 mb-8"
            >
              High-performance systems engineering for ambitious teams. We bridge the gap
              between complex low-level architecture and real-world commercial success with technical precision.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <button
                onClick={onBookCall}
                className="font-mono bg-[var(--primary)] text-black hover:bg-black hover:text-white hover:border-[var(--primary)] border-2 border-[var(--primary)] text-[12px] font-black uppercase tracking-[0.2em] px-8 py-4 transition-all cursor-pointer rounded-none shadow-[6px_6px_0_0_rgba(255,255,255,0.15)] flex items-center gap-3"
              >
                <span>Book Protocol Session</span>
                <span className="font-sans font-normal text-[16px]">→</span>
              </button>
            </motion.div>
          </div>

          {/* Right Block: Live Terminal Console */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="w-full max-w-[480px] lg:max-w-none flex items-center justify-center relative pointer-events-auto shadow-2xl"
            >
              <LiveTerminal className="w-full min-h-[380px]" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trusted By Marquee */}
      <div className="mt-[100px] border-y-2 border-[var(--border)] pt-[40px] pb-[40px] overflow-hidden relative bg-[var(--hover-bg)]">
        <div className="font-mono text-[12px] text-[var(--primary)] mb-8 uppercase tracking-[0.2em] font-semibold flex w-full justify-center">
          TRUSTED BY ELITE ORGANIZATIONS IN:
        </div>
        
        <div className="flex whitespace-nowrap overflow-hidden relative w-full group cursor-pointer" onMouseEnter={(e) => playSpatialSound(e, 150)}>
           <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="flex items-center gap-12 md:gap-24 w-max"
           >
              {/* First Set */}
              {["HEALTHCARE SYSTEMS", "GOVERNMENT PORTALS", "SAAS PLATFORMS", "REAL ESTATE TECH", "IOT & AUTOMATION", "ENTERPRISE ERP", "DIGITAL SIGNAGE", "E-COMMERCE", "FINANCIAL DASHBOARDS"].map((industry, i) => (
                <div key={`set1-${i}`} className="flex items-center gap-6 group-hover:scale-105 transition-transform duration-500 hover:text-[var(--primary)] text-[var(--primary)]">
                  <span className="font-display font-bold uppercase tracking-wider text-[16px] md:text-[24px] transition-colors duration-300">
                    {industry}
                  </span>
                </div>
              ))}
              
              {/* Duplicate Set for seamless looping */}
              {["HEALTHCARE SYSTEMS", "GOVERNMENT PORTALS", "SAAS PLATFORMS", "REAL ESTATE TECH", "IOT & AUTOMATION", "ENTERPRISE ERP", "DIGITAL SIGNAGE", "E-COMMERCE", "FINANCIAL DASHBOARDS"].map((industry, i) => (
                <div key={`set2-${i}`} className="flex items-center gap-6 group-hover:scale-105 transition-transform duration-500 hover:text-[var(--primary)] text-[var(--primary)]">
                  <span className="font-display font-bold uppercase tracking-wider text-[16px] md:text-[24px] transition-colors duration-300">
                    {industry}
                  </span>
                </div>
              ))}
           </motion.div>
           
           <div className="absolute top-0 left-0 w-24 md:w-32 h-full bg-gradient-to-r from-[var(--bg)] to-transparent pointer-events-none z-10 transition-opacity duration-500 group-hover:opacity-100"></div>
           <div className="absolute top-0 right-0 w-24 md:w-32 h-full bg-gradient-to-l from-[var(--bg)] to-transparent pointer-events-none z-10 transition-opacity duration-500 group-hover:opacity-100"></div>
        </div>
      </div>
    </motion.section>
  );
};

const OverviewSection = () => {
  return (
    <motion.section 
      id="overview"  
      className="relative bg-[var(--bg)] text-[var(--primary)] py-[120px] px-6 w-full border-b-4 border-[var(--border)] overflow-hidden" 
      initial={{ opacity: 0, filter: "blur(8px)", y: 30 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 2px, transparent 2px)',
             backgroundSize: '24px 24px'
           }} 
      />
      <div className="max-w-[750px] mx-auto w-full pt-[40px] flex flex-col md:flex-row justify-between items-center gap-8 text-[var(--body)] border-b border-[rgba(255,255,255,0.08)] pb-[40px]">
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <span className="font-display font-medium text-[32px] text-[var(--primary)]">
            19+
          </span>
          <span className="font-body text-[12px] uppercase tracking-[0.05em]">
            Years Combined
          </span>
        </div>
        <div className="hidden md:block w-[1px] h-[32px] bg-[rgba(255,255,255,0.08)]"></div>
        <div className="flex items-center gap-3">
          <span className="font-body text-[12px] uppercase tracking-[0.1em]">
            // US · EU · UK MARKETS
          </span>
        </div>
        <div className="hidden md:block w-[1px] h-[32px] bg-[rgba(255,255,255,0.08)]"></div>
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <span className="font-display font-medium text-[32px] text-[var(--primary)]">
            90%
          </span>
          <span className="font-body text-[12px] uppercase tracking-[0.05em]">
            Performance Gains
          </span>
        </div>
      </div>

      <div className="mt-[120px] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pb-[40px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-8 bg-[var(--bg)] rounded-[4px] border-2 border-[var(--border)] p-8 md:p-12 relative h-full flex flex-col justify-between overflow-hidden min-h-[400px] group text-[var(--primary)]"
        >
          <div className="relative z-10 w-full md:w-1/2">
            <div className="font-body text-[10px] sm:text-[11px] text-[var(--primary)]/60 uppercase tracking-[0.1em] mb-4">
              01 / CAPABILITY
            </div>
            <h3 className="font-display text-[24px] sm:text-[28px] md:text-[32px] font-medium text-[var(--primary)] mb-3 leading-[1.1]">
              Enterprise Architecture
            </h3>
            <p className="font-body text-[14px] sm:text-[15px] text-[var(--primary)]/80 leading-[1.6]">
              Scalable systems designed for millions of concurrent users with
              zero downtime deployments and microservices orchestration.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-4 bg-transparent border-2 border-[var(--border)] rounded-[4px] p-8 md:p-12 relative h-full flex flex-col justify-between overflow-hidden min-h-[400px] group text-[var(--primary)]"
        >
          <div className="relative z-10 w-full">
            <div className="font-body text-[10px] sm:text-[11px] text-[var(--primary)]/60 uppercase tracking-[0.1em] mb-4">
              02 / FOCUS
            </div>
            <h3 className="font-display text-[24px] sm:text-[28px] md:text-[32px] font-medium text-[var(--primary)] mb-3 leading-[1.1]">
              React + Rust
            </h3>
            <p className="font-body text-[14px] sm:text-[15px] text-[var(--primary)]/80 leading-[1.6]">
              Type-safe frontend logic paired with memory-safe backend
              performance.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const EngineeringManifesto = () => {
  return (
    <motion.section id="manifesto"  className="relative bg-[var(--bg)] text-[var(--primary)] py-[120px] w-full border-t-4 border-[var(--border)]" 
      initial={{ opacity: 0, filter: "blur(8px)", y: 30 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 2px, transparent 2px)',
             backgroundSize: '24px 24px'
           }} 
      />
      <div className="relative z-10 max-w-[1000px] mx-auto px-6 w-full font-body text-[16px] md:text-[20px] leading-[1.6]">
        <h2 className="font-display font-bold text-[24px] text-[var(--primary)] mb-8 tracking-wider">THE CORE SYSTEM PROTOCOLS</h2>
        
        <p className="mb-6 font-mono text-[var(--primary)]/90 font-bold leading-[1.7] text-[15px] md:text-[17px]">
          We reject the false compromise between speed and structural safety. Today's software systems are buried under unnecessary compile-time bloat, fragile external dependencies, and poorly verified state boundaries.
        </p>
        
        <p className="mb-6 font-mono text-[var(--primary)]/90 font-bold leading-[1.7] text-[15px] md:text-[17px]">
          Our operations adhere to three non-negotiable principles:
        </p>

        <ul className="mb-8 pl-4 space-y-4 font-mono text-[14px] md:text-[16px] leading-[1.6]">
          <li className="flex gap-4 items-start">
            <span className="text-[var(--primary)] mt-1.5">■</span> 
            <span>
              <strong className="text-[var(--primary)] font-bold uppercase tracking-wider block mb-1">Bounded Latency and Predictable Correctness</strong>
              Every execution route must maintain a deterministic latency budget. We engineer systems with clear performance bounds, keeping allocations and garbage collection overhead to an absolute minimum.
            </span>
          </li>
          <li className="flex gap-4 items-start">
            <span className="text-[var(--primary)] mt-1.5">■</span> 
            <span>
              <strong className="text-[var(--primary)] font-bold uppercase tracking-wider block mb-1">Strict Structural Safety</strong>
              A high-concurrency architecture is only as dependable as its safest state barrier. We leverage static type safety, end-to-end trace modeling, and runtime invariants to eliminate entire classes of concurrent race conditions.
            </span>
          </li>
          <li className="flex gap-4 items-start">
            <span className="text-[var(--primary)] mt-1.5">■</span> 
            <span>
              <strong className="text-[var(--primary)] font-bold uppercase tracking-wider block mb-1 font-bold">Zero-Abstraction Bloat</strong>
              Abstractions are helpful only when they do not hide execution overhead. We build slim, low-overhead microservices and lightweight message passing infrastructure that make debugging straightforward and scale predictably.
            </span>
          </li>
        </ul>

        <p className="mb-12 font-mono text-[var(--primary)]/90 font-bold leading-[1.7] text-[15px] md:text-[17px]">
          A system's elegance should not come from a slide deck or marketing materials. It resides directly inside the latency chart and the source repository.
        </p>

        <p className="text-[18px] text-[var(--primary)] uppercase font-bold tracking-wider max-w-[800px] leading-[1.6] border-l-2 border-[var(--primary)] pl-[24px] mt-[48px] font-display">
          THE STANDARD: SYSTEMS ENGINEERED TO RUN UNDER HOSTILE NETWORK CONCURRENCY AND REMAIN STEADFASTLY RELIABLE.
        </p>
      </div>
    </motion.section>
  );
};

const playSpatialSound = (e: React.MouseEvent, baseFreq: number) => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = ctx.createStereoPanner();

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pan = (x / rect.width) * 2 - 1;
    
    panner.pan.value = pan;
    osc.type = "sine";
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    osc.connect(panner);
    panner.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.7);
  } catch (err) {
    // Ignore audio errors on un-interacted panels
  }
};

const ProjectOverview = () => {
  return (
    <motion.section id="scope"  className="bg-[var(--bg)] text-[var(--primary)] py-[80px] md:py-[120px] w-full" 
      initial={{ opacity: 0, filter: "blur(8px)", y: 30 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <h2 className="font-display font-medium text-[36px] md:text-[52px] leading-[1.05] tracking-tight mb-12 uppercase border-b-2 border-[var(--primary)] pb-4">
          Operational Scope
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-[80px]">
          {/* What we have done */}
          <div className="border border-[var(--primary)] p-8 flex flex-col justify-between group hover:bg-[var(--bg)] hover:text-[var(--primary)] transition-colors duration-300">
            <div>
              <div className="font-mono text-[12px] uppercase tracking-widest mb-6 border-b border-current pb-2 font-bold opacity-70 group-hover:opacity-100">01 / Proven Implementations</div>
              <h3 className="font-display text-[24px] mb-4 font-bold">What we have done.</h3>
              <p className="font-body text-[14px] leading-relaxed opacity-90">
                Engineered distributed microservices processing terabytes of highly sensitive data. Built adversarial-resilient security architectures for enterprise networks scaling dynamically on demand.
              </p>
            </div>
            <div className="font-mono mt-8 font-bold text-[14px]">
              {"// DEPLOYED & TESTED"}
              <div className="text-[11px] font-normal tracking-wide text-[rgba(255,255,255,0.3)] mt-2">UAE Government · 50,000+ users</div>
            </div>
          </div>

          {/* What we can do */}
          <div className="border border-[var(--primary)] p-8 flex flex-col justify-between group hover:bg-[var(--bg)] hover:text-[var(--primary)] transition-colors duration-300">
            <div>
              <div className="font-mono text-[12px] uppercase tracking-widest mb-6 border-b border-current pb-2 font-bold opacity-70 group-hover:opacity-100">02 / Technical Capability</div>
              <h3 className="font-display text-[24px] mb-4 font-bold">What we can do.</h3>
              <p className="font-body text-[14px] leading-relaxed opacity-90">
                Transform bottlenecks into sub-millisecond execution vectors. Modernize legacy monolithic systems into responsive, state-driven interfaces engineered for aggressive scaling.
              </p>
            </div>
            <div className="font-mono mt-8 font-bold text-[14px]">
              {"// AVAILABLE CAPACITY"}
              <div className="text-[11px] font-normal tracking-wide text-[rgba(255,255,255,0.3)] mt-2">90% load time reduction delivered</div>
            </div>
          </div>

          {/* What has to be done */}
          <div className="border border-[var(--primary)] p-8 flex flex-col justify-between group hover:bg-[var(--bg)] hover:text-[var(--primary)] transition-colors duration-300">
            <div>
              <div className="font-mono text-[12px] uppercase tracking-widest mb-6 border-b border-current pb-2 font-bold opacity-70 group-hover:opacity-100">03 / Strategic Mandate</div>
              <h3 className="font-display text-[24px] mb-4 font-bold">What has to be done.</h3>
              <p className="font-body text-[14px] leading-relaxed opacity-90">
                Eliminate technical bloat. Enforce architectural integrity from the network core to the client face. Achieve uncompromising performance paradigms where the interface perfectly reflects the backend.
              </p>
            </div>
            <div className="font-mono mt-8 font-bold text-[14px]">
              {"// REQUIRED ACTION"}
              <div className="text-[11px] font-normal tracking-wide text-[rgba(255,255,255,0.3)] mt-2">10 years enterprise delivery</div>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-b border-[var(--border)] py-[40px] md:py-[60px] flex flex-wrap justify-between items-center gap-6 font-display text-[14px] md:text-[20px] text-[var(--secondary)] uppercase tracking-wider">
        <span>SYSTEM DESIGN</span>
        <span className="hidden md:block text-[var(--primary)]">||</span>
        <span>INFRASTRUCTURE</span>
        <span className="hidden md:block text-[var(--primary)]">||</span>
        <span>AESTHETIC MATH</span>
        <span className="hidden md:block text-[var(--primary)]">||</span>
        <span>DISTRIBUTED NETWORKS</span>
      </div>
      </div>
    </motion.section>
  );
};

const ExpertiseChart = ({ categoryIndex }: { categoryIndex: number }) => {
  const ringsCount = categoryIndex + 3;
  const rings = Array.from({ length: ringsCount }, (_, i) => i);
  const spacing = 28 / ringsCount;

  return (
    <div className="mb-6 flex justify-start relative w-[64px] h-[64px]">
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 15 + categoryIndex * 5, repeat: Infinity, ease: "linear" }}
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] relative z-10"
      >
        {rings.map((i) => {
          const r = 30 - i * spacing;
          const arcLength = r * 2 * Math.PI * 0.75;
          const gapLength = r * 2 * Math.PI * 0.25;
          return (
            <circle
              key={i}
              cx="32"
              cy="32"
              r={r}
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1.5"
              strokeDasharray={`${arcLength} ${gapLength}`}
              strokeDashoffset={i * 10}
              strokeLinecap="round"
            />
          );
        })}
      </motion.svg>
    </div>
  );
};

const Technologies = () => {
  const categories = [
    {
      title: "Frontend & Interfaces",
      techs: ["React / React Native", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "WebGL & Three.js"]
    },
    {
      title: "Backend & Systems",
      techs: ["Node.js / Express", "Rust", "Go (Golang)", "PostgreSQL", "Redis / Memcached", "GraphQL"]
    },
    {
      title: "Infrastructure & DevOps",
      techs: ["AWS / GCP", "Docker & Kubernetes", "Terraform", "CI/CD Pipelines", "Vercel / Cloudflare", "Linux / Unix Server"]
    },
    {
      title: "Data & Storage",
      techs: ["PostgreSQL / Redis", "Apache Kafka", "Elasticsearch", "Cassandra", "gRPC / Protobufs", "ClickHouse"]
    }
  ];

  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (index + 1) % categories.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (index - 1 + categories.length) % categories.length;
    }
    if (nextIndex !== index) {
      e.preventDefault();
      itemRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <motion.section id="pipeline"  ref={sectionRef} className="relative bg-[var(--bg)] text-[var(--primary)] py-[120px] w-full border-t border-[var(--border)]" 
        initial={{ opacity: 0, filter: "blur(8px)", y: 30 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 2px, transparent 2px)',
             backgroundSize: '24px 24px'
           }} 
      />
      
      {/* Animated subtle lines */}
      <motion.div 
        className="absolute top-0 bottom-0 left-[25%] w-[1px] bg-[var(--bg)]/10 origin-top hidden lg:block"
        style={{ scaleY: scrollYProgress }}
      />
      <motion.div 
        className="absolute top-0 bottom-0 left-[50%] w-[1px] bg-[var(--bg)]/10 origin-top hidden md:block"
        style={{ scaleY: scrollYProgress }}
      />
      <motion.div 
        className="absolute top-0 bottom-0 left-[75%] w-[1px] bg-[var(--bg)]/10 origin-top hidden lg:block"
        style={{ scaleY: scrollYProgress }}
      />
      
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
      <div className="mb-[80px]">
        <h2 className="font-display font-medium text-[36px] md:text-[52px] leading-[1.05] tracking-tight text-[var(--primary)] text-center md:text-left">
          <TextReveal>Core Technologies.</TextReveal>
        </h2>
        <p className="font-body text-[16px] text-[var(--primary)]/80 mt-4 max-w-[500px] text-center mx-auto md:mx-0 md:text-left font-bold">
          The foundational tools we utilize to architect scalable, high-performance systems and dynamic user interfaces.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {categories.map((cat, i) => (
          <motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <div 
              ref={(el) => { itemRefs.current[i] = el; }}
              tabIndex={0}
              onFocus={() => setFocusedIndex(i)}
              onBlur={() => setFocusedIndex(null)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={`p-4 -m-4 rounded-[4px] outline-none transition-all duration-300 md:cursor-none
                ${focusedIndex === i ? 'ring-2 ring-[var(--primary)] bg-[var(--bg)]/5' : 'hover:bg-[var(--bg)]/5'}`}
            >
              <div className="font-mono text-[10px] text-[var(--primary)] mb-6 uppercase tracking-widest font-bold border-b-2 border-[var(--border)] pb-4 flex justify-between items-center">
                <span>0{i + 1} / {cat.title}</span> <ExpertiseChart categoryIndex={i} />
              </div>
              <ul className="flex flex-col gap-4">
                {cat.techs.map((tech, j) => (
                  <li key={j} className="flex items-center gap-3 font-body text-[14px] text-[var(--primary)] font-bold group cursor-default">
                    <span className="w-[4px] h-[4px] bg-[var(--bg)] rounded-full" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </motion.section>
  )
};

const Methodology = () => {
  const steps = [
    {
      num: "01",
      title: "Discovery",
      desc: "Deep dive into technical requirements, business logic, and architectural constraints to define the scope.",
    },
    {
      num: "02",
      title: "Architecture",
      desc: "Designing scalable systems with a focus on performance, security, and developer ergonomics.",
    },
    {
      num: "03",
      title: "Sprinting",
      desc: "Rapid, high-fidelity engineering iterations with continuous integration and real-time feedback loops.",
    },
    {
      num: "04",
      title: "QA & Audit",
      desc: "Rigorous testing suites and security audits ensuring the codebase meets our 'Obsidian' standard.",
    },
    {
      num: "05",
      title: "Deployment",
      desc: "Optimized orchestration and handover, ensuring your team has the tools to scale the solution.",
    },
  ];

  return (
    <motion.section id="capabilities"  className="bg-[var(--bg)] text-[var(--primary)] py-[120px] px-6 max-w-[1200px] mx-auto w-full border-b border-[var(--primary)]" 
      initial={{ opacity: 0, filter: "blur(8px)", y: 30 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      <div className="mb-[100px]">
        <div className="font-body text-[11px] text-[var(--body)] uppercase tracking-[0.1em] mb-3">
          OUR METHODOLOGY
        </div>
        <h2 className="font-display font-medium text-[40px] md:text-[52px] leading-[1.1] tracking-[-0.02em] text-[var(--primary)] max-w-[600px]">
          <TextReveal>A systematic approach to engineering excellence.</TextReveal>
        </h2>
      </div>

      <div className="relative">
        <div className="hidden md:block absolute top-[26px] left-0 w-full border-t border-dashed border-[rgba(255,255,255,0.08)] z-0"></div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 lg:gap-8">
          {steps.map((s, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              key={i}
              className="relative z-10 flex flex-col group cursor-pointer"
            >
              <div className="w-[52px] h-[52px] min-w-[52px] min-h-[52px] shrink-0 bg-[var(--bg)] border border-[rgba(255,255,255,0.12)] flex items-center justify-center font-display text-[14px] text-[var(--primary)] mb-6 relative overflow-hidden transition-all duration-500 group-hover:scale-95 group-hover:border-[var(--primary)]">
                <span className="relative z-10 flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-[150%]">
                  {s.num}
                </span>
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg)] text-[var(--bg)] font-bold text-[18px] transition-transform duration-500 translate-y-[150%] group-hover:translate-y-0">
                  {s.num}
                </div>
              </div>
              <h3 className="font-display text-[18px] md:text-[20px] font-medium text-[var(--primary)] mb-3 transition-colors duration-300 group-hover:text-[var(--primary)] relative z-10">
                {s.title}
              </h3>
              <div className="relative overflow-hidden pr-4">
                <p className="font-body text-[14px] text-[var(--body)] leading-[1.6]">
                  {s.desc}
                </p>
                <div className="absolute top-0 left-0 w-full h-full bg-[var(--bg)] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ease-[0.76,0,0.24,1] mix-blend-difference pointer-events-none z-20"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const TextReveal = ({ children, delay = 0 }: { children: string, delay?: number }) => {
  const words = children.split(" ");
  return (
    <span className="flex flex-wrap gap-[0.25em]">
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <motion.span
            className="block"
            initial={{ y: "100%", rotateZ: 5 }}
            whileInView={{ y: 0, rotateZ: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: delay + (i * 0.02) }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

const Capabilities = () => {
  const features = [
    {
      id: "0.1",
      title: "Web Applications",
      desc: "Responsive, state-driven interfaces engineered for maximum performance and intuitive user flows.",
      graphic: <WireframeLinearStack className="w-full h-full max-w-[200px]" />,
    },
    {
      id: "0.2",
      title: "Mobile Apps",
      desc: "Native and cross-platform mobile solutions with fluid animations and offline-first capabilities.",
      graphic: <WireframePhone />,
    },
    {
      id: "0.3",
      title: "Backend & APIs",
      desc: "Distributed microservices and robust REST/GraphQL architectures designed for high-concurrency loads.",
      graphic: <WireframeLinearCubes className="w-full h-full max-w-[200px]" />,
    },
    {
      id: "0.4",
      title: "Enterprise Systems",
      desc: "Complex internal tooling and legacy migrations focused on operational efficiency and security.",
      graphic: (
        <WireframeServer className="w-full h-full flex justify-center items-center max-w-[200px] mx-auto min-h-[150px]" />
      ),
    },
    {
      id: "0.5",
      title: "Dashboards & Analytics",
      desc: "Real-time data visualization platforms with complex filtering and predictive analytics engines.",
      graphic: <Wireframe3DChart className="w-full h-full flex justify-center items-center max-w-[200px] mx-auto min-h-[150px]" />,
    },
    {
      id: "0.6",
      title: "IoT & Automation",
      desc: "Edge computing and industrial automation software bridging physical hardware with cloud infrastructure.",
      graphic: <Wireframe3DNodes className="w-full h-full flex justify-center items-center max-w-[200px] mx-auto min-h-[150px]" />,
    },
  ];

  return (
    <motion.section id="contact"  className="bg-[var(--bg)] text-[var(--primary)] py-[120px] max-w-[1200px] mx-auto w-full px-6 border-t border-[var(--primary)]" 
      initial={{ opacity: 0, filter: "blur(8px)", y: 30 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      <div className="mb-[100px] md:mb-[140px] mt-10">
        <h2 className="font-display font-medium text-[36px] md:text-[52px] leading-[1.05] tracking-tight max-w-[940px]">
          <span className="text-[var(--primary)]"><TextReveal>Full-stack capability.</TextReveal></span>{" "}
          <span className="text-[var(--body)]">
            <TextReveal delay={0.2}>
            We architect, engineer, and deploy high-performance digital
            ecosystems using a refined technical stack optimized for scale and
            speed.
            </TextReveal>
          </span>
        </h2>
      </div>

      <div className="border border-[var(--border)] bg-[var(--bg)] rounded-[16px] overflow-hidden mb-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[rgba(255,255,255,0.08)]">
          {features.map((f, i) => (
            <div
              key={i}
              className={`pt-[40px] px-[40px] md:px-[50px] pb-[50px] flex flex-col items-start min-h-[440px] group transition-colors hover:bg-[var(--hover-bg)] ${i > 2 ? "border-t border-[var(--border)]" : ""}`}
            >
              <div className="font-mono text-[10px] text-[var(--secondary)] mb-[40px] uppercase tracking-widest font-semibold flex w-full justify-start">
                
              </div>

              <div className="w-full flex-grow flex items-center justify-center mb-[60px]">
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{
                    duration: 6,
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-full flex justify-center drop-shadow-2xl"
                >
                  {f.graphic}
                </motion.div>
              </div>

              <div className="mt-auto max-w-[280px]">
                <h3 className="font-display text-[15px] font-semibold text-[var(--primary)] mb-2">
                  {f.title}
                </h3>
                <p className="font-body text-[14px] font-normal leading-[1.65] text-[var(--body)]">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[rgba(255,255,255,0.06)] pt-[80px] pb-[40px] flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="md:w-[200px]">
          <div className="font-body text-[11px] text-[var(--primary)] font-semibold uppercase tracking-[0.1em]">
            CORE METRICS
          </div>
        </div>
        <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-8">
          <div>
            <div className="font-display text-[32px] md:text-[40px] text-[var(--primary)] mb-1">
              99.9%
            </div>
            <div className="font-body text-[13px] text-[var(--body)]">
              System Uptime
            </div>
          </div>
          <div>
            <div className="font-display text-[32px] md:text-[40px] text-[var(--primary)] mb-1">
              &lt;100ms
            </div>
            <div className="font-body text-[13px] text-[var(--body)]">
              Average Latency
            </div>
          </div>
          <div>
            <div className="font-display text-[32px] md:text-[40px] text-[var(--primary)] mb-1">
              24/7
            </div>
            <div className="font-body text-[13px] text-[var(--body)]">
              Infrastructure Monitoring
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const CTA = ({ onBookCall }: { onBookCall?: () => void }) => (
  <motion.section id="section-6"  className="relative bg-[var(--bg)] text-[var(--primary)] py-[120px] w-full border-t border-[var(--border)]" 
      initial={{ opacity: 0, filter: "blur(8px)", y: 30 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
    <div className="absolute inset-0 opacity-10 pointer-events-none" 
         style={{ 
           backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 2px, transparent 2px)',
           backgroundSize: '24px 24px'
         }} 
    />
    <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-[1200px] mx-auto w-full pt-[40px]">
      <h2 className="font-display font-medium text-[56px] md:text-[80px] leading-[1.05] tracking-[-0.03em] text-[var(--primary)] mb-12 max-w-[800px] font-bold">
        <TextReveal>Contact Us.</TextReveal>
      </h2>
      <div className="w-full max-w-[600px] mb-[120px]">
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4 w-full">
          <button onClick={onBookCall} className="w-full bg-[var(--bg)] text-[var(--primary)] border-2 border-[var(--primary)] font-display text-[14px] font-bold tracking-[0.1em] uppercase px-[36px] py-[18px] rounded-none transition-all hover:bg-[var(--primary)] hover:text-[var(--bg)] active:scale-[0.98]">
            Initiate Project
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between border-t-2 border-[var(--border)] pt-[80px] gap-12 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start flex-1">
          <div className="font-body text-[11px] text-[var(--primary)] font-bold uppercase tracking-[0.1em] mb-2">
            Direct Communication
          </div>
          <div className="font-display font-medium text-[20px] md:text-[24px] text-[var(--primary)]">
            hello@archangel.org
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start flex-1 md:pl-12">
          <div className="font-body text-[11px] text-[var(--primary)] font-bold uppercase tracking-[0.1em] mb-2">
            Operating Hours
          </div>
          <div className="font-display font-medium text-[20px] md:text-[24px] text-[var(--primary)]">
            UTC-0 / Always On
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start flex-1 md:pl-12">
          <div className="font-body text-[11px] text-[var(--primary)] font-bold uppercase tracking-[0.1em] mb-2">
            Market Reach
          </div>
          <div className="font-display font-medium text-[20px] md:text-[24px] text-[var(--primary)]">
            Worldwide Operations
          </div>
        </div>
      </div>
    </div>
  </motion.section>
);

const Footer = () => (
  <footer className="bg-[var(--bg)] py-[80px] md:py-[100px] border-t-2 border-[var(--primary)] mt-auto">
    <div className="max-w-[1200px] mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-4 flex flex-col">
        <div className="font-display font-bold text-[24px] text-[var(--primary)] uppercase tracking-[0.05em] mb-6">
          ARCHANGEL.
        </div>
        <div className="font-body text-[14px] text-[var(--body)] leading-[1.6] max-w-[280px]">
          Engineering high-performance digital ecosystems for technical founders
          and enterprise teams.
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="font-body text-[12px] text-[var(--primary)] font-semibold tracking-[0.05em] uppercase mb-6">
          Social
        </div>
        <div className="flex flex-col gap-4">
          <a
            href="#"
            className="font-body text-[13px] text-[var(--body)] hover:text-[var(--primary)] transition-colors"
          >
            Twitter
          </a>
          <a
            href="#"
            className="font-body text-[13px] text-[var(--body)] hover:text-[var(--primary)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="#"
            className="font-body text-[13px] text-[var(--body)] hover:text-[var(--primary)] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="font-body text-[12px] text-[var(--primary)] font-semibold tracking-[0.05em] uppercase mb-6">
          Resources
        </div>
        <div className="flex flex-col gap-4">
          <a
            href="#"
            className="font-body text-[13px] text-[var(--body)] hover:text-[var(--primary)] transition-colors"
          >
            Documentation
          </a>
          <a
            href="#"
            className="font-body text-[13px] text-[var(--body)] hover:text-[var(--primary)] transition-colors"
          >
            Case Studies
          </a>
          <a
            href="#"
            className="font-body text-[13px] text-[var(--body)] hover:text-[var(--primary)] transition-colors"
          >
            Open Source
          </a>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="font-body text-[12px] text-[var(--primary)] font-semibold tracking-[0.05em] uppercase mb-6">
          Legal
        </div>
        <div className="flex flex-col gap-4">
          <a
            href="#"
            className="font-body text-[13px] text-[var(--body)] hover:text-[var(--primary)] transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="font-body text-[13px] text-[var(--body)] hover:text-[var(--primary)] transition-colors"
          >
            Terms
          </a>
        </div>
      </div>

      <div className="lg:col-span-3 flex flex-col justify-end items-start md:items-end h-full mt-8 lg:mt-0">
        <div className="font-body text-[13px] text-[var(--body)] text-left md:text-right mb-8 md:mb-0">
          © 2026. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
);

const BookACallModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setEmail("");
          onClose();
        }, 3000);
      } else {
        console.error("Failed to send");
      }
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)]/80 backdrop-blur-md px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[var(--bg)] border-4 border-[var(--primary)] p-0 max-w-[440px] w-full relative shadow-[16px_16px_0_0_var(--primary)]"
      >
        <div className="bg-[var(--bg)] text-[var(--primary)] p-3 flex justify-between items-center font-display uppercase font-bold text-[14px]">
          <span>Initialize Communication</span>
          <button
            onClick={onClose}
            className="text-[var(--primary)] hover:text-white transition-colors cursor-pointer font-mono"
          >
            [X]
          </button>
        </div>
        
        <div className="p-8">
          <p className="font-body text-[14px] text-[var(--body)] mb-6 uppercase tracking-wider">
            Enter your email to request an exploration session regarding solutions engineering.
          </p>

          {success ? (
            <div className="bg-[var(--bg)] border-2 border-[var(--primary)] text-[var(--primary)] p-4 font-mono text-[13px] flex items-center gap-3">
              <div className="w-2 h-2 bg-[var(--bg)] animate-pulse rounded-full" />
              Success. Signal Transmitted.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input
                type="email"
                placeholder="hello@archangel.org"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[var(--border)] rounded-none px-0 py-3 text-[16px] text-white focus:outline-none focus:border-[var(--primary)] transition-colors font-mono placeholder-[var(--secondary)]"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--bg)] text-[var(--primary)] font-display text-[16px] font-bold uppercase tracking-widest py-4 hover:bg-[var(--primary)] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Transmitting..." : "Send Request"}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const SECTION_IDS = [
  "hero",
  "overview",
  "contact",
  "manifesto",
  "scope",
  "pipeline",
  "capabilities",
  "section-6"
];

const SECTION_NAMES = [
  "Hero",
  "Overview",
  "Capabilities",
  "Protocols",
  "Scope",
  "Technologies",
  "Methodology",
  "Contact"
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const isScrollingRef = React.useRef(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    (window as any).lenis = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      (window as any).lenis = null;
    };
  }, []);

  useEffect(() => {
    const getSectionOffsets = () => {
      const offsets = SECTION_IDS.map(id => {
        const el = document.getElementById(id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return Math.round(rect.top + window.scrollY - 80);
      }).filter((val): val is number => val !== null);
      return offsets;
    };

    const handleScroll = () => {
      if (isScrollingRef.current) return;
      
      const offsets = getSectionOffsets();
      const currentScroll = window.scrollY + 160; // 160px screen spy buffer for early highlights
      
      let activeIdx = 0;
      for (let i = 0; i < offsets.length; i++) {
        if (currentScroll >= offsets[i]) {
          activeIdx = i;
        }
      }
      setActiveSection(activeIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen text-[var(--primary)] flex flex-col overflow-x-hidden selection:bg-[var(--bg)] selection:text-[var(--bg)] relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--primary)] origin-left z-[9999]"
        style={{ scaleX }}
      />
      
      {/* Scroll Snap Side Navigation Bullet system */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-5 select-none font-sans">
        {SECTION_IDS.map((id, index) => (
          <button
            key={id}
            onClick={() => {
              const el = document.getElementById(id);
              if (el) {
                const targetY = el.getBoundingClientRect().top + window.scrollY - 80;
                isScrollingRef.current = true;
                setActiveSection(index);
                if ((window as any).lenis) {
                  (window as any).lenis.scrollTo(targetY, { duration: 1.2 });
                } else {
                  window.scrollTo({ top: targetY, behavior: "smooth" });
                }
                setTimeout(() => {
                  isScrollingRef.current = false;
                }, 1200);
              }
            }}
            className="flex items-center justify-end gap-3 group text-right cursor-pointer bg-transparent border-none p-0 outline-none"
          >
            <span 
              className={`w-[10px] h-[10px] border-2 transition-all duration-300 pointer-events-none shrink-0 ${activeSection === index ? "bg-white border-white scale-125" : "bg-transparent border-gray-700 group-hover:border-white"}`}
              style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} // custom tactical diamond shape
            />
          </button>
        ))}
      </div>

      <Navbar onBookCall={() => setIsModalOpen(true)} />
      <AnimatePresence>
        {isModalOpen && (
          <BookACallModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
      <main className="flex-grow">
        <Hero onBookCall={() => setIsModalOpen(true)} />
        <OverviewSection />
        <Capabilities />
        <EngineeringManifesto />
        <ProjectOverview />
        <Technologies />
        <Methodology />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
