import { WIDTH, HEIGHT } from '../../constants';

interface SpaceObject {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  hueRotation: number;
  saturation: number;
  brightness: number;
}

function createSpaceObjects(frameIndex: number): SpaceObject[] {
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
    const opacity = Math.max(0, 1 - progress);

    return {
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance,
      scale,
      opacity,
      hueRotation: (idx / objectCount) * 360,
      saturation: 150 + Math.random() * 50, // Increased saturation
      brightness: 120 + Math.random() * 30, // Increased brightness
    };
  });
}

function drawColorfulBackground(ctx: CanvasRenderingContext2D): void {
  // Create a radial gradient for a cosmic background
  const gradient = ctx.createRadialGradient(
    WIDTH / 2, HEIGHT / 2, 0,
    WIDTH / 2, HEIGHT / 2, WIDTH
  );
  gradient.addColorStop(0, '#1a0033');    // Deep purple center
  gradient.addColorStop(0.5, '#000066');  // Dark blue middle
  gradient.addColorStop(1, '#000033');    // Navy blue edge
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function drawStars(ctx: CanvasRenderingContext2D): void {
  const starCount = 150; // Increased star count
  const colors = ['#fff', '#ffd700', '#ff69b4', '#00ffff', '#ff1493']; // Multiple star colors

  for (let j = 0; j < starCount; j++) {
    const starX = Math.random() * WIDTH;
    const starY = Math.random() * HEIGHT;
    const starSize = Math.random() * 2;
    const twinkle = 0.3 + Math.random() * 0.7; // Random twinkle effect
    
    ctx.save();
    ctx.globalAlpha = twinkle;
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    
    // Add glow effect to stars
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 5;
    
    ctx.beginPath();
    ctx.arc(starX, starY, starSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export function createSpaceTravelEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  frameIndex: number
): void {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Draw colorful background and stars
  drawColorfulBackground(ctx);
  drawStars(ctx);

  // Draw floating objects with enhanced colors
  const objects = createSpaceObjects(frameIndex);
  objects.forEach(({ x, y, scale, opacity, hueRotation, saturation, brightness }) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.globalAlpha = opacity;
    
    // Enhanced color effects
    ctx.filter = `hue-rotate(${hueRotation}deg) saturate(${saturation}%) brightness(${brightness}%)`;
    
    // Add glow effect
    ctx.shadowColor = `hsl(${hueRotation}, 100%, 50%)`;
    ctx.shadowBlur = 10;
    
    ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
    ctx.restore();
  });
}