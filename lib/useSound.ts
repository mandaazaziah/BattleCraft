"use client";
import { useCallback, useRef } from "react";

export type SoundName =
  | "click"
  | "portal_open"
  | "home_enter"
  | "setup_enter"
  | "battle_start"
  | "correct"
  | "wrong"
  | "score_up"
  | "attack"
  | "hit"
  | "round_next"
  | "win"
  | "lose"
  | "draw"
  | "spin_start"
  | "spin_tick"
  | "spin_stop"
  | "countdown"
  | "result_enter";

export function isMuted(): boolean {
  return false;
}

function createCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    return new ((window as any).AudioContext || (window as any).webkitAudioContext)();
  } catch {
    return null;
  }
}

function playTone(
  ctx: AudioContext,
  type: OscillatorType,
  freq: number,
  startTime: number,
  duration: number,
  volume = 0.18,
  freqEnd?: number
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  if (freqEnd !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(freqEnd, startTime + duration);
  }
  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.02);
}

function playNoise(
  ctx: AudioContext,
  startTime: number,
  duration: number,
  volume = 0.08
) {
  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gain = ctx.createGain();
  source.connect(gain);
  gain.connect(ctx.destination);
  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  source.start(startTime);
  source.stop(startTime + duration + 0.02);
}

function doPlaySound(ctx: AudioContext, name: SoundName) {
  const t = ctx.currentTime;
  switch (name) {
    case "click":
      playTone(ctx, "square", 880, t, 0.06, 0.12);
      playTone(ctx, "square", 1100, t + 0.06, 0.06, 0.08);
      break;
    case "portal_open":
      playTone(ctx, "sine", 220, t, 0.15, 0.10);
      playTone(ctx, "sine", 330, t + 0.10, 0.20, 0.12);
      playTone(ctx, "sine", 440, t + 0.25, 0.25, 0.14);
      playTone(ctx, "sine", 660, t + 0.40, 0.30, 0.16, 880);
      playNoise(ctx, t, 0.60, 0.04);
      break;
    case "home_enter":
      [523, 659, 784, 1047].forEach((f, i) =>
        playTone(ctx, "square", f, t + i * 0.10, 0.15, 0.11)
      );
      break;
    case "setup_enter":
      playTone(ctx, "square", 392, t, 0.12, 0.10);
      playTone(ctx, "square", 523, t + 0.12, 0.12, 0.12);
      playTone(ctx, "square", 659, t + 0.24, 0.20, 0.14);
      break;
    case "battle_start":
      [523, 659, 784, 1047, 784, 1047].forEach((f, i) =>
        playTone(ctx, "square", f, t + i * 0.09, 0.12, 0.15)
      );
      playNoise(ctx, t, 0.50, 0.05);
      break;
    case "correct":
      playTone(ctx, "square", 523, t, 0.10, 0.15);
      playTone(ctx, "square", 659, t + 0.10, 0.10, 0.15);
      playTone(ctx, "square", 784, t + 0.20, 0.15, 0.18);
      playTone(ctx, "sine", 1047, t + 0.32, 0.22, 0.12);
      break;
    case "wrong":
      playTone(ctx, "sawtooth", 300, t, 0.10, 0.14);
      playTone(ctx, "sawtooth", 200, t + 0.10, 0.18, 0.12);
      playNoise(ctx, t, 0.28, 0.06);
      break;
    case "score_up":
      playTone(ctx, "square", 784, t, 0.08, 0.12);
      playTone(ctx, "square", 1047, t + 0.08, 0.12, 0.14);
      break;
    case "attack":
      playTone(ctx, "sawtooth", 440, t, 0.08, 0.16, 220);
      playNoise(ctx, t, 0.15, 0.08);
      break;
    case "hit":
      playNoise(ctx, t, 0.14, 0.13);
      playTone(ctx, "sawtooth", 180, t, 0.14, 0.14, 90);
      break;
    case "round_next":
      playTone(ctx, "square", 392, t, 0.08, 0.10);
      playTone(ctx, "square", 523, t + 0.10, 0.10, 0.10);
      break;
    case "win":
      playTone(ctx, "triangle", 330, t, 0.18, 0.16);
      playTone(ctx, "triangle", 392, t + 0.24, 0.18, 0.16);
      playTone(ctx, "triangle", 494, t + 0.48, 0.18, 0.16);
      [523, 659, 784, 1047].forEach((f, i) =>
        playTone(ctx, "square", f, t + 0.78 + i * 0.12, 0.18, 0.17)
      );
      playNoise(ctx, t + 0.78, 0.68, 0.05);
      break;
    case "lose":
      [392, 349, 330, 294].forEach((f, i) =>
        playTone(ctx, "sawtooth", f, t + i * 0.14, 0.18, 0.12)
      );
      break;
    case "draw":
      playTone(ctx, "sine", 523, t, 0.18, 0.12);
      playTone(ctx, "sine", 523, t + 0.30, 0.18, 0.12);
      break;
    case "spin_start":
      playNoise(ctx, t, 0.08, 0.08);
      playTone(ctx, "sawtooth", 140, t, 0.08, 0.08, 280);
      break;
    case "spin_tick":
      playTone(ctx, "square", 980, t, 0.035, 0.09);
      break;
    case "spin_stop":
      playNoise(ctx, t, 0.34, 0.16);
      playTone(ctx, "sawtooth", 110, t, 0.14, 0.14, 70);
      playTone(ctx, "triangle", 660, t + 0.04, 0.18, 0.16, 990);
      playTone(ctx, "square", 880, t + 0.16, 0.16, 0.14);
      playTone(ctx, "sine", 1320, t + 0.27, 0.55, 0.18, 520);
      break;
    case "countdown":
      playTone(ctx, "square", 660, t, 0.10, 0.13);
      break;
    case "result_enter":
      playTone(ctx, "sine", 523, t, 0.18, 0.10);
      playTone(ctx, "sine", 659, t + 0.20, 0.20, 0.12);
      break;
  }
}

export function useSoundSystem() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback((): AudioContext | null => {
    if (!ctxRef.current) ctxRef.current = createCtx();
    const ctx = ctxRef.current;
    if (ctx && ctx.state === "suspended") ctx.resume();
    return ctx;
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      if (isMuted()) return;
      const ctx = getCtx();
      if (!ctx) return;
      doPlaySound(ctx, name);
    },
    [getCtx]
  );

  return { play };
}
