import React, { useState, useEffect } from 'react';
import { generateStaticPng } from '../utils/staticEffects';
import { downloadUri } from '../utils/download';
import { BLANK_GIF } from '../constants';
import { OverlayAnimationType } from '../types/effects';
import { generateAnimatedOverlayGif } from '../utils/animatedOverlay';

interface StaticEmojiPanelProps {
  img: string;
  transformation: string;
  name: string;
  primaryColor: string;
  strokeColor: string;
  updateKey: number;
  overlayScale?: number;
  overlayX?: number;
  overlayY?: number;
  overlayAnimation?: OverlayAnimationType;
  backgroundColor?: string;
}

const StaticEmojiPanel: React.FC<StaticEmojiPanelProps> = ({
  img,
  transformation,
  name,
  primaryColor,
  strokeColor,
  updateKey,
  overlayScale = 100,
  overlayX = 0,
  overlayY = 0,
  overlayAnimation = 'none',
  backgroundColor,
}) => {
  const [pngUrl, setPngUrl] = useState(BLANK_GIF);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!img) return;

    setLoading(true);
    setPngUrl(BLANK_GIF);

    // If animation is enabled, generate animated GIF
    const generatePromise = overlayAnimation !== 'none'
      ? generateAnimatedOverlayGif(
          img,
          transformation,
          primaryColor,
          strokeColor,
          overlayScale,
          overlayX,
          overlayY,
          overlayAnimation,
          backgroundColor
        )
      : generateStaticPng(
          img,
          transformation,
          primaryColor,
          strokeColor,
          overlayScale,
          overlayX,
          overlayY,
          backgroundColor
        );

    generatePromise
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setPngUrl(url);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error generating image:', error);
        setLoading(false);
      });

    return () => {
      if (pngUrl !== BLANK_GIF) {
        URL.revokeObjectURL(pngUrl);
      }
    };
  }, [img, transformation, primaryColor, strokeColor, updateKey, overlayScale, overlayX, overlayY, overlayAnimation, backgroundColor]);

  const isClickable = pngUrl !== BLANK_GIF;

  const handleClick = () => {
    if (isClickable) {
      const extension = overlayAnimation !== 'none' ? 'gif' : 'png';
      downloadUri(pngUrl, `${name}.${extension}`);
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
        />
      </div>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 break-words">
        :{name}:
      </p>
    </div>
  );
};

export default StaticEmojiPanel;