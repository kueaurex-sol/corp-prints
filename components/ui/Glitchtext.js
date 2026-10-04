"use client";
import { useEffect, useState } from "react";
import "./Glitchtext.css";

/**
 * A one-time glitch burst for a heading, not a looping effect. Mounts
 * clean, glitches for `burstMs`, then settles into the plain heading.
 * Recolored from the original's red/cyan RGB-split to Corp Prints'
 * magenta/cyan inks.
 *
 * Typography (size, weight, color) is left to whatever className you
 * pass in — this component only adds the glitch mechanics, so it can
 * wrap any heading and inherit your existing text styles.
 */
export default function GlitchText({
  children,
  as: Tag = "span",
  speed = 1,
  burstMs = 900,
  enableShadows = true,
  className = "",
}) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    // Start on the next frame so the burst is visible rather than
    // racing the initial paint, then stop after burstMs.
    const start = requestAnimationFrame(() => setGlitching(true));
    const stop = setTimeout(() => setGlitching(false), burstMs);
    return () => {
      cancelAnimationFrame(start);
      clearTimeout(stop);
    };
  }, [burstMs]);

  const style = {
    "--after-duration": `${speed * 0.45}s`,
    "--before-duration": `${speed * 0.35}s`,
    "--after-shadow": enableShadows ? "-5px 0 #EC008C" : "none",
    "--before-shadow": enableShadows ? "5px 0 #00AEEF" : "none",
  };

  return (
    <Tag
      className={`glitch-heading ${glitching ? "is-glitching" : ""} ${className}`}
      style={style}
      data-text={children}
    >
      {children}
    </Tag>
  );
}