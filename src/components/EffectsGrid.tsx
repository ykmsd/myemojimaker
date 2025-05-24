import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatedEffectType, StaticEffectType } from '../types/effects';
import { useFilterVisibility } from '../hooks/useFilterVisibility';
import { FilterToggle } from './FilterToggle';
import { ShowAllFiltersButton } from './ShowAllFiltersButton';
import { getCustomGifFrames } from '../utils/gif/customFilter';
import { LoadingSpinner } from './a11y/LoadingSpinner';

// Lazy load the heavy components
const EmojiPanel = lazy(() => import('./EmojiPanel'));
const StaticEmojiPanel = lazy(() => import('./StaticEmojiPanel'));

interface EffectsGridProps extends React.PropsWithChildren {
  img: string;
  interval: number;
  primaryColor?: string;
  strokeColor?: string;
  updateKey?: number;
  showStatic?: boolean;
}

export const EffectsGrid: React.FC<EffectsGridProps> = ({ 
  img, 
  interval,
  primaryColor = '#000000',
  strokeColor = '#000000',
  updateKey = 0,
  showStatic = true 
}) => {
  const { isFilterVisible, toggleFilter, showAllFilters, hiddenCount } = useFilterVisibility();
  const [hasCustomGif, setHasCustomGif] = useState(false);
  const [visibleEffects, setVisibleEffects] = useState<string[]>([]);

  useEffect(() => {
    const checkCustomGif = () => {
      const frames = getCustomGifFrames();
      setHasCustomGif(Boolean(frames));
    };

    checkCustomGif();
    const checkInterval = setInterval(checkCustomGif, 1000); // Reduced from 500ms to 1000ms
    return () => clearInterval(checkInterval);
  }, []);

  // Get all animated effects that should be available
  const animatedEffects = Object.values(AnimatedEffectType).filter(effect => 
    effect !== AnimatedEffectType.CUSTOM_GIF || hasCustomGif
  );

  const effectSections = showStatic ? [
    {
      title: 'Static Effects',
      subtitle: 'Overlays & Text',
      effects: Object.values(StaticEffectType),
    },
    {
      title: 'Animated Effects',
      subtitle: 'Movement & Color',
      effects: animatedEffects,
    },
  ] : [
    {
      title: 'Animated Effects',
      subtitle: 'Movement & Color',
      effects: animatedEffects,
    }
  ];

  // Implement a virtualized rendering approach - only render effects that are likely to be visible
  useEffect(() => {
    // Initially show only the first few effects
    const initialVisible = effectSections.flatMap(section => 
      section.effects.slice(0, 12)
    );
    setVisibleEffects(initialVisible);

    // After a short delay, load the rest of the effects
    const timer = setTimeout(() => {
      setVisibleEffects(effectSections.flatMap(section => section.effects));
    }, 1000);

    return () => clearTimeout(timer);
  }, [animatedEffects.length]);

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex justify-end">
        <ShowAllFiltersButton onShowAll={showAllFilters} hiddenCount={hiddenCount} />
      </div>

      {effectSections.map(({ title, subtitle, effects }) => (
        <div key={title}>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent flex-grow" />
            <div className="text-center px-4">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 font-mono">
                {title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent flex-grow" />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center">
            {effects.map((type) => {
              const isVisible = isFilterVisible(type);
              const shouldRender = visibleEffects.includes(type);
              
              if (!isVisible || !shouldRender) return null;

              return (
                <div key={type} className="relative">
                  <Suspense fallback={<LoadingSpinner />}>
                    {title === 'Static Effects' ? (
                      <StaticEmojiPanel
                        img={img}
                        primaryColor={primaryColor}
                        strokeColor={strokeColor}
                        updateKey={updateKey}
                        transformation={type}
                        name={type.toLowerCase()}
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
          </div>
        </div>
      ))}
    </div>
  );
};