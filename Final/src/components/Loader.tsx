"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LoaderProps {
    onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useGSAP(() => {
        if (!svgRef.current || !containerRef.current) return;

        // 1. Draw the SVG Stroke
        const path = svgRef.current.querySelector("path");
        if (path) {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

            const tl = gsap.timeline({
                onComplete: () => {
                    // 2. Fade out the entire loader screen
                    gsap.to(containerRef.current, {
                        y: "-100%", // Slide up like the vanilla version
                        opacity: 0,
                        duration: 1,
                        ease: "power3.inOut",
                        onComplete: onComplete
                    });
                }
            });

            tl.to(path, {
                strokeDashoffset: 0,
                duration: 2,
                ease: "power2.inOut",
            }).to(svgRef.current, {
                scale: 1.1,
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut"
            }, "+=0.2");
        }
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] text-white"
        >
            <svg
                ref={svgRef}
                viewBox="0 0 100 50"
                width="150"
                height="75"
                stroke="white"
                strokeWidth="2"
                fill="none"
                className="overflow-visible"
            >
                <path d="M10,30 Q20,10 30,30 T50,30 T70,30" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
}
