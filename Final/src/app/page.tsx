"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AtmosphereBackground from "@/components/AtmosphereBackground";
import CinematicLoader from "@/components/CinematicLoader";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (loading) return;

    // Horizontal Scroll for Act II (Work)
    const act2Container = document.querySelector('#act2-horizontal-wrap');
    const act2Scroll = document.querySelector('#act2-horizontal-inner');

    if (act2Container && act2Scroll) {
      gsap.to(act2Scroll, {
        x: () => -(act2Scroll.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: act2Container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${act2Scroll.scrollWidth - window.innerWidth}`,
        }
      });
    }

    // Parallax layering for Act III (Projects)
    gsap.utils.toArray('.parallax-poster').forEach((el: any, i) => {
      gsap.to(el, {
        y: () => -100 * (i + 1), // Each layer moves faster
        ease: "none",
        scrollTrigger: {
          trigger: '#act3',
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Massive Text Reveal in Act I
    gsap.fromTo('.reveal-text',
      { y: '100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "#act1",
          start: "top 60%"
        }
      }
    );

  }, { scope: containerRef, dependencies: [loading] });

  return (
    <>
      {loading && <CinematicLoader onComplete={() => setLoading(false)} />}

      <div
        className={`text-white min-h-screen relative overflow-x-hidden ${loading ? 'h-screen overflow-hidden pointer-events-none' : ''}`}
        ref={containerRef}
      >
        <AtmosphereBackground />
        <div className="film-grain"></div>
        <div className="vignette"></div>

        {/* Floating Headers (Mix blend) */}
        <header className="fixed top-8 left-8 right-8 flex justify-between items-start z-[100] mix-blend-difference pointer-events-none">
          <div className="text-meta">VISHAL ANIVILLA<br />DIRECTOR'S CUT</div>
          <div className="text-meta text-right text-[#FF2A00]">REC<br /><span className="animate-pulse">●</span></div>
        </header>

        {/* 
          =======================================
          ACT I: DAWN / THE START 
          =======================================
        */}
        <section id="act1" className="section-cinematic justify-center px-8 md:px-12">
          <div className="absolute top-1/3 left-8 text-meta text-white/40 rotate-90 origin-left">01 // THE VISION</div>

          <div className="overflow-hidden mt-32">
            <h1 className="reveal-text text-huge font-serif uppercase leading-[0.8] mix-blend-difference">
              Visual <br />
              Story <br />
              <span className="italic text-[#FF2A00]">Telling.</span>
            </h1>
          </div>

          <div className="mt-32 max-w-xl text-lg md:text-xl font-serif text-white/70 italic border-l block border-[#FF2A00] pl-6 ml-auto mr-12 mix-blend-difference">
            <p className="reveal-text">I construct narratives combining creative storytelling with production logistics, from code to pre-production to post. This is a chronological sequence of my process.</p>
          </div>
        </section>

        {/* 
          =======================================
          ACT II: 9 AM / THE CRAFT (Horizontal)
          =======================================
        */}
        <section id="act2-horizontal-wrap" className="h-screen w-full relative bg-transparent overflow-hidden">
          <div id="act2-horizontal-inner" className="h-full flex items-center gap-[10vw] md:gap-[20vw] px-[5vw] md:px-[10vw] w-max">

            {/* Act Title */}
            <div className="w-[60vw] md:w-[30vw] flex-shrink-0 mix-blend-difference">
              <div className="text-meta text-[#FF2A00] mb-4">02 // THE CRAFT</div>
              <h2 className="text-[8vw] font-serif leading-none uppercase">Grip <br /><span className="italic opacity-50">&</span> Directing</h2>
            </div>

            {/* Poster Frames */}
            <div className="w-[70vw] md:w-[30vw] h-[50vh] md:h-[60vh] flex-shrink-0 border border-white/20 p-6 flex flex-col justify-between bg-black/50 backdrop-blur-md relative group hover:border-[#FF2A00] transition-colors">
              <div className="absolute top-4 right-4 text-xs font-mono text-white/30">2024</div>
              <div className="h-2/3 border border-white/10 w-full mb-6 bg-[url('https://images.unsplash.com/photo-1485246755490-25a81ca479ec?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale contrast-150 group-hover:grayscale-0 transition-all duration-700"></div>
              <div>
                <h3 className="font-serif text-3xl mb-2">Asst. Producer & Gaffer</h3>
                <p className="font-mono text-xs text-white/50">Forest City Films. Executed lighting plans, script breakdowns, and grant research.</p>
              </div>
            </div>

            <div className="w-[70vw] md:w-[30vw] h-[50vh] md:h-[60vh] flex-shrink-0 border border-white/20 p-6 flex flex-col justify-between bg-black/50 backdrop-blur-md relative group hover:border-[#FF2A00] transition-colors mt-16 md:mt-32">
              <div className="absolute top-4 right-4 text-xs font-mono text-white/30">2023-2024</div>
              <div className="h-2/3 border border-white/10 w-full mb-6 bg-[url('https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale contrast-150 group-hover:grayscale-0 transition-all duration-700"></div>
              <div>
                <h3 className="font-serif text-3xl mb-2">Content Prod. Lead</h3>
                <p className="font-mono text-xs text-white/50">Border 2 Border Entertainment. YouTube series development, pitch decks, and audience research.</p>
              </div>
            </div>

            <div className="w-[70vw] md:w-[30vw] h-[50vh] md:h-[60vh] flex-shrink-0 border border-white/20 p-6 flex flex-col justify-between bg-black/50 backdrop-blur-md relative group hover:border-[#FF2A00] transition-colors">
              <div className="absolute top-4 right-4 text-xs font-mono text-white/30">2024</div>
              <div className="h-2/3 border border-white/10 w-full mb-6 bg-[url('https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale contrast-150 group-hover:grayscale-0 transition-all duration-700"></div>
              <div>
                <h3 className="font-serif text-3xl mb-2">3rd Assistant Director</h3>
                <p className="font-mono text-xs text-white/50">"Settle Down" TV Series. Coordinated background actors and managed union compliance.</p>
              </div>
            </div>

            <div className="w-[10vw] md:w-[20vw] flex-shrink-0"></div> {/* Spacer */}
          </div>
        </section>

        {/* 
          =======================================
          ACT III: 1 PM / THE OUTPUT
          =======================================
        */}
        <section id="act3" className="section-cinematic py-32 px-8 overflow-hidden mix-blend-difference">
          <div className="text-meta text-[#FF2A00] mb-8 text-center">03 // THE OUTPUT</div>
          <h2 className="text-[10vw] font-serif text-center uppercase tracking-tighter mix-blend-overlay opacity-20">Archive</h2>

          <div className="relative h-[100vh] md:h-[150vh] w-full mt-12 flex justify-center">
            {/* Layer 1 (Back, slowest) */}
            <div className="parallax-poster absolute top-[10%] left-[5%] md:left-[10%] w-[50vw] md:w-[30vw] h-[60vw] md:h-[40vw] border border-white/20 bg-black p-4 z-10 hover:z-50 hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full border border-dashed border-white/10 flex items-center justify-center font-serif text-2xl text-center p-4">Equal Band <br /> <span className="text-sm font-mono opacity-50 mt-4 block">MUSIC VIDEO</span></div>
            </div>

            {/* Layer 2 (Middle) */}
            <div className="parallax-poster absolute top-[30%] right-[5%] md:right-[15%] w-[45vw] md:w-[25vw] h-[55vw] md:h-[35vw] border border-[#FF2A00]/50 bg-black p-4 z-20 hover:z-50 hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full border border-solid border-[#FF2A00]/20 flex items-center justify-center font-serif text-xl italic text-[#FF2A00] text-center p-4">Sound of Silence <br /> <span className="text-sm font-mono opacity-50 mt-4 block">INDEPENDENT SHORT</span></div>
            </div>

            {/* Layer 3 (Front, fastest) */}
            <div className="parallax-poster absolute top-[50%] left-[20%] md:left-[30%] w-[60vw] md:w-[40vw] h-[40vw] md:h-[25vw] border border-white bg-black p-2 z-30 hover:z-50 hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full bg-white text-black flex flex-col justify-center items-start pl-8">
                <div className="font-serif text-3xl md:text-5xl uppercase">Loyalist Promo</div>
                <div className="text-sm font-mono mt-2 opacity-50">DIRECTOR / 2023</div>
              </div>
            </div>
          </div>
        </section>

        {/* 
          =======================================
          ACT IV & V: NIGHTFALL (Combined flow)
          =======================================
        */}
        <section id="act4" className="section-cinematic justify-end pb-32 px-8 z-10 bg-black/80 backdrop-blur-lg">
          <div className="max-w-[800px] mx-auto text-center border-t border-[#FF2A00] pt-16">
            <div className="text-meta text-[#FF2A00] mb-8">04 // FADE TO BLACK</div>

            <h2 className="text-4xl md:text-6xl font-serif italic mb-12">"We tell stories to survive the night."</h2>

            <div className="flex flex-col gap-4 text-left font-mono text-xs md:text-sm max-w-[500px] mx-auto">
              <div className="flex flex-col md:flex-row md:justify-between border-b border-white/10 pb-2 hover:text-[#FF2A00] cursor-pointer">
                <span>EDUCATION / CENTENNIAL COLLEGE</span>
                <span className="text-white/40">FILM & TV BUSINESS</span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between border-b border-white/10 pb-2 hover:text-[#FF2A00] cursor-pointer">
                <span>EDUCATION / LOYALIST COLLEGE</span>
                <span className="text-white/40">ADV. FILMMAKING</span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between border-b border-white/10 pb-2 hover:text-[#FF2A00] cursor-pointer">
                <span>SKILLS / TECHNICAL</span>
                <span className="text-white/40 text-right">PREMIERE, DAVINCI, GRIP & ELECTRIC</span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between border-b border-white/10 pb-2 hover:text-[#FF2A00] cursor-pointer">
                <span>SKILLS / BUSINESS</span>
                <span className="text-white/40 text-right">FILM GRANTS, ENTERTAINMENT LAW</span>
              </div>
            </div>

            <div className="mt-32">
              <a href="mailto:anivilla.vishal@gmail.com" className="text-meta border border-white hover:bg-white hover:text-black px-12 py-4 transition-colors uppercase tracking-widest inline-block">
                INITIATE CONTACT
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
