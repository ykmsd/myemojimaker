import React, { useState, useEffect } from 'react';
import { textToImage } from '../utils/textToImage';
import { downloadUri } from '../utils/download';

interface StaticTextEmojiProps {
  text: string;
  textColor: string;
  backgroundColor: string;
  outlineColor: string | null;
  outlineWidth: number;
  fontFamily: string;
}

export const StaticTextEmoji: React.FC<StaticTextEmojiProps> = ({
  text,
  textColor,
  backgroundColor,
  outlineColor,
  outlineWidth,
  fontFamily,
}) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const url = textToImage(
      text,
      textColor,
      fontFamily,
      backgroundColor,
      outlineColor,
      outlineWidth
    );
    setImageUrl(url);

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [text, textColor, backgroundColor, outlineColor, outlineWidth, fontFamily]);

  const handleClick = () => {
    if (imageUrl) {
      downloadUri(imageUrl, `${text.toLowerCase()}-static.png`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative p-3 w-28 h-36 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all cursor-pointer hover:shadow-lg transform hover:-translate-y-1"
    >
      <div className="relative w-20 h-20 mx-auto">
        <img
          src={imageUrl}
          alt={`Static emoji: ${text}`}
          className="w-full h-full object-contain rounded-lg hover:scale-150 transition-transform"
        />
      </div>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 break-words">
        :{text.toLowerCase()}:
      </p>
    </div>
  );
};
