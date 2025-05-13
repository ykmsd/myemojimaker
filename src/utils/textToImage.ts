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
  padding: number = 20
): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  
  if (!ctx) return '';
  
  // Calculate effective dimensions accounting for padding
  const effectiveWidth = width - (padding * 2);
  const effectiveHeight = height - (padding * 2);

  // Clear canvas
  // Fill with transparent background first
  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.fillRect(0, 0, width, height);
  
  // Fill background if specified
  if (backgroundColor) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }
  
  // Set text properties
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.font = `bold 48px "${fontFamily}"`;

  // Measure text and calculate scale
  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;
  const scale = Math.min(1, effectiveWidth / textWidth);
  
  // Apply transformations
  ctx.translate(width / 2, height / 2);
  ctx.scale(scale, scale);
  
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