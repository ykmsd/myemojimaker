export function generateSteps(start: number, end: number, reverse: boolean = false): number[] {
  const steps = [];
  const stepCount = 10; // Total number of frames
  const halfSteps = reverse ? Math.floor(stepCount / 2) : stepCount;
  const increment = (end - start) / (halfSteps - 1);
  
  // Generate forward steps
  for (let i = 0; i < halfSteps; i++) {
    steps.push(start + (increment * i));
  }
  
  // Add reverse steps if needed
  if (reverse) {
    // Remove last step to avoid duplicating the peak value
    const reverseSteps = steps.slice(0, -1).reverse();
    steps.push(...reverseSteps);
    
    // Ensure we have exactly 10 steps
    while (steps.length < stepCount) {
      steps.push(start);
    }
  }
  
  return steps;
}