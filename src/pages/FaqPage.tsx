import React from 'react';
import { Shield, Globe, Zap, Server, Heart, Cpu } from 'lucide-react';
import { EmojiTips } from '../components/EmojiTips';

interface FaqItem {
  question: string;
  answer: string;
  icon: typeof Shield;
}

export const FaqPage: React.FC = () => {
  const faqs: FaqItem[] = [
    {
      question: "How is my data handled?",
      answer: "All image processing happens directly in your browser. We never upload, store, or transmit your images to any server. Your images remain completely private and are processed using your browser's built-in capabilities. We use privacy-focused Cloudflare Analytics to understand site usage patterns - this collects minimal data and respects your privacy.",
      icon: Shield
    },
    {
      question: "Where are my images stored?",
      answer: "Your images are never stored anywhere! They exist temporarily in your browser's memory while being processed and are automatically cleared when you leave the page or close your browser.",
      icon: Server
    },
    {
      question: "How does the processing work?",
      answer: "We use your browser's Canvas API to process images locally. When you upload an image, it's converted to a canvas element, manipulated according to your chosen effects, and then converted to a GIF - all within your browser.",
      icon: Zap
    },
    {
      question: "Can I use this offline?",
      answer: "Once the page is loaded, all core functionality works offline! Since processing happens in your browser, you don't need an internet connection to create emojis.",
      icon: Globe
    },
    {
      question: "My device is running slowly with this app. What can I do?",
      answer: "Click the performance toggle button in the bottom right corner to switch to 'Low' quality mode. This reduces the number of animation frames and processing quality to improve performance on lower-end devices.",
      icon: Cpu
    }
  ] as const;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
          Frequently Asked Questions
        </h1>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <faq.icon className="w-6 h-6 text-purple-500 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {faq.question}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <EmojiTips />

        <div className="mt-8 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-6 h-6 text-purple-500 dark:text-purple-400" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Attributions
              </h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Manga-style fonts are provided by{' '}
                <a 
                  href="https://dddfont.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  DDD Font
                </a>
              </p>
              <p>
                Manga effects and overlays are sourced from{' '}
                <a 
                  href="https://mangasozai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Manga Sozai
                </a>
              </p>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Privacy First Approach
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We take your privacy seriously. Our emoji maker is designed to work entirely in your browser, ensuring your images and data stay on your device. We use Cloudflare Analytics, a privacy-focused analytics solution that collects minimal, anonymous data to help us improve the service. No personal information is collected or stored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};