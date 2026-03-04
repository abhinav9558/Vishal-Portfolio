// Ensure GSAP plugins are registered
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", (event) => {

    // --- 1. Loading Screen Animation ---
    const loadingScreen = document.getElementById('loading-screen');
    const loadingLogo = document.querySelector('.loading-logo');

    // Grow logo slightly then fade out screen
    gsap.to(loadingLogo, {
        scale: 1.1,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
            gsap.to(loadingScreen, {
                y: "-100%", // Slide up
                opacity: 0,
                duration: 1,
                ease: "power3.inOut",
                onComplete: () => {
                    loadingScreen.style.display = 'none';
                    initScrollAnimations();
                }
            });
        }
    });

    // --- 2. Glitch Text Effect ---
    // A simple character scrambling effect applied to elements with .text-glitch
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const glitchElements = document.querySelectorAll('.text-glitch');

    glitchElements.forEach(el => {
        el.addEventListener("mouseenter", event => {
            let iteration = 0;
            clearInterval(el.interval);

            el.interval = setInterval(() => {
                event.target.innerText = event.target.innerText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return event.target.dataset.text[index];
                        }
                        return letters[Math.floor(Math.random() * 26)]
                    })
                    .join("");

                if (iteration >= event.target.dataset.text.length) {
                    clearInterval(el.interval);
                }

                iteration += 1 / 3;
            }, 30);
        });
    });

    function initScrollAnimations() {

        // --- 3. Right Timeline & Background Image Updates ---
        // Tie timeline markers and backgrounds to section scroll positions
        const sections = ['intro', 'work', 'projects', 'fun', 'writings'];
        const markers = ['time-5am', 'time-9am', 'time-1pm', 'time-6pm', 'time-10pm'];
        const navLinks = document.querySelectorAll('.nav-link');

        sections.forEach((secId, index) => {
            ScrollTrigger.create({
                trigger: `#${secId}`,
                start: "top center",
                end: "bottom center",
                onEnter: () => updateTimeAndNav(index),
                onEnterBack: () => updateTimeAndNav(index),
            });
        });

        function updateTimeAndNav(index) {
            // Update time markers
            document.querySelectorAll('.time-marker').forEach(m => m.classList.remove('time-marker-active'));
            if (document.getElementById(markers[index])) {
                document.getElementById(markers[index]).classList.add('time-marker-active');
            }

            // Update Left Nav
            navLinks.forEach(l => l.classList.remove('active'));
            if (navLinks[index]) {
                navLinks[index].classList.add('active');
            }

            // Update Background Layers (Simulating Time of Day)
            // Show bg-layer-1 for intro/work, layer-2 for projects, layer-3 for fun/writings
            let activeBg = 1;
            if (index === 2) activeBg = 2; // Projects
            if (index >= 3) activeBg = 3;  // Fun / Writings

            gsap.to('.bg-layer', { opacity: 0, duration: 1 });
            gsap.to(`#bg-layer-${activeBg}`, { opacity: 1, duration: 1 });
        }


        // --- 4. Section & Card Parallax Animations ---

        // Animate Marquee
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

        // Parallax Project Cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            const mockup = card.querySelector('.project-mockup');
            const note = card.querySelector('.sticky-note');
            const sticker = card.querySelector('.rotating-sticker');

            // Float mockup up
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

            // Parallax note faster than mockup
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

            // Rotate and Move Sticker
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

        // Animate Wireframe Drawing
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
    }
});
