import React from 'react';
import { Plus, Equal } from 'lucide-react';
import pistacheImg from '../images/sample/pistache.png';
import sparklesGif from '../images/sample/sparkles.gif';
import resultGif from '../images/sample/customgif.gif';
import omgGif from '../images/sample/omg-rainbow.gif';
import omgRainGif from '../images/sample/omg-rain.gif';

interface GifCreationExampleProps {
  activeSection: 'image' | 'text';
}

export const GifCreationExample: React.FC<GifCreationExampleProps> = ({
  activeSection,
}) => {
  const examples = {
    image: {
      first: {
        src: pistacheImg,
        alt: 'Source image',
        label: 'Your Image',
      },
      second: {
        src: sparklesGif,
        alt: 'Your GIF',
        label: 'Your GIF',
      },
      result: {
        src: resultGif,
        alt: 'Result',
        label: 'Result',
      },
    },
    text: {
      first: {
        content: 'OMG',
        alt: 'Omg',
        label: 'Your Text',
      },
      second: {
        src: omgRainGif,
        alt: 'Your GIF',
        label: 'Your GIF',
      },
      result: {
        src: omgGif,
        alt: 'Rainbow animated result',
        label: 'Result',
      },
    },
  };

  const example = examples[activeSection];

  return (
    <div className="flex items-center justify-center gap-4 mb-8 max-w-xl mx-auto">
      <div className="text-center">
        {activeSection === 'image' ? (
          <img
            src={example.first.src}
            alt={example.first.alt}
            className="w-12 h-12 object-contain rounded-lg"
          />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center text-3xl text-gray-900 dark:text-gray-100">
            {example.first.content}
          </div>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {example.first.label}
        </p>
      </div>
      <Plus className="w-4 h-4 text-purple-500" />
      <div className="text-center">
        <img
          src={example.second.src}
          alt={example.second.alt}
          className="w-12 h-12 object-contain rounded-lg"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {example.second.label}
        </p>
      </div>
      <Equal className="w-4 h-4 text-purple-500" />
      <div className="text-center">
        <img
          src={example.result.src}
          alt={example.result.alt}
          className="w-12 h-12 object-contain rounded-lg"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {example.result.label}
        </p>
      </div>
    </div>
  );
};
