import React, { useState, useCallback } from 'react';
import { Section } from '../types';
import { useAnimationSpeed } from '../hooks/useAnimationSpeed';
import { Navigation } from '../components/Navigation';
import { ImageEmojiSection } from '../components/ImageEmojiSection';
import { TextEmojiSection } from '../components/TextEmojiSection';
import { EmojiCombiner } from '../components/EmojiCombiner';
import { Header } from '../components/Header';
import { GifCreationExample } from '../components/GifCreationExample';
import { SkipLink } from '../components/a11y/SkipLink';
import sampleImage from '../images/sample/pistache.png';

export const EmojiMaker: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>(sampleImage);
  const { speed, setSpeed, interval } = useAnimationSpeed();
  const [activeSection, setActiveSection] = useState<Section>('image');

  const handleSectionChange = useCallback((section: Section) => {
    setActiveSection(section);
  }, []);

  return (
    <>
      <SkipLink />
      <div className="container mx-auto px-4 py-4">
        <Header />
        <main id="main-content">
          <Navigation
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
          <GifCreationExample activeSection={activeSection} />

          {activeSection === 'image' ? (
            <ImageEmojiSection
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
              interval={interval}
              selectedSpeed={speed}
              onSpeedChange={setSpeed}
            />
          ) : (
            <TextEmojiSection interval={interval} />
          ) : (
            <EmojiCombiner />
          )}
        </main>
      </div>
    </>
  );
};