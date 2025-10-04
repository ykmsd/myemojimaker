import { WIDTH, HEIGHT } from '../../constants';
import { calculateAspectRatioFit } from '../transforms/utils';

interface ConfettiPiece {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  speedY: number;
  speedX: number;
}

let confetti: ConfettiPiece[] = [];

const colors = [
  '#F44336', // Red 500
  '#E91E63', // Pink 500
  '#9C27B0', // Purple 500
  '#673AB7', // Deep Purple 500
  '#3F51B5', // Indigo 500
  '#2196F3', // Blue 500
  '#03A9F4', // Light Blue 500
  '#00BCD4', // Cyan 500
  '#009688', // Teal 500
  '#4CAF50', // Green 500
  '#8BC34A', // Light Green 500
  '#CDDC39', // Lime 500
  '#FFEB3B', // Yellow 500
  '#FFC107', // Amber 500
  '#FF9800', // Orange 500
  '#FF5722', // Deep Orange 500
];

const initConfetti = () => {
  if (confetti.length === 0) {
    confetti = Array.from({ length: 150 }, (_, idx) => {
      const progress = idx / 150;
      const totalDistance = HEIGHT + 40;
      const currentPosition = progress * totalDistance;

      return {
        x: Math.random() * WIDTH,
        y: -20 + currentPosition,
        width: Math.random() * 10 + 6,
        height: Math.random() * 8 + 4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 4 + 3,
        speedX: (Math.random() - 0.5) * 2,
      };
    });
  }
};

export const createConfettiEffect = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | HTMLCanvasElement,
  frameIndex: number
) => {
  initConfetti();

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Draw image stretched to full canvas like matrix effect
  ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);

  confetti.forEach((piece) => {
    piece.y += piece.speedY;
    piece.x += piece.speedX;
    piece.rotation += piece.rotationSpeed;

    if (piece.y > HEIGHT + 20) {
      piece.y = -20;
      piece.x = Math.random() * WIDTH;
      piece.speedY = Math.random() * 4 + 3;
      piece.speedX = (Math.random() - 0.5) * 2;
    }

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
    ctx.restore();
  });
};
