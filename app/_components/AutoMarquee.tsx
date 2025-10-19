"use client";

import React, { useEffect, useRef, useState } from "react";

type AutoMarqueeProps = {
  children: React.ReactNode;
  speed?: number; // pixels per second (positive number). Default 60
  direction?: "left" | "right"; // scroll direction
  pauseOnHover?: boolean;
  className?: string;
  gap?: number; // px gap between repeated items
};

export function AutoMarquee({
  children,
  speed = 60,
  direction = "left",
  pauseOnHover = true,
  className = "",
  gap = 40,
}: AutoMarqueeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const offsetRef = useRef<number>(0);
  const [contentWidth, setContentWidth] = useState<number>(0);
  const [isHovering, setIsHovering] = useState(false);

  // Respect prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    function measure() {
      if (!contentRef.current || !containerRef.current) return;
      const cw = contentRef.current.getBoundingClientRect().width;
      setContentWidth(cw);
      // If content is smaller than container, we still duplicate so it moves smoothly
    }

    measure();
    const ro = new ResizeObserver(measure);
    if (contentRef.current) ro.observe(contentRef.current);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => ro.disconnect();
  }, [children, gap]);

  useEffect(() => {
    if (prefersReducedMotion) return; // do not animate

    // if width not measured yet, don't start
    if (!contentWidth || !containerRef.current) return;

    offsetRef.current = 0;
    lastTimeRef.current = null;

    function step(timestamp: number) {
      if (lastTimeRef.current == null) lastTimeRef.current = timestamp;
      const dt = timestamp - lastTimeRef.current; // ms
      lastTimeRef.current = timestamp;

      if (pauseOnHover && isHovering) {
        animationRef.current = requestAnimationFrame(step);
        return;
      }

      // movement in px for this frame
      const movement = (speed * dt) / 1000; // px

      // apply direction
      offsetRef.current += direction === "left" ? -movement : movement;

      // loop offset so that the transform always stays between -contentWidth and 0
      // (we duplicate content once, so translating by -contentWidth jumps seamlessly)
      if (direction === "left") {
        if (offsetRef.current <= -contentWidth - gap) {
          // add contentWidth + gap to reset
          offsetRef.current += contentWidth + gap;
        }
      } else {
        if (offsetRef.current >= contentWidth + gap) {
          offsetRef.current -= contentWidth + gap;
        }
      }

      // apply transform
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      animationRef.current = requestAnimationFrame(step);
    }

    animationRef.current = requestAnimationFrame(step);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    };
  }, [
    contentWidth,
    speed,
    direction,
    pauseOnHover,
    isHovering,
    gap,
    prefersReducedMotion,
  ]);

  return (
    <div
      className={`overflow-hidden w-full ${className}`}
      style={{ position: "relative" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}>
      {/* wrapper that holds duplicated content inline */}
      <div
        // This container is the one we translate horizontally
        ref={containerRef}
        style={{
          display: "inline-flex",
          whiteSpace: "nowrap",
          willChange: "transform",
        }}
        aria-hidden={prefersReducedMotion ? "true" : undefined}>
        {/* original content */}
        <div
          ref={contentRef}
          style={{ display: "inline-flex", gap: `${gap}px` }}>
          {children}
        </div>

        {/* spacer between copies */}
        <div style={{ width: gap }} />

        {/* duplicated content for seamless loop */}
        <div style={{ display: "inline-flex", gap: `${gap}px` }}>
          {children}
        </div>
      </div>

      {/* For accessibility: if reduced motion, show static content */}
      {prefersReducedMotion && (
        <div className="sr-only" aria-hidden={false}>
          {children}
        </div>
      )}
    </div>
  );
}
