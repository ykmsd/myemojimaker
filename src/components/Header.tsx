import React from 'react';
import logoSvg from '../images/myemojimaker-logo.svg?url';

export const Header: React.FC = () => {
  return (
    <div className="text-center mb-6">
      <div className="bg-gray-900/80 rounded-lg px-8 py-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <img 
            src={logoSvg} 
            alt="MyEmojiMaker"
            className="h-12"
          />
        </div>
        <h2 className="text-xl font-medium text-gray-200 mb-2 font-mono">
          Create Custom Emoji for Slack & Discord – Free Online Emoji Maker
        </h2>
        <p className="text-base text-gray-300 max-w-2xl mx-auto">
          Create perfect emoji for Slack, Discord, and Teams in seconds! Upload images, remove backgrounds, add effects, and download your custom emoji. No signup required.
        </p>
      </div>
    </div>
  );
};