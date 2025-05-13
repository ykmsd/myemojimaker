import React from 'react';
import { ImageDown, Crop, SunMedium, Square } from 'lucide-react';

export const EmojiTips: React.FC = () => {
  const tips = [
    {
      icon: ImageDown,
      title: "Remove Background",
      description: "Use background removal tools before uploading to create clean, professional-looking emoji. This helps your emoji blend better with different backgrounds."
    },
    {
      icon: Square,
      title: "Use Square Images",
      description: "Start with square images or crop them to a 1:1 ratio. This ensures your emoji will look balanced and properly sized in chat applications."
    },
    {
      icon: Crop,
      title: "Proper Cropping",
      description: "Crop your image to focus on the main subject. Leave a small margin around the edges to prevent cutting off important details."
    },
    {
      icon: SunMedium,
      title: "Adjust Brightness & Contrast",
      description: "Ensure your image has good contrast and isn't too dark or bright. This helps the emoji stand out and remain visible in different contexts."
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Tips for Creating Great Emoji
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <tip.icon className="w-6 h-6 text-purple-500 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {tip.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {tip.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};