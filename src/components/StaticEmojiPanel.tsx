import React, { useState, useEffect, useRef } from 'react';
import { generateStaticPng } from '../utils/staticEffects';
import { downloadUri } from '../utils/download';
import { BLANK_GIF } from '../constants';

interface StaticEmojiPanelProps {
  img: string;
  transformation: string;
  name: string;
  primaryColor: string;
  strokeColor: string;
  updateKey: number;
}

// Queue for limiting concurrent PNG generation
const processingQueue: Array<() => Promise<void>> = [];
let isProcessing = false;

async function processQueue() {
  if (isProcessing || processingQueue.length === 0) return;
  
  isProcessing = true;
  const nextTask = processingQueue.shift();
  
  if (nextTask) {
    try {
      await nextTask();
    } catch (error) {
      console.error('Error in processing queue:', error);
    }
    
    isProcessing = false;
    processQueue(); // Process next item in queue
  }
}

const StaticEmojiPanel: React.FC<StaticEmojiPanelProps> = ({
  img,
  transformation,
  name,
  primaryColor,
  strokeColor,
  updateKey,
}) => {
  const [pngUrl, setPngUrl] = useState(BLANK_GIF);
  const [loading, setLoading] = useState(false);
  const processingRef = useRef(false);
  
  // Use caching to avoid regenerating the same image
  const cacheKey = `${img}-${transformation}-${primaryColor}-${strokeColor}-${updateKey}`;
  const cachedImageRef = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    if (!img || processingRef.current) return;
    
    // Check cache first
    if (cachedImageRef.current.has(cacheKey)) {
      setPngUrl(cachedImageRef.current.get(cacheKey)!);
      return;
    }
    
    setLoading(true);
    processingRef.current = true;
    setPngUrl(BLANK_GIF);

    const generatePng = async () => {
      try {
        const blob = await generateStaticPng(img, transformation, primaryColor, strokeColor);
        const url = URL.createObjectURL(blob);
        
        // Cache the result
        cachedImageRef.current.set(cacheKey, url);
        
        setPngUrl(url);
        setLoading(false);
        processingRef.current = false;
      } catch (error) {
        console.error('Error generating PNG:', error);
        setLoading(false);
        processingRef.current = false;
      }
    };

    // Queue this processing task
    processingQueue.push(generatePng);
    processQueue();
    
    return () => {
      processingRef.current = false;
    };
  }, [img, transformation, primaryColor, strokeColor, updateKey, cacheKey]);

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      if (pngUrl !== BLANK_GIF) {
        URL.revokeObjectURL(pngUrl);
      }
    };
  }, []);

  const isClickable = pngUrl !== BLANK_GIF;

  const handleClick = () => {
    if (isClickable) {
      downloadUri(pngUrl, `${name}.png`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative p-3 w-28 h-36 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all ${
        isClickable
          ? 'cursor-pointer hover:shadow-lg transform hover:-translate-y-1'
          : ''
      }`}
    >
      <div className="relative w-20 h-20 mx-auto">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 bg-opacity-75 rounded-lg">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        )}
        <img
          src={pngUrl}
          alt={`The generated ${name} static emoji`}
          className="w-full h-full object-contain rounded-lg hover:scale-150 transition-transform"
          loading="lazy"
        />
      </div>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 break-words">
        :{name}:
      </p>
    </div>
  );
};

export default StaticEmojiPanel;