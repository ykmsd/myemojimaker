import React from 'react';
import { Github, Sparkles, Rocket, ExternalLink, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-purple-500 dark:text-purple-400" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
            The Story Behind My Emoji Maker
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This project was born during an internal hackathon at StackBlitz,
              the company behind bolt.new. As a long-time fan of{' '}
              <a
                href="https://makeemoji.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center"
              >
                makeemoji.com
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
              , I always wanted to expand on their concept and create something
              even more feature-rich. The hackathon provided the perfect
              opportunity to build my dream emoji generator!
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-red-500" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
            Created with Love for Emoji
          </h2>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Built by{' '}
              <a
                href="https://bsky.app/profile/ykmsd.bsky.social"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center"
              >
                @yukamasuda
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
              , who comes from Japan — the birthplace of emoji! With over 20
              years of emoji experience, this project is a celebration of the
              joy and expressiveness that emoji bring to our digital
              conversations.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Rocket className="w-6 h-6 text-purple-500 dark:text-purple-400" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Built with bolt.new
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Powered by StackBlitz's revolutionary development environment,
            enabling rapid prototyping and seamless development experience.
          </p>

          <div className="flex items-center justify-center">
            <a
              href="https://github.com/ykmsd/myemojimaker"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
