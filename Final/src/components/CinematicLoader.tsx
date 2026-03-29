"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CinematicLoader({ onComplete }: { onComplete: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const subTextRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Fade out entire loader
                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 1.2,
                    ease: "power2.inOut",
                    onComplete: onComplete
                });
            }
        });

        // 1. Initial wait
        tl.to({}, { duration: 0.5 });

        // 2. Expand progress line
        tl.to(progressRef.current, {
            scaleX: 1,
            duration: 1.5,
            ease: "expo.inOut"
        });

        // 3. Reveal Name
        tl.to(textRef.current, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
        }, "-=0.5");

        // 4. Reveal Subtext
        tl.to(subTextRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8");

        // 5. Hold for a moment
        tl.to({}, { duration: 1.0 });

        // 6. Collapse progress line
        tl.to(progressRef.current, {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 1,
            ease: "expo.inOut"
        });

        // 7. Fade out text
        tl.to([textRef.current, subTextRef.current], {
            opacity: 0,
            y: -10,
            duration: 0.8,
            ease: "power2.in",
            stagger: 0.1
        }, "-=0.8");

    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[99999] bg-black text-white flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Film grain base */}
            <div className="film-grain !opacity-30 !mix-blend-screen"></div>

            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl px-8">

                {/* Main Name Container (hidden overflow for slide-up reveal) */}
                <div className="overflow-hidden pb-4">
                    <h1
                        ref={textRef}
                        className="text-4xl md:text-6xl lg:text-8xl font-serif uppercase tracking-widest text-center opacity-0 translate-y-[100%]"
                    >
                        Vishal Anivilla
                    </h1>
                </div>

                {/* Progress Line */}
                <div className="w-full h-[1px] bg-white/20 relative my-4">
                    <div
                        ref={progressRef}
                        className="absolute top-0 left-0 w-full h-full bg-[#FF2A00] origin-left scale-x-0"
                    ></div>
                </div>

                {/* Subtext Container */}
                <div className="overflow-hidden pt-4">
                    <div
                        ref={subTextRef}
                        className="text-xs md:text-sm font-mono text-white/50 tracking-[0.3em] uppercase opacity-0 translate-y-[-100%]"
                    >
                        Director • DOP • Gaffer
                    </div>
                </div>

            </div>
        </div>
    );
}
