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
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#ff00ff',
  '#00ffff',
  '#ff8800',
  '#ff0088',
];

const initConfetti = () => {
  if (confetti.length === 0) {
    confetti = Array.from({ length: 60 }, () => ({
      x: Math.random() * WIDTH,
      y: -Math.random() * HEIGHT,
      width: Math.random() * 8 + 4,
      height: Math.random() * 6 + 3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 2,
    }));
  }
};

export const createConfettiEffect = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | HTMLCanvasElement,
  frameIndex: number
) => {
  initConfetti();

  const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.translate(WIDTH / 2, HEIGHT / 2);
  ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
  ctx.translate(-WIDTH / 2, -HEIGHT / 2);

  confetti.forEach((piece) => {
    piece.y += piece.speedY;
    piece.x += piece.speedX;
    piece.rotation += piece.rotationSpeed;

    if (piece.y > HEIGHT + 10) {
      piece.y = -10;
      piece.x = Math.random() * WIDTH;
    }

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
    ctx.restore();
  });
};
