import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SectionContainer } from './SectionContainer';
import { WIDTH, HEIGHT, ANIMATION_SPEEDS } from '../constants';
import { Move, Smile, Plus, Trash2, Loader2 } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import GIF from 'gif.js';
import {
  partyTranslations,
  shakingTranslations,
  bounceTranslations,
  jelloScales,
  floatSteps,
  oscillateSteps,
  pulseSteps,
  heartbeatSteps,
  zigzagSteps,
  swingSteps,
} from '../constants/animations';

type CombinerAnimation =
  | 'none'
  | 'bounce'
  | 'shake'
  | 'spin'
  | 'jello'
  | 'pulse'
  | 'heartbeat'
  | 'float'
  | 'swing'
  | 'party'
  | 'zigzag'
  | 'oscillate';

const COMBINER_ANIMATION_LABELS: Record<CombinerAnimation, string> = {
  none: 'None',
  bounce: 'Bounce',
  shake: 'Shake',
  spin: 'Spin',
  jello: 'Jello',
  pulse: 'Pulse',
  heartbeat: 'Heartbeat',
  float: 'Float',
  swing: 'Swing',
  party: 'Party',
  zigzag: 'Zigzag',
  oscillate: 'Oscillate',
};

const KEYFRAME_COUNT = 10;
// Most keyframe arrays have frame[last] === frame[0]. Skip the duplicate so the
// loop seam doesn't show the same pose twice, which causes a visible stutter.
const LOOP_FRAMES = KEYFRAME_COUNT - 1;

// Spin: evenly distribute rotation across frames
const spinSteps = Array.from({ length: KEYFRAME_COUNT }, (_, i) => (i / KEYFRAME_COUNT) * 360);

interface EmojiItem {
  emoji: string;
  x: number;
  y: number;
  scale: number;
  zIndex: number;
  animation: CombinerAnimation;
}

const MAX_EMOJIS = 6;

const DEFAULT_EMOJIS: EmojiItem[] = [
  { emoji: '🙏', x: WIDTH / 2, y: HEIGHT - 40, scale: 1, zIndex: 1, animation: 'none' },
  { emoji: '🥹', x: WIDTH / 2, y: HEIGHT / 2, scale: 1.4, zIndex: 0, animation: 'none' },
];

function applyAnimationTransform(
  ctx: CanvasRenderingContext2D,
  animation: CombinerAnimation,
  frame: number,
  baseScale: number,
) {
  const f = frame % LOOP_FRAMES;

  switch (animation) {
    case 'bounce': {
      const [dx, dy] = bounceTranslations[f];
      ctx.translate(dx, dy);
      break;
    }
    case 'shake': {
      const [dx, dy] = shakingTranslations[f];
      ctx.translate(dx, dy);
      break;
    }
    case 'party': {
      const [dx, dy] = partyTranslations[f];
      ctx.translate(dx, dy);
      break;
    }
    case 'float': {
      const [dx, dy] = floatSteps[f];
      ctx.translate(dx, dy);
      break;
    }
    case 'zigzag': {
      const [dx, dy] = zigzagSteps[f];
      ctx.translate(dx, dy);
      break;
    }
    case 'oscillate': {
      const [dx, dy] = oscillateSteps[f];
      ctx.translate(dx, dy);
      break;
    }
    case 'spin': {
      const angle = spinSteps[f];
      ctx.rotate((angle * Math.PI) / 180);
      break;
    }
    case 'swing': {
      const { angle } = swingSteps[f];
      ctx.rotate((angle * Math.PI) / 180);
      break;
    }
    case 'jello': {
      const [sx, sy] = jelloScales[f];
      ctx.scale(sx, sy);
      break;
    }
    case 'pulse': {
      const [sx, sy] = pulseSteps[f];
      ctx.scale(sx, sy);
      break;
    }
    case 'heartbeat': {
      const [sx, sy] = heartbeatSteps[f];
      ctx.scale(sx, sy);
      break;
    }
    case 'none':
    default:
      break;
  }
}

function renderFrame(
  ctx: CanvasRenderingContext2D,
  emojis: EmojiItem[],
  frame: number,
) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  const sorted = [...emojis].sort((a, b) => a.zIndex - b.zIndex);

  sorted.forEach(({ emoji, x, y, scale, animation }) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    applyAnimationTransform(ctx, animation, frame, scale);
    ctx.font = '64px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, 0, 0);
    ctx.restore();
  });
}

export const EmojiCombiner: React.FC = () => {
  const [emojis, setEmojis] = useState<EmojiItem[]>(DEFAULT_EMOJIS);
  const [openPickerIndex, setOpenPickerIndex] = useState<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const frameCounterRef = useRef(0);

  const hasAnimation = emojis.some(e => e.animation !== 'none');

  const updateEmoji = (index: number, updates: Partial<EmojiItem>) => {
    setEmojis(prev => prev.map((item, i) => i === index ? { ...item, ...updates } : item));
  };

  const addEmoji = () => {
    if (emojis.length >= MAX_EMOJIS) return;
    const maxZ = Math.max(...emojis.map(e => e.zIndex));
    setEmojis(prev => [...prev, {
      emoji: '😀',
      x: WIDTH / 2,
      y: HEIGHT / 2,
      scale: 1,
      zIndex: maxZ + 1,
      animation: 'none',
    }]);
  };

  const removeEmoji = (index: number) => {
    if (emojis.length <= 2) return;
    setEmojis(prev => prev.filter((_, i) => i !== index));
  };

  const bringToFront = (index: number) => {
    const maxZ = Math.max(...emojis.map(e => e.zIndex));
    setEmojis(prev => prev.map((item, i) => ({
      ...item,
      zIndex: i === index ? maxZ + 1 : item.zIndex,
    })));
  };

  // Animated preview loop
  const emojisRef = useRef(emojis);
  emojisRef.current = emojis;

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    frameCounterRef.current = (frameCounterRef.current + 1) % KEYFRAME_COUNT;
    renderFrame(ctx, emojisRef.current, frameCounterRef.current);
    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (hasAnimation) {
      // Start animation loop with throttling (~10fps to match GIF frame rate)
      let lastTime = 0;
      const interval = ANIMATION_SPEEDS.normal * 1000; // ms per frame

      const loop = (time: number) => {
        if (time - lastTime >= interval) {
          lastTime = time;
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              frameCounterRef.current = (frameCounterRef.current + 1) % LOOP_FRAMES;
              renderFrame(ctx, emojisRef.current, frameCounterRef.current);
            }
          }
        }
        animFrameRef.current = requestAnimationFrame(loop);
      };

      animFrameRef.current = requestAnimationFrame(loop);

      return () => {
        cancelAnimationFrame(animFrameRef.current);
      };
    } else {
      // Static render
      cancelAnimationFrame(animFrameRef.current);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      renderFrame(ctx, emojis, 0);
    }
  }, [hasAnimation, emojis, animate]);

  // Also update static canvas when emojis change and no animation
  useEffect(() => {
    if (!hasAnimation) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      renderFrame(ctx, emojis, 0);
    }
  }, [emojis, hasAnimation]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    dragStartPos.current = { x, y };

    let closest = -1;
    let closestDist = Infinity;
    emojis.forEach((item, i) => {
      const d = Math.hypot(x - item.x, y - item.y);
      if (d < closestDist || (d === closestDist && item.zIndex > (emojis[closest]?.zIndex ?? -1))) {
        closestDist = d;
        closest = i;
      }
    });

    if (closest >= 0) {
      setDraggingIndex(closest);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingIndex === null) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = x - dragStartPos.current.x;
    const dy = y - dragStartPos.current.y;
    dragStartPos.current = { x, y };

    updateEmoji(draggingIndex, {
      x: Math.max(0, Math.min(WIDTH, emojis[draggingIndex].x + dx)),
      y: Math.max(0, Math.min(HEIGHT, emojis[draggingIndex].y + dy)),
    });
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
  };

  const generateGif = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const gif = new GIF({
        workers: 4,
        quality: 5,
        repeat: 0,
        width: WIDTH,
        height: HEIGHT,
        transparent: 0x000000,
        background: null,
        workerScript: import.meta.env.PROD ? '/gif.worker.js' : '/public/gif.worker.js',
        dither: false,
        debug: false,
      });

      const delay = ANIMATION_SPEEDS.normal * 1000;

      for (let f = 0; f < LOOP_FRAMES; f++) {
        const offscreen = document.createElement('canvas');
        offscreen.width = WIDTH;
        offscreen.height = HEIGHT;
        const ctx = offscreen.getContext('2d', {
          willReadFrequently: true,
          alpha: true,
        });
        if (!ctx) continue;

        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        renderFrame(ctx, emojis, f);

        gif.addFrame(offscreen, {
          delay,
          transparent: true,
          disposal: 2,
        });
      }

      gif.on('finished', (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        resolve(url);
      });

      gif.on('error', (error: Error) => {
        reject(error);
      });

      gif.render();
    });
  };

  const handleDownload = async () => {
    if (hasAnimation) {
      setIsGenerating(true);
      try {
        const url = await generateGif();
        const link = document.createElement('a');
        link.download = 'combined-emoji.gif';
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error('GIF generation error:', err);
      } finally {
        setIsGenerating(false);
      }
    } else {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = 'combined-emoji.png';
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <SectionContainer>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {emojis.map((item, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Emoji {index + 1}
                </h3>
                {emojis.length > 2 && (
                  <button
                    onClick={() => removeEmoji(index)}
                    className="p-1 text-red-400 hover:text-red-600 transition-colors"
                    title="Remove emoji"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => setOpenPickerIndex(openPickerIndex === index ? null : index)}
                  className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <Smile className="w-5 h-5 text-gray-500" />
                </button>
                {openPickerIndex === index && (
                  <div className="absolute z-10 mt-1">
                    <EmojiPicker
                      onEmojiClick={(emojiData) => {
                        updateEmoji(index, { emoji: emojiData.emoji });
                        setOpenPickerIndex(null);
                      }}
                      width={300}
                    />
                  </div>
                )}
              </div>
              <div className="mt-3 space-y-1">
                <label className="block text-xs text-gray-600 dark:text-gray-400">Scale</label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={item.scale}
                  onChange={(e) => updateEmoji(index, { scale: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div className="mt-2 space-y-1">
                <label className="block text-xs text-gray-600 dark:text-gray-400">Animation</label>
                <select
                  value={item.animation}
                  onChange={(e) => updateEmoji(index, { animation: e.target.value as CombinerAnimation })}
                  className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {(Object.keys(COMBINER_ANIMATION_LABELS) as CombinerAnimation[]).map((key) => (
                    <option key={key} value={key}>{COMBINER_ANIMATION_LABELS[key]}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => bringToFront(index)}
                className="mt-2 w-full px-2 py-1 text-xs rounded-md transition-colors bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-700 dark:hover:text-purple-300"
              >
                Bring to Front
              </button>
            </div>
          ))}

          {emojis.length < MAX_EMOJIS && (
            <button
              onClick={addEmoji}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3 flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400 hover:border-purple-400 hover:text-purple-500 transition-colors"
            >
              <Plus className="w-6 h-6" />
              <span className="text-sm font-medium">Add Emoji</span>
            </button>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Move className="w-3 h-3" />
          <span>Drag emojis on the canvas to reposition them</span>
        </div>

        <div className="mt-4">
          <canvas
            ref={canvasRef}
            width={WIDTH}
            height={HEIGHT}
            className="mx-auto border border-gray-200 dark:border-gray-700 rounded-lg cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>

        <div className="mt-6 flex flex-col items-center">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isGenerating && <Loader2 className="w-4 h-4 animate-spin" />}
            {isGenerating
              ? 'Generating GIF...'
              : hasAnimation
                ? 'Download Combined Emoji (GIF)'
                : 'Download Combined Emoji'}
          </button>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-md text-center">
            <span className="font-medium text-purple-600 dark:text-purple-400">Pro Tip:</span> Upload your downloaded emoji to the Image Emoji section to add animated effects and transformations!
          </p>
        </div>
      </div>
    </SectionContainer>
  );
};
