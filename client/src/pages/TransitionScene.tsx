import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import scenes from the src assets so bundler handles them
import Scene1 from '../assets/Scene1.png';
import Scene2 from '../assets/Scene2.png';
import Scene3 from '../assets/Scene3.png';
import Scene4 from '../assets/Scene4.png';
import Scene5 from '../assets/Scene5.png';
import Scene6 from '../assets/Scene6.png';

const images = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6];

const TransitionScene: React.FC = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // Preload images to reduce flicker
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src as string;
    });
  }, []);

  // Advance scenes every 1.5s. After last scene, navigate to /home.
  useEffect(() => {
    const intervalMs = 1500;
    let t: number | undefined;

    // If we just arrived at the last scene, play explosion sound immediately
    if (index === images.length - 1) {
      playExplosion()
      // show last scene for intervalMs then navigate
      t = window.setTimeout(() => navigate('/home'), intervalMs);
    } else {
      t = window.setTimeout(() => setIndex((i) => i + 1), intervalMs);
    }

    return () => {
      if (t !== undefined) clearTimeout(t);
    };
  }, [index, navigate]);

  // Use a ref to hold a shared AudioContext so we can resume it from a
  // user gesture (e.g. sign-in click) and avoid autoplay blocking.
  const audioCtxRef = React.useRef<AudioContext | null>(null)

  const getAudioContext = async (): Promise<AudioContext | null> => {
    if (audioCtxRef.current) return audioCtxRef.current
    // If a context was created during login and stored on window, reuse it
    const existing = (window as any).__LockedInAudioCtx as AudioContext | undefined
    if (existing) {
      audioCtxRef.current = existing
      return existing
    }
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext
      const ctx: AudioContext = new AudioCtx()
      // If created in a suspended state, user gesture should resume it elsewhere
      if (ctx.state === 'suspended') {
        // Try to resume; this may fail if not called from a user gesture.
        // We still keep the context so a later user gesture can resume it.
        void ctx.resume().catch(() => {})
      }
      audioCtxRef.current = ctx
      return ctx
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('AudioContext creation failed', err)
      return null
    }
  }

  // Play a short synthesized explosion-like sound using Web Audio API.
  // This avoids needing an external audio file. We attempt to get/resume the
  // AudioContext first; if the browser blocks audio because there was no
  // user gesture, this will be a no-op.
  const playExplosion = async () => {
    try {
      const ctx = await getAudioContext()
      if (!ctx) return

      // If suspended and this wasn't triggered from a user gesture the resume
      // may be rejected; attempt it but don't rely on it.
      if (ctx.state === 'suspended') {
        try { await ctx.resume() } catch { /* ignore */ }
      }

      const duration = 1.0
      const sampleRate = ctx.sampleRate
      const buffer = ctx.createBuffer(1, Math.floor(sampleRate * duration), sampleRate)
      const data = buffer.getChannelData(0)

      for (let i = 0; i < data.length; i++) {
        const t = i / sampleRate
        const envelope = Math.exp(-4 * t)
        data[i] = (Math.random() * 2 - 1) * envelope
      }

      const source = ctx.createBufferSource()
      source.buffer = buffer

      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(8000, ctx.currentTime)
      filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + duration)

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(1, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

      source.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      source.start()
      source.stop(ctx.currentTime + duration)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Could not play explosion sound', err)
    }
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // make container transparent so PNGs with alpha show through
      backgroundColor: 'transparent'
    }}>
      <img
        src={images[index]}
        alt={`Scene ${index + 1}`}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          // ensure the image itself has a transparent background
          backgroundColor: 'transparent'
        }}
      />
    </div>
  );
};

export default TransitionScene;
