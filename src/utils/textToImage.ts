import { FONTS } from '../constants/fonts';

const DEFAULT_FONT = FONTS.find(font => font.value === 'Bungee Shade')?.value || 'Arial';

export const textToImage = (
  text: string,
  textColor: string,
  fontFamily: string = DEFAULT_FONT,
  backgroundColor: string | null = null,
  outlineColor: string | null = null,
  outlineWidth: number = 2,
  width: number = 128,
  height: number = 128,
  padding: number = 20,
  fontSize: number = 90,
  textAlign: CanvasTextAlign = 'center',
  textBaseline: CanvasTextBaseline = 'middle'
): string => {
  // Create canvas at fixed size for animations
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  if (!ctx) return '';

  // Clear canvas
  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.fillRect(0, 0, width, height);

  // Fill background if specified
  if (backgroundColor) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }

  // Set text properties
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Use dynamic font size
  ctx.font = `bold ${fontSize}px "${fontFamily}"`;

  // Measure text to check if it needs scaling
  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;
  const textHeight = fontSize;

  // Calculate available space
  const availableWidth = width - padding * 2;
  const availableHeight = height - padding * 2;

  // Calculate scale if text is too large
  const scaleX = textWidth > availableWidth ? availableWidth / textWidth : 1;
  const scaleY = textHeight > availableHeight ? availableHeight / textHeight : 1;
  const scale = Math.min(scaleX, scaleY);

  // Apply transformations based on alignment
  let xPos = width / 2;
  let yPos = height / 2;

  if (textAlign === 'left') {
    xPos = padding;
  } else if (textAlign === 'right') {
    xPos = width - padding;
  }

  if (textBaseline === 'top') {
    yPos = padding;
  } else if (textBaseline === 'bottom') {
    yPos = height - padding;
  }

  ctx.translate(xPos, yPos);

  // Apply scale if needed
  if (scale < 1) {
    ctx.scale(scale, scale);
  }
  
  // Add outline if specified
  if (outlineColor) {
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = outlineWidth * 2; // Double the width for better visibility
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    
    // Draw stroke multiple times for better visibility
    for (let i = 0; i < 3; i++) {
      ctx.strokeText(text, 0, 0);
    }
  }
  
  // Add main text
  ctx.fillStyle = textColor;
  ctx.fillText(text, 0, 0);
  
  return canvas.toDataURL('image/png');
};