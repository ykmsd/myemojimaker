import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Section } from '../types';
import { useAnimationSpeed } from '../hooks/useAnimationSpeed';
import { Navigation } from '../components/Navigation';
import { ImageEmojiSection } from '../components/ImageEmojiSection';
import { TextEmojiSection } from '../components/TextEmojiSection';
import { MangaEmojiSection } from '../components/MangaEmojiSection';
import { EmojiCombiner } from '../components/EmojiCombiner';
import { Header } from '../components/Header';
import { GifCreationExample } from '../components/GifCreationExample';
import { SkipLink } from '../components/a11y/SkipLink';
import sampleImage from '../images/sample/pistache.png';

export const EmojiMaker: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>(sampleImage);
  const { speed, setSpeed, interval } = useAnimationSpeed();
  
  // Add router hooks for query params
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse section from query params or default to 'image'
  const getSectionFromUrl = (): Section => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    if (section === 'text' || section === 'combine' || section === 'image' || section === 'manga') {
      return section;
    }
    return 'image';
  };
  
  const [activeSection, setActiveSection] = useState<Section>(getSectionFromUrl());
  
  // Update URL when section changes
  const handleSectionChange = useCallback((section: Section) => {
    setActiveSection(section);
    navigate(`/?section=${section}`, { replace: true });
  }, [navigate]);
  
  // Listen for URL changes
  useEffect(() => {
    const section = getSectionFromUrl();
    if (section !== activeSection) {
      setActiveSection(section);
    }
  }, [location.search]);

  return (
    <>
      <SkipLink />
      <div className="container mx-auto px-2 sm:px-4 py-4">
        <Header />
        <main id="main-content">
          <Navigation
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
          {activeSection !== 'combine' && (
            <GifCreationExample activeSection={activeSection} />
          )}

          {activeSection === 'image' ? (
            <ImageEmojiSection
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
              interval={interval}
              selectedSpeed={speed}
              onSpeedChange={setSpeed}
            />
          ) : activeSection === 'text' ? (
            <TextEmojiSection interval={interval} />
          ) : activeSection === 'manga' ? (
            <MangaEmojiSection
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
              interval={interval}
              selectedSpeed={speed}
              onSpeedChange={setSpeed}
            />
          ) : (
            <EmojiCombiner />
          )}
        </main>
      </div>
    </>
  );
};