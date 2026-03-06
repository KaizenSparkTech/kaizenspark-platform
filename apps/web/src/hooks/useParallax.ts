import { useEffect, useRef, useCallback } from "react";

export interface ParallaxLayer {
    ref: React.RefObject<HTMLElement | HTMLDivElement | null>;
    speed: number; // -1 to 1, negative = opposite direction
    direction?: "y" | "x" | "both";
    scale?: boolean;
    rotate?: boolean;
    opacity?: boolean;
    clamp?: boolean;
}

/**
 * useParallax — high-perf rAF-based parallax for multiple DOM layers.
 * Each layer has a `speed` multiplier applied to window.scrollY relative
 * to the section's entry point.
 */
export function useParallax(sectionRef: React.RefObject<HTMLElement | null>, layers: ParallaxLayer[]) {
    const frameRef = useRef<number | null>(null);

    const onScroll = useCallback(() => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(() => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const progress = window.scrollY - sectionTop + window.innerHeight;
            const sectionHeight = sectionRef.current.offsetHeight + window.innerHeight;
            const normalized = Math.max(0, Math.min(1, progress / sectionHeight));

            layers.forEach(({ ref, speed, direction = "y", scale, rotate, opacity, clamp }) => {
                if (!ref.current) return;
                const offset = (normalized - 0.5) * speed * 200;
                const clamped = clamp ? Math.max(-80, Math.min(80, offset)) : offset;

                let transform = "";
                if (direction === "y") transform = `translateY(${clamped}px)`;
                else if (direction === "x") transform = `translateX(${clamped}px)`;
                else transform = `translate(${clamped * 0.5}px, ${clamped}px)`;

                if (scale) {
                    const s = 1 + Math.abs(normalized - 0.5) * speed * 0.15;
                    transform += ` scale(${s})`;
                }
                if (rotate) {
                    const r = (normalized - 0.5) * speed * 15;
                    transform += ` rotate(${r}deg)`;
                }

                ref.current.style.transform = transform;
                ref.current.style.willChange = "transform";

                if (opacity) {
                    const o = 0.3 + normalized * 0.7;
                    ref.current.style.opacity = String(Math.max(0, Math.min(1, o)));
                }
            });
        });
    }, [sectionRef, layers]);

    useEffect(() => {
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [onScroll]);
}

/**
 * useScrollReveal — observes elements and toggles a 'visible' class
 */
export function useScrollReveal(rootMargin = "-60px") {
    useEffect(() => {
        const els = document.querySelectorAll<HTMLElement>(".scroll-reveal");
        if (!els.length) return;

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        (entry.target as HTMLElement).classList.add("visible");
                    }
                });
            },
            { rootMargin, threshold: 0.1 }
        );

        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [rootMargin]);
}
