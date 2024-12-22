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
    // Ensure higher minimum opacity
    const opacity = Math.max(0.4, 1 - progress);

    return {
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance,
      scale,
      opacity,
      hueRotation: (idx / objectCount) * 360,
      saturation: 150 + Math.random() * 50,
      brightness: 120 + Math.random() * 30,
    };
  });
}

function drawColorfulBackground(ctx: CanvasRenderingContext2D): void {
  // Use fully opaque colors for the gradient
  const gradient = ctx.createRadialGradient(
    WIDTH / 2, HEIGHT / 2, 0,
    WIDTH / 2, HEIGHT / 2, WIDTH
  );
  gradient.addColorStop(0, '#2a0066');    // Deep purple center
  gradient.addColorStop(0.5, '#000099');  // Dark blue middle
  gradient.addColorStop(1, '#000066');    // Navy blue edge
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function drawStars(ctx: CanvasRenderingContext2D): void {
  const starCount = 150;
  const colors = ['#ffffff', '#ffd700', '#ff69b4', '#00ffff', '#ff1493'];

  for (let j = 0; j < starCount; j++) {
    const starX = Math.random() * WIDTH;
    const starY = Math.random() * HEIGHT;
    const starSize = Math.random() * 2 + 1; // Increased minimum size
    // Ensure higher minimum opacity for stars
    const twinkle = 0.6 + Math.random() * 0.4;
    
    ctx.save();
    ctx.globalAlpha = twinkle;
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    
    // Enhanced glow effect with higher opacity
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 8;
    ctx.shadowOpacity = 0.8;
    
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

  // Draw solid background first
  drawColorfulBackground(ctx);
  drawStars(ctx);

  // Draw floating objects with enhanced colors and solid background
  const objects = createSpaceObjects(frameIndex);
  objects.forEach(({ x, y, scale, opacity, hueRotation, saturation, brightness }) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.globalAlpha = opacity;
    
    // Add solid background behind each image
    const size = Math.max(img.width, img.height) * scale;
    ctx.fillStyle = '#000066'; // Solid background color
    ctx.fillRect(-size/2, -size/2, size, size);
    
    // Enhanced color effects with higher opacity
    ctx.filter = `hue-rotate(${hueRotation}deg) saturate(${saturation}%) brightness(${brightness}%)`;
    
    // Enhanced glow effect with higher opacity
    ctx.shadowColor = `hsla(${hueRotation}, 100%, 50%, 0.8)`;
    ctx.shadowBlur = 15;
    
    ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
    ctx.restore();
  });
}