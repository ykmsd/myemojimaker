import { WIDTH, HEIGHT } from '../../constants';
import { calculateAspectRatioFit } from '../transforms/utils';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  life: number;
}

let particles: Particle[] = [];

const colors = [
  '#FFD700',
  '#FFA500',
  '#FF69B4',
  '#00CED1',
  '#9370DB',
  '#32CD32',
];

const initParticles = () => {
  if (particles.length === 0) {
    particles = Array.from({ length: 80 }, () => ({
      x: WIDTH / 2,
      y: HEIGHT / 2,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 6,
      speedY: (Math.random() - 0.5) * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      life: 0,
    }));
  }
};

export const createParticleExplosionEffect = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | HTMLCanvasElement,
  frameIndex: number
) => {
  initParticles();

  const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.translate(WIDTH / 2, HEIGHT / 2);
  ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
  ctx.translate(-WIDTH / 2, -HEIGHT / 2);

  particles.forEach((particle) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    particle.life++;
    particle.alpha = Math.max(0, 1 - particle.life / 30);

    if (particle.life > 30) {
      particle.x = WIDTH / 2;
      particle.y = HEIGHT / 2;
      particle.speedX = (Math.random() - 0.5) * 6;
      particle.speedY = (Math.random() - 0.5) * 6;
      particle.life = 0;
      particle.alpha = 1;
    }

    ctx.fillStyle = particle.color;
    ctx.globalAlpha = particle.alpha;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalAlpha = 1;
};
