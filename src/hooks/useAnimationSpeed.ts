import { useState, useEffect } from 'react';
import { AnimationSpeed } from '../types';
import { DEFAULT_SPEED, SPEED_STORAGE_KEY, ANIMATION_SPEEDS } from '../constants';

export const useAnimationSpeed = () => {
  const [speed, setSpeed] = useState<AnimationSpeed>(() => {
    const savedSpeed = localStorage.getItem(SPEED_STORAGE_KEY);
    return (savedSpeed as AnimationSpeed) || DEFAULT_SPEED;
  });

  useEffect(() => {
    localStorage.setItem(SPEED_STORAGE_KEY, speed);
  }, [speed]);

  const interval = ANIMATION_SPEEDS[speed];

  return { speed, setSpeed, interval };
};