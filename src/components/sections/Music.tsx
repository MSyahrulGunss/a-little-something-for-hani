"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { siteConfig } from "@/config/site";

const BAR_COUNT = 16;

export function Music() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const rafRef = useRef<number>(0);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [localAudio, setLocalAudio] = useState<{ src: string; name: string } | null>(null);
  const [bars, setBars] = useState<number[]>(() => Array(BAR_COUNT).fill(8));

  const tracks = siteConfig.music.tracks;
  const track = tracks[index];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    setProgress(0);
    if (playing) {
      void audio.play().catch(() => setPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    return () => {
      if (localAudio) URL.revokeObjectURL(localAudio.src);
    };
  }, [localAudio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    setProgress(0);
    setDuration(0);
  }, [localAudio]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      void ctxRef.current?.close();
    };
  }, []);

  const ensureAnalyser = () => {
    const audio = audioRef.current;
    if (!audio || analyserRef.current) return;

    const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    const source = ctx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(ctx.destination);
    ctxRef.current = ctx;
    analyserRef.current = analyser;
    sourceRef.current = source;
  };

  const tickVisualizer = () => {
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    const next = Array.from({ length: BAR_COUNT }, (_, i) => {
      const value = data[i] ?? 0;
      return 8 + (value / 255) * 36;
    });
    setBars(next);
    rafRef.current = requestAnimationFrame(tickVisualizer);
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      cancelAnimationFrame(rafRef.current);
      return;
    }

    ensureAnalyser();
    await ctxRef.current?.resume();
    await audio.play();
    setPlaying(true);
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tickVisualizer);
  };

  const onTime = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setProgress(audio.currentTime);
    setDuration(audio.duration || 0);
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setProgress(value);
  };

  const format = (seconds: number) => {
    if (!seconds || Number.isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <section aria-labelledby="music-title" className="mx-auto max-w-xl">
      <h2
        id="music-title"
        className="text-center font-[family-name:var(--font-script)] text-4xl text-rose-ink"
      >
        {siteConfig.music.title}
      </h2>
      <p className="mt-2 text-center font-serif text-rose-ink/65">
        {siteConfig.music.caption}
      </p>

      <div className="mt-6 rounded-[28px] border border-white/80 bg-white/85 p-5 shadow-[var(--shadow)] sm:p-7">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          <div
            className={`relative size-36 shrink-0 overflow-hidden rounded-full border-4 border-[#f4b8c8] shadow-md ${
              playing ? "animate-[spin_12s_linear_infinite]" : ""
            }`}
          >
            <Image src={track.cover} alt="" fill className="object-cover" sizes="144px" />
          </div>
          <div className="w-full text-center sm:text-left">
            <p className="font-serif text-2xl text-rose-ink">{localAudio?.name ?? track.title}</p>
            <p className="text-sm text-rose-ink/55">{localAudio ? "Your selected audio · only in this browser" : track.artist}</p>

            <div
              className="mt-4 flex h-10 items-end justify-center gap-1 sm:justify-start"
              aria-hidden
            >
              {bars.map((height, i) => (
                <span
                  key={i}
                  className="visualizer-bar w-1.5 rounded-full bg-[#e8a0b4]"
                  style={{ height: playing ? height : 8 }}
                />
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => void togglePlay()}
                className="flex size-12 items-center justify-center rounded-full bg-[#e8a0b4] text-white shadow-sm transition hover:bg-[#d989a2]"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? <Pause className="size-5" /> : <Play className="ml-0.5 size-5" />}
              </button>
              <div className="flex-1">
                <label className="sr-only" htmlFor="seek">
                  Song progress
                </label>
                <input
                  id="seek"
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={progress}
                  onChange={(event) => seek(Number(event.target.value))}
                  className="w-full accent-[#e8a0b4]"
                />
                <div className="mt-1 flex justify-between text-[11px] text-rose-ink/45">
                  <span>{format(progress)}</span>
                  <span>{format(duration)}</span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMuted((value) => !value)}
                className="text-rose-ink/60"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted || volume === 0 ? (
                  <VolumeX className="size-4" />
                ) : (
                  <Volume2 className="size-4" />
                )}
              </button>
              <label className="sr-only" htmlFor="volume">
                Volume
              </label>
              <input
                id="volume"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={(event) => {
                  setMuted(false);
                  setVolume(Number(event.target.value));
                }}
                className="w-28 accent-[#e8a0b4]"
              />
            </div>
          </div>
        </div>

        <ul className="mt-6 space-y-2" aria-label="Playlist">
          {tracks.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  if (localAudio) setLocalAudio(null);
                  if (i === index) {
                    if (!playing && !localAudio) void togglePlay();
                    return;
                  }
                  setPlaying(true);
                  setIndex(i);
                }}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left transition ${
                  i === index ? "bg-[#fde8ef]" : "hover:bg-rose-50"
                }`}
              >
                <span className="relative size-10 overflow-hidden rounded-lg">
                  <Image src={item.cover} alt="" fill className="object-cover" sizes="40px" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-rose-ink">
                    {item.title}
                  </span>
                  <span className="block text-xs text-rose-ink/50">{item.artist}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs leading-5 text-rose-ink/45">{siteConfig.music.note}</p>
        <label className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-full border border-rose-200 bg-white/75 px-4 py-2 text-sm text-rose-ink/70 transition hover:bg-rose-50 focus-within:ring-2 focus-within:ring-rose-300">
          Choose your own audio
          <input
            type="file"
            accept="audio/*"
            className="sr-only"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              if (!file) return;
              if (localAudio) URL.revokeObjectURL(localAudio.src);
              audioRef.current?.pause();
              setPlaying(false);
              setLocalAudio({ src: URL.createObjectURL(file), name: file.name });
              event.currentTarget.value = "";
            }}
          />
        </label>
        {localAudio ? (
          <button type="button" onClick={() => setLocalAudio(null)} className="ml-3 mt-4 text-xs text-rose-ink/50 underline underline-offset-4 hover:text-rose-ink">
            Use playlist instead
          </button>
        ) : null}
      </div>

      <audio
        ref={audioRef}
        src={localAudio?.src ?? track.src}
        preload="metadata"
        onTimeUpdate={onTime}
        onLoadedMetadata={onTime}
        onEnded={() => {
          setPlaying(false);
          setBars(Array(BAR_COUNT).fill(8));
        }}
      />
    </section>
  );
}
