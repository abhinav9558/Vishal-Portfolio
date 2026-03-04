"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FaultyTerminal from "@/components/FaultyTerminal";
import GlitchText from "@/components/GlitchText";
import Loader from "@/components/Loader";

// Register plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const [activeLayer, setActiveLayer] = useState(1);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalBgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (loading) return;

    // 1. ScrollTrigger Logic for Timeline & Nav sync
    const sections = ['intro', 'work', 'projects', 'fun', 'writings'];
    const markers = ['time-5am', 'time-9am', 'time-1pm', 'time-6pm', 'time-10pm'];

    sections.forEach((secId, index) => {
      ScrollTrigger.create({
        trigger: `#${secId}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => updateTimeAndNav(index),
        onEnterBack: () => updateTimeAndNav(index),
      });
    });

    function updateTimeAndNav(index: number) {
      document.querySelectorAll('.time-marker').forEach(m => m.classList.remove('time-marker-active'));
      const activeMarker = document.getElementById(markers[index]);
      if (activeMarker) activeMarker.classList.add('time-marker-active');

      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      const activeNav = document.querySelectorAll('.nav-link')[index];
      if (activeNav) activeNav.classList.add('active');

      let newLayer = 1; // 1 = Prism Background completely visible
      if (index === 1 || index === 2) newLayer = 2; // Warm gradient fading over prism
      if (index >= 3) newLayer = 3; // Cool dark fade
      setActiveLayer(newLayer);
    }

    // 2. Marquee Animation
    gsap.to('.marquee-track', {
      xPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: "#work",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    // 3. Fade Out Hero Terminal on Scroll
    if (terminalBgRef.current) {
      gsap.to(terminalBgRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: "#work", // Start fading when Work section enters viewport 
          start: "top bottom",
          end: "top 20%",     // Completely invisible when workaround near top
          scrub: true
        }
      });
    }

    // 4. Parallax Cards
    gsap.utils.toArray('.project-card').forEach((card: any) => {
      const mockup = card.querySelector('.project-mockup');
      const note = card.querySelector('.sticky-note');
      const sticker = card.querySelector('.rotating-sticker');

      if (mockup) {
        gsap.fromTo(mockup,
          { y: 100, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      if (note) {
        gsap.fromTo(note,
          { y: 150 },
          {
            y: -50, ease: "none", scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      }

      if (sticker) {
        gsap.to(sticker, {
          rotation: 360,
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    });

    // 4. SVG Drawing Animation for FUN section
    const wireframeSvg = document.querySelector('.wireframe-art svg');
    if (wireframeSvg) {
      gsap.fromTo(wireframeSvg.querySelectorAll('*'),
        { strokeDasharray: 500, strokeDashoffset: 500 },
        {
          strokeDashoffset: 0, duration: 3, ease: "power1.inOut", scrollTrigger: {
            trigger: "#fun",
            start: "top 60%",
          }
        }
      );
    }
  }, { scope: containerRef, dependencies: [loading] });

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div
        className={`text-[#f0f0f0] min-h-screen relative font-sans overflow-x-hidden ${loading ? 'h-screen overflow-hidden pointer-events-none' : ''}`}
        ref={containerRef}
      >

        {/* 
        ==============================
        Global Background Setup
        ==============================
      */}
        {/* Transitional Background Layers that fade OVER the base to simulate time of day */}
        <div className={`bg-layer bg-layer-2 z-[-10] ${activeLayer === 2 ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`bg-layer bg-layer-3 z-[-10] ${activeLayer === 3 ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* Global CSS Noise Texture Overlay */}
        <div className="noise-overlay"></div>

        {/* 
        ==============================
        Fixed Navigation & Timeline 
        ==============================
      */}
        <nav className="fixed top-0 left-0 w-[120px] h-screen flex flex-col justify-between p-8 z-[100]">
          <div className="logo cursor-pointer">
            <svg viewBox="0 0 100 50" width="80" height="40" stroke="white" strokeWidth="2" fill="none">
              <path d="M10,30 Q20,10 30,30 T50,30 T70,30" />
            </svg>
          </div>
          <ul className="flex flex-col gap-6 list-none font-mono text-xs tracking-widest uppercase">
            <li><a href="#intro" className="nav-link group transition-all flex items-center opacity-50 [&.active]:opacity-100 hover:opacity-100"><span className="w-1.5 h-1.5 bg-white rounded-full mr-3 opacity-0 group-[.active]:opacity-100 group-hover:opacity-100 transition-all shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>INTRO</a></li>
            <li><a href="#work" className="nav-link group transition-all flex items-center opacity-50 [&.active]:opacity-100 hover:opacity-100"><span className="w-1.5 h-1.5 bg-white rounded-full mr-3 opacity-0 group-[.active]:opacity-100 group-hover:opacity-100 transition-all shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>WORK</a></li>
            <li><a href="#projects" className="nav-link group transition-all flex items-center opacity-50 [&.active]:opacity-100 hover:opacity-100"><span className="w-1.5 h-1.5 bg-white rounded-full mr-3 opacity-0 group-[.active]:opacity-100 group-hover:opacity-100 transition-all shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>PROJECTS</a></li>
            <li><a href="#fun" className="nav-link group transition-all flex items-center opacity-50 [&.active]:opacity-100 hover:opacity-100"><span className="w-1.5 h-1.5 bg-white rounded-full mr-3 opacity-0 group-[.active]:opacity-100 group-hover:opacity-100 transition-all shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>FUN</a></li>
            <li><a href="#writings" className="nav-link group transition-all flex items-center opacity-50 [&.active]:opacity-100 hover:opacity-100"><span className="w-1.5 h-1.5 bg-white rounded-full mr-3 opacity-0 group-[.active]:opacity-100 group-hover:opacity-100 transition-all shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>WRITINGS</a></li>
          </ul>
          <div className="flex flex-col gap-2 font-mono text-[0.7rem] opacity-50">
            <a href="#" className="hover:underline">TW</a>
            <a href="#" className="hover:underline">IN</a>
            <a href="#" className="hover:underline">GH</a>
            <p>&copy; 2026</p>
          </div>
        </nav>

        <aside className="right-timeline">
          <div className="timeline-line"></div>
          <div className="time-marker time-marker-active" id="time-5am">5:00 AM</div>
          <div className="time-marker" id="time-9am">9:00 AM</div>
          <div className="time-marker" id="time-1pm">1:00 PM</div>
          <div className="time-marker" id="time-6pm">6:00 PM</div>
          <div className="time-marker" id="time-10pm">10:00 PM</div>
        </aside>

        <div className="fixed top-8 right-8 z-[101]">
          <button className="bg-white/10 border border-white/20 text-white px-4 py-2 font-sans text-xs uppercase cursor-pointer rounded-full backdrop-blur-sm transition-colors hover:bg-white/20">
            HIRE ME
          </button>
        </div>

        {/* 
        ==============================
        Scrolling Content Sections 
        ==============================
      */}
        <main className="ml-[120px] mr-[80px] px-16 relative z-10">

          {/* Intro Section */}
          <section id="intro" className="section-block min-h-screen flex flex-col justify-center relative">

            {/* Section Specific Background: React Bits FaultyTerminal */}
            <div ref={terminalBgRef} className="fixed inset-0 w-[100vw] h-[100vh] z-[-20]">
              <FaultyTerminal
                scale={1}
                digitSize={1.5}
                scanlineIntensity={0.3}
                glitchAmount={1}
                flickerAmount={1}
                noiseAmp={0}
                chromaticAberration={0}
                dither={0}
                curvature={0.2}
                tint="#ffffff"
                mouseReact
                mouseStrength={0.2}
                brightness={1}
                style={{ width: '100%', height: '100%' }}
                className=""
              />
            </div>

            <div className="max-w-[800px] relative z-10 pointer-events-none">
              <GlitchText
                text="CHIMDI CHIMEREZE"
                element="h1"
                className="text-[6vw] leading-[0.9] mb-8 font-heading text-white tracking-widest pointer-events-auto w-max"
              />
              <div className="max-w-[500px] font-mono text-lg text-white/80 border-l border-white/20 pl-4">
                <p>I am a multidisciplinary designer and developer focused on crafting highly interactive and narrative-driven digital experiences.</p>
              </div>
            </div>
          </section>

          {/* Work Section */}
          <section id="work" className="section-block">
            <GlitchText text="WORK" element="h2" className="text-[8rem] opacity-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap z-0 font-heading" />

            <div className="marquee-container">
              <div className="marquee-track inline-block">
                <span className="font-heading text-[8rem] tracking-wider">WORK WORK WORK WORK WORK WORK WORK</span>
              </div>
            </div>

            <div className="project-card relative w-full h-[60vh] flex items-center justify-center mt-[10vh]">
              <div className="project-mockup w-[60%] h-full bg-[#141414cc] border border-white/10 rounded-lg flex items-center justify-center backdrop-blur-md relative z-10 overflow-hidden">
                <div className="font-mono text-white/30">Project Visualization</div>
              </div>
              <div className="sticky-note absolute right-[10%] bottom-[20%] w-[250px] p-6 bg-[#d1f2eb] text-black font-mono text-sm z-20 rotate-3 shadow-2xl">
                <h3 className="font-bold text-base mb-2">Company X</h3>
                <p>Lead Designer. Redesigned the core user journey resulting in 2x conversion.</p>
              </div>
              <div className="rotating-sticker absolute top-[10%] right-[25%] w-[100px] h-[100px] bg-[#FF4500] rounded-full flex items-center justify-center font-heading text-xl text-white z-0 tracking-widest">UX/UI</div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="section-block">
            <GlitchText text="PROJECTS" element="h2" className="text-[8rem] opacity-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap z-0 font-heading" />

            <div className="project-card alternate-layout relative w-full h-[60vh] flex flex-row-reverse items-center justify-center mt-[10vh]">
              <div className="project-mockup w-[60%] h-full bg-[#141414cc] border border-white/10 rounded-lg flex items-center justify-center backdrop-blur-md relative z-10 overflow-hidden">
                <div className="font-mono text-white/30">App Interface</div>
              </div>
              <div className="sticky-note absolute left-[10%] bottom-[20%] w-[250px] p-6 bg-[#e8daef] text-black font-mono text-sm z-20 -rotate-3 shadow-2xl">
                <h3 className="font-bold text-base mb-2">Side Hustle Y</h3>
                <p>A personal tool for managing creative workflows.</p>
              </div>
              <div className="rotating-sticker absolute top-[10%] left-[25%] w-[100px] h-[100px] bg-[#1E90FF] rounded-full flex items-center justify-center font-heading text-xl text-white z-0 tracking-widest">DEV</div>
            </div>
          </section>

          {/* Fun Section */}
          <section id="fun" className="section-block">
            <GlitchText text="FUN" element="h2" className="text-[8rem] opacity-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap font-heading" />

            <div className="wireframe-art flex justify-center mb-8 relative z-10">
              <svg viewBox="0 0 200 200" width="200" height="200" stroke="white" strokeWidth="1" fill="none">
                <circle cx="100" cy="100" r="80" strokeDasharray="5,5" />
                <rect x="50" y="50" width="100" height="100" />
              </svg>
            </div>

            <div className="ios-dock flex gap-4 bg-white/10 backdrop-blur-xl px-8 py-4 border border-white/10 rounded-2xl relative z-10 mx-auto w-max">
              <div className="w-[60px] h-[60px] bg-black/50 rounded-xl flex items-center justify-center text-2xl cursor-pointer hover:-translate-y-2 hover:scale-125 hover:mx-2 transition-all duration-300">♫</div>
              <div className="w-[60px] h-[60px] bg-black/50 rounded-xl flex items-center justify-center text-2xl cursor-pointer hover:-translate-y-2 hover:scale-125 hover:mx-2 transition-all duration-300">📷</div>
              <div className="w-[60px] h-[60px] bg-black/50 rounded-xl flex items-center justify-center text-2xl cursor-pointer hover:-translate-y-2 hover:scale-125 hover:mx-2 transition-all duration-300">🎮</div>
              <div className="w-[60px] h-[60px] bg-black/50 rounded-xl flex items-center justify-center text-2xl cursor-pointer hover:-translate-y-2 hover:scale-125 hover:mx-2 transition-all duration-300">📚</div>
            </div>

            <button className="relative z-10 block mx-auto mt-12 px-12 py-4 bg-transparent text-white border border-white font-mono uppercase cursor-pointer transition-colors hover:bg-white hover:text-black">
              Archive
            </button>
          </section>

          {/* Writings Section */}
          <section id="writings" className="section-block">
            <GlitchText text="WRITINGS" element="h2" className="text-[8rem] opacity-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap font-heading" />

            <div className="post-list flex flex-col gap-8 relative z-10 max-w-[600px] mx-auto w-full">
              <div className="post-item flex items-baseline gap-8 pb-4 border-b border-white/10 cursor-pointer group transition-all">
                <span className="font-mono text-sm text-white/50 w-16">OCT 24</span>
                <h3 className="font-sans text-2xl group-hover:translate-x-2 transition-transform">Designing with Noise and Texture</h3>
              </div>
              <div className="post-item flex items-baseline gap-8 pb-4 border-b border-white/10 cursor-pointer group transition-all">
                <span className="font-mono text-sm text-white/50 w-16">SEP 12</span>
                <h3 className="font-sans text-2xl group-hover:translate-x-2 transition-transform">The Value of Over-Engineering Portfolios</h3>
              </div>
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
