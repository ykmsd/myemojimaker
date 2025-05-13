import { WIDTH, HEIGHT } from '../../constants';

interface SpaceObject {
  x: number;
  y: number;
  scale: number;
  opacity: number;
}

export function createSpaceObjects(frameIndex: number): SpaceObject[] {
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;
  const objectCount = 30;
  const maxRadius = 400;
  const baseScale = 0.1;
  const maxScale = 1.5;

  return Array.from({ length: objectCount }, (_, idx) => {
    const progress = (frameIndex / 50 + idx / objectCount) % 1;
    const angle = Math.PI * 2 * Math.random();
    const distance = progress * maxRadius;
    const scale = baseScale + progress * (maxScale - baseScale);
    const opacity = Math.max(0.9, 1 - progress);

    return {
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance,
      scale,
      opacity
    };
  });
}