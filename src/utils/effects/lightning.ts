import { WIDTH, HEIGHT, CONTRAST } from '../../constants';
import { calculateAspectRatioFit } from '../transforms/utils';
import { contrastFilter } from '../filters';

interface LightningBolt {
  points: { x: number; y: number }[];
  life: number;
  maxLife: number;
}

let bolts: LightningBolt[] = [];

const createBolt = (): LightningBolt => {
  const segments = 8;
  const points: { x: number; y: number }[] = [];
  const startX = Math.random() * WIDTH;

  points.push({ x: startX, y: 0 });

  for (let i = 1; i <= segments; i++) {
    const prevPoint = points[i - 1];
    points.push({
      x: prevPoint.x + (Math.random() - 0.5) * 40,
      y: (HEIGHT / segments) * i,
    });
  }

  return {
    points,
    life: 0,
    maxLife: 3,
  };
};

export const createLightningEffect = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | HTMLCanvasElement,
  frameIndex: number
) => {
  const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = 'rgba(20, 20, 40, 0.3)';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.translate(WIDTH / 2, HEIGHT / 2);
  ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
  ctx.translate(-WIDTH / 2, -HEIGHT / 2);

  if (frameIndex % 5 === 0 && Math.random() > 0.6) {
    bolts.push(createBolt());
  }

  bolts = bolts.filter((bolt) => {
    bolt.life++;
    return bolt.life < bolt.maxLife;
  });

  bolts.forEach((bolt) => {
    const opacity = 1 - bolt.life / bolt.maxLife;

    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(bolt.points[0].x, bolt.points[0].y);
    for (let i = 1; i < bolt.points.length; i++) {
      ctx.lineTo(bolt.points[i].x, bolt.points[i].y);
    }
    ctx.stroke();

    ctx.strokeStyle = `rgba(200, 220, 255, ${opacity * 0.6})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.shadowBlur = 0;
  });

  contrastFilter(ctx, CONTRAST);
};
