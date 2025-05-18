import React, { useState, useRef, useEffect } from 'react';
import { SectionContainer } from './SectionContainer';
import { WIDTH, HEIGHT } from '../constants';

interface EmojiPosition {
  x: number;
  y: number;
  scale: number;
}

export const EmojiCombiner: React.FC = () => {
  const [firstEmoji, setFirstEmoji] = useState('🙏');
  const [secondEmoji, setSecondEmoji] = useState('❤️');
  const [firstPosition, setFirstPosition] = useState<EmojiPosition>({ x: WIDTH/3, y: HEIGHT/2, scale: 1 });
  const [secondPosition, setSecondPosition] = useState<EmojiPosition>({ x: 2*WIDTH/3, y: HEIGHT/2, scale: 1 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const updateCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
    // Draw first emoji
    ctx.save();
    ctx.translate(firstPosition.x, firstPosition.y);
    ctx.scale(firstPosition.scale, firstPosition.scale);
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(firstEmoji, 0, 0);
    ctx.restore();

    // Draw second emoji
    ctx.save();
    ctx.translate(secondPosition.x, secondPosition.y);
    ctx.scale(secondPosition.scale, secondPosition.scale);
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(secondEmoji, 0, 0);
    ctx.restore();
  };

  useEffect(() => {
    updateCanvas();
  }, [firstEmoji, secondEmoji, firstPosition, secondPosition]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'combined-emoji.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SectionContainer>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              First Emoji
            </h3>
            <input
              type="text"
              value={firstEmoji}
              onChange={(e) => setFirstEmoji(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
              maxLength={2}
            />
            <div className="mt-4 space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">Scale</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={firstPosition.scale}
                onChange={(e) => setFirstPosition({...firstPosition, scale: parseFloat(e.target.value)})}
                className="w-full"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Second Emoji
            </h3>
            <input
              type="text"
              value={secondEmoji}
              onChange={(e) => setSecondEmoji(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
              maxLength={2}
            />
            <div className="mt-4 space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">Scale</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={secondPosition.scale}
                onChange={(e) => setSecondPosition({...secondPosition, scale: parseFloat(e.target.value)})}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <canvas
            ref={canvasRef}
            width={WIDTH}
            height={HEIGHT}
            className="mx-auto border border-gray-200 dark:border-gray-700 rounded-lg"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              
              // Determine which emoji is closer to the click
              const d1 = Math.hypot(x - firstPosition.x, y - firstPosition.y);
              const d2 = Math.hypot(x - secondPosition.x, y - secondPosition.y);
              
              if (d1 < d2) {
                setFirstPosition({...firstPosition, x, y});
              } else {
                setSecondPosition({...secondPosition, x, y});
              }
            }}
          />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Download Combined Emoji
          </button>
        </div>
      </div>
    </SectionContainer>
  );
};