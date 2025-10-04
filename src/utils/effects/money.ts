import { WIDTH, HEIGHT } from '../../constants';

interface MoneyPiece {
  angle: number;
  distance: number;
  rotation: number;
  rotationSpeed: number;
  speed: number;
  scale: number;
  baseScale: number;
}

let moneyPieces: MoneyPiece[] = [];

const initMoney = () => {
  if (moneyPieces.length === 0) {
    moneyPieces = Array.from({ length: 20 }, (_, idx) => {
      const progress = idx / 20;

      return {
        angle: Math.random() * Math.PI * 2,
        distance: progress * 300,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        speed: Math.random() * 3 + 2,
        baseScale: Math.random() * 0.4 + 0.6,
        scale: 0,
      };
    });
  }
};

export const createMoneyRainEffect = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | HTMLCanvasElement,
  frameIndex: number
) => {
  initMoney();

  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;
  const maxDistance = Math.sqrt(WIDTH * WIDTH + HEIGHT * HEIGHT) / 2;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);

  moneyPieces.forEach((piece) => {
    piece.distance += piece.speed;
    piece.rotation += piece.rotationSpeed;

    const progress = Math.min(1, piece.distance / maxDistance);
    piece.scale = piece.baseScale * (0.3 + progress * 1.2);

    if (piece.distance > maxDistance + 50) {
      piece.angle = Math.random() * Math.PI * 2;
      piece.distance = 0;
      piece.speed = Math.random() * 3 + 2;
      piece.baseScale = Math.random() * 0.4 + 0.6;
    }

    const x = centerX + Math.cos(piece.angle) * piece.distance;
    const y = centerY + Math.sin(piece.angle) * piece.distance;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(piece.rotation);
    ctx.scale(piece.scale, piece.scale);

    ctx.font = '32px Arial';
    ctx.fillText('💸', -16, 16);

    ctx.restore();
  });
};
