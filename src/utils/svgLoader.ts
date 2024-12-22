export async function loadSvgWithColors(
  svgUrl: string,
  primaryColor: string,
  strokeColor: string,
): Promise<string> {
  try {
    const response = await fetch(svgUrl);
    if (!response.ok) {
      throw new Error(`Failed to load SVG: ${response.statusText}`);
    }

    let svgContent = await response.text();

    // Enhanced patterns to catch more color formats
    const colorPatterns = {
      white: /(fill|stroke)=["'](?:#fff(?:fff)?|white|rgb\(255,\s*255,\s*255\))["']/gi,
      black: /(fill|stroke)=["'](?:#000000?|black|rgb\(0,\s*0,\s*0\))["']/gi,
      whiteStyle: /(?:fill|stroke):\s*(?:#fff(?:fff)?|white|rgb\(255,\s*255,\s*255\))/gi,
      blackStyle: /(?:fill|stroke):\s*(?:#000000?|black|rgb\(0,\s*0,\s*0\))/gi
    };

    // Replace colors with more flexible patterns
    svgContent = svgContent
      .replace(colorPatterns.white, (match) => 
        match.includes('fill') ? `fill="${primaryColor}"` : `stroke="${primaryColor}"`)
      .replace(colorPatterns.black, (match) => 
        match.includes('fill') ? `fill="${strokeColor}"` : `stroke="${strokeColor}"`)
      .replace(colorPatterns.whiteStyle, (match) => 
        match.startsWith('fill') ? `fill:${primaryColor}` : `stroke:${primaryColor}`)
      .replace(colorPatterns.blackStyle, (match) => 
        match.startsWith('fill') ? `fill:${strokeColor}` : `stroke:${strokeColor}`);

    // Convert SVG to data URL
    return `data:image/svg+xml;base64,${btoa(
      unescape(encodeURIComponent(svgContent))
    )}`;
  } catch (error) {
    console.error('Error loading SVG:', error);
    throw error;
  }
}
