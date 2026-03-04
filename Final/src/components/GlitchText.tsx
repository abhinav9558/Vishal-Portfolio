"use client";

import React, { useEffect, useRef, useState, ElementType } from "react";

interface GlitchTextProps {
    text: string;
    className?: string;
    element?: ElementType;
}

export default function GlitchText({ text, className = "", element = "span" }: GlitchTextProps) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const triggerGlitch = () => {
        let iteration = 0;
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText((current) => {
                const nextText = text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");
                return nextText;
            });

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 3;
        }, 30);
    };

    useEffect(() => {
        // Trigger once on mount
        triggerGlitch();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text]);

    const Comp = element as any;

    return (
        <Comp
            className={`${className} text-glitch cursor-default font-heading`}
            onMouseEnter={triggerGlitch}
            data-text={text}
        >
            {displayText}
        </Comp>
    );
}
