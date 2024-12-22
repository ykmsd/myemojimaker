import React from 'react';
import logoSvg from '../images/myemojimaker-logo.svg?url';

export const Header: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <div className="bg-gray-900/80 rounded-lg px-8 py-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <img 
            src={logoSvg} 
            alt="MyEmojiMaker"
            className="h-12"
          />
        </div>
        <h2 className="text-xl font-medium text-gray-200 mb-3 font-mono">
          Your Emoji, Your Style – Unleash Creativity One Pixel at a Time!
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Turn Your Ideas into Unique Emoji Creations! Upload your favorite images, and we'll transform them into custom emoji with fun filters like manga, animation, and vibrant color effects.
        </p>
      </div>
    </div>
  );
};