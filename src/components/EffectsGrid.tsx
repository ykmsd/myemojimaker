import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatedEffectType, StaticEffectType, OverlayAnimationType } from '../types/effects';
import { useFilterVisibility } from '../hooks/useFilterVisibility';
import { FilterToggle } from './FilterToggle';
import { ShowAllFiltersButton } from './ShowAllFiltersButton';
import { getCustomGifFrames, onCustomGifChange } from '../utils/gif/state';
import { LoadingSpinner } from './a11y/LoadingSpinner';
import { GifUploadCard } from './GifUploadCard';

const EmojiPanel = lazy(() => import('./EmojiPanel'));
const StaticEmojiPanel = lazy(() => import('./StaticEmojiPanel'));

interface EffectsGridProps extends React.PropsWithChildren {
  img: string;
  interval: number;
  primaryColor?: string;
  strokeColor?: string;
  updateKey?: number;
  showStatic?: boolean;
  showUploadCard?: boolean;
  overlayScale?: number;
  overlayX?: number;
  overlayY?: number;
  overlayAnimation?: OverlayAnimationType;
  overlayCount?: number;
  backgroundColor?: string;
}

export const EffectsGrid: React.FC<EffectsGridProps> = ({
  img,
  interval,
  primaryColor = '#000000',
  strokeColor = '#000000',
  updateKey = 0,
  showStatic = true,
  showUploadCard = false,
  overlayScale = 100,
  overlayX = 0,
  overlayY = 0,
  overlayAnimation = 'none',
  overlayCount = 1,
  backgroundColor
}) => {
  const { isFilterVisible, toggleFilter, showAllFilters, hiddenCount } = useFilterVisibility();
  const [hasCustomGif, setHasCustomGif] = useState(false);

  useEffect(() => {
    const checkCustomGif = () => {
      const frames = getCustomGifFrames();
      const hasFrames = Boolean(frames);
      console.log('EffectsGrid: checking custom GIF frames:', hasFrames, frames?.length);
      setHasCustomGif(hasFrames);
    };

    checkCustomGif();
    const unsubscribe = onCustomGifChange(checkCustomGif);
    return () => unsubscribe();
  }, []);

  const animatedEffects = Object.values(AnimatedEffectType).filter(effect => 
    effect !== AnimatedEffectType.CUSTOM_GIF || hasCustomGif
  );

  const effectSections = showStatic ? [
    {
      title: '',
      subtitle: '',
      effects: Object.values(StaticEffectType),
    },
  ] : [
    {
      title: '',
      subtitle: '',
      effects: animatedEffects,
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex justify-end">
        <ShowAllFiltersButton onShowAll={showAllFilters} hiddenCount={hiddenCount} />
      </div>

      {effectSections.map(({ title, subtitle, effects }, index) => (
        <div key={index}>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center">
            {effects.map((type) => {
              const isVisible = isFilterVisible(type);
              if (!isVisible) return null;

              return (
                <div key={type} className="relative">
                  <Suspense fallback={<LoadingSpinner />}>
                    {showStatic ? (
                      <StaticEmojiPanel
                        img={img}
                        primaryColor={primaryColor}
                        strokeColor={strokeColor}
                        updateKey={updateKey}
                        transformation={type}
                        name={type.toLowerCase()}
                        overlayScale={overlayScale}
                        overlayX={overlayX}
                        overlayY={overlayY}
                        overlayAnimation={overlayAnimation}
                        overlayCount={overlayCount}
                        backgroundColor={backgroundColor}
                        animationSpeed={interval}
                      />
                    ) : (
                      <EmojiPanel
                        img={img}
                        transformation={type}
                        name={type.toLowerCase()}
                        interval={interval}
                      />
                    )}
                  </Suspense>
                  <FilterToggle
                    isVisible={isVisible}
                    onToggle={() => toggleFilter(type)}
                  />
                </div>
              );
            })}

            {!showStatic && showUploadCard && (
              <GifUploadCard currentImage={img} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};