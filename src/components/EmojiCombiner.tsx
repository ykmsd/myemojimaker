import React, { useState, useRef, useEffect } from 'react';
import { SectionContainer } from './SectionContainer';
import { WIDTH, HEIGHT } from '../constants';
import { Move } from 'lucide-react';

interface EmojiPosition {
  x: number;
  y: number;
  scale: number;
  isDragging: boolean;
}

export const EmojiCombiner: React.FC = () => {
  const [firstEmoji, setFirstEmoji] = useState('🙏');
  const [secondEmoji, setSecondEmoji] = useState('❤️');
  const [firstPosition, setFirstPosition] = useState<EmojiPosition>({ 
    x: WIDTH/3, 
    y: HEIGHT/2, 
    scale: 1,
    isDragging: false 
  });
  const [secondPosition, setSecondPosition] = useState<EmojiPosition>({ 
    x: 2*WIDTH/3, 
    y: HEIGHT/2, 
    scale: 1,
    isDragging: false 
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

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

  const handleMouseDown = (e: React.MouseEvent, isFirst: boolean) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    dragStartPos.current = { x, y };

    if (isFirst) {
      setFirstPosition(prev => ({ ...prev, isDragging: true }));
    } else {
      setSecondPosition(prev => ({ ...prev, isDragging: true }));
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = x - dragStartPos.current.x;
    const dy = y - dragStartPos.current.y;
    dragStartPos.current = { x, y };

    if (firstPosition.isDragging) {
      setFirstPosition(prev => ({
        ...prev,
        x: Math.max(0, Math.min(WIDTH, prev.x + dx)),
        y: Math.max(0, Math.min(HEIGHT, prev.y + dy))
      }));
    } else if (secondPosition.isDragging) {
      setSecondPosition(prev => ({
        ...prev,
        x: Math.max(0, Math.min(WIDTH, prev.x + dx)),
        y: Math.max(0, Math.min(HEIGHT, prev.y + dy))
      }));
    }
  };

  const handleMouseUp = () => {
    setFirstPosition(prev => ({ ...prev, isDragging: false }));
    setSecondPosition(prev => ({ ...prev, isDragging: false }));
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
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                <Move className="inline w-4 h-4" /> Drag to position
              </span>
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
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                <Move className="inline w-4 h-4" /> Drag to position
              </span>
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
            className="mx-auto border border-gray-200 dark:border-gray-700 rounded-lg cursor-move"
            onMouseDown={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const d1 = Math.hypot(x - firstPosition.x, y - firstPosition.y);
              const d2 = Math.hypot(x - secondPosition.x, y - secondPosition.y);
              handleMouseDown(e, d1 < d2);
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
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