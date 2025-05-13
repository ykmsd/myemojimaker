import { AnimatedEffectType } from '../../types/effects';
import { basicTransforms } from './basic';
import { movementTransforms } from './movement';
import { effectTransforms } from './effects';
import { backgroundTransforms } from './backgrounds';

export const transforms: Record<keyof typeof AnimatedEffectType, Function> = {
  ...basicTransforms,
  ...movementTransforms,
  ...effectTransforms,
  ...backgroundTransforms,
};