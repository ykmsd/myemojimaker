import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatedEffectType, StaticEffectType } from '../types/effects';
import { useFilterVisibility } from '../hooks/useFilterVisibility';
import { FilterToggle } from './FilterToggle';
import { ShowAllFiltersButton } from './ShowAllFiltersButton';
import { getCustomGifFrames } from '../utils/gif/customFilter';
import { LoadingSpinner } from './a11y/LoadingSpinner';
import { usePerformance } from '../contexts/PerformanceContext';

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
  const { performanceMode } = usePerformance();
  
  // For low performance mode, show fewer effects
  const [visibleEffectsCount, setVisibleEffectsCount] = useState<number>(
    performanceMode === 'low' ? 8 : 
    performanceMode === 'medium' ? 16 : 
    100 // Show all in high mode
  );

  useEffect(() => {
    const checkCustomGif = () => {
      const frames = getCustomGifFrames();
      setHasCustomGif(Boolean(frames));
    };

    checkCustomGif();
    const checkInterval = setInterval(checkCustomGif, 500);
    return () => clearInterval(checkInterval);
  }, []);

  useEffect(() => {
    // Update visible effects count when performance mode changes
    setVisibleEffectsCount(
      performanceMode === 'low' ? 8 : 
      performanceMode === 'medium' ? 16 : 
      100
    );
  }, [performanceMode]);

  const animatedEffects = Object.values(AnimatedEffectType).filter(effect => 
    effect !== AnimatedEffectType.CUSTOM_GIF || hasCustomGif
  );

  const effectSections = showStatic ? [
    {
      title: 'Static Effects',
      subtitle: 'Overlays & Text',
      effects: Object.values(StaticEffectType).slice(0, visibleEffectsCount),
    },
    {
      title: 'Animated Effects',
      subtitle: 'Movement & Color',
      effects: animatedEffects.slice(0, visibleEffectsCount),
    },
  ] : [
    {
      title: 'Animated Effects',
      subtitle: 'Movement & Color',
      effects: animatedEffects.slice(0, visibleEffectsCount),
    }
  ];

  // Show a "Load More" button for low and medium performance modes
  const handleLoadMore = () => {
    setVisibleEffectsCount(prev => prev + 8);
  };

  const showLoadMoreButton = (
    (performanceMode === 'low' || performanceMode === 'medium') && 
    (visibleEffectsCount < Object.values(AnimatedEffectType).length)
  );

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

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center">
            {effects.map((type) => {
              const isVisible = isFilterVisible(type);
              if (!isVisible) return null;

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
          
          {/* Load More Button */}
          {title === 'Animated Effects' && showLoadMoreButton && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Load More Effects
              </button>
            </div>
          )}
        </div>
      ))}
      
      {performanceMode === 'low' && (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 p-4 rounded-lg text-sm text-yellow-800 dark:text-yellow-200">
          <p className="text-center">
            <strong>Performance Mode:</strong> Using low-quality mode to improve performance. 
            <br />Enable higher quality in the performance toggle if your device can handle it.
          </p>
        </div>
      )}
    </div>
  );
};