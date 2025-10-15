export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  // Function to create a single wave shape with sway in X and Y
  float wave(float x, float centerX, float amplitudeX, float amplitudeY, float frequency, float phase, float yPos, float swayHeight) {
    float distX = abs(x - centerX);

    if (distX > 0.15) return 0.0;

    // Base wave shape horizontally
    float baseY = 0.5 + amplitudeY * sin(frequency * 3.14159 * distX);

    // Calculate sway offsets for x and y independently
    float swayX = 0.0;
    float swayY = 0.0;

    if (yPos > 1.0 - swayHeight) {
      float swayFactor = (yPos - (1.0 - swayHeight)) / swayHeight;

      // Horizontal sway oscillates with cosine
      swayX = amplitudeX * swayFactor * cos(uTime + phase * 1.7);

      // Vertical sway oscillates with sine
      swayY = amplitudeY * swayFactor * sin(uTime + phase);
    }

    // Adjust distance on x-axis by horizontal sway (simulate horizontal movement)
    float distXWithSway = abs(x - (centerX + swayX));

    // Wave vertical threshold adjusted with vertical sway
    float waveY = 0.5 + amplitudeY * sin(frequency * 3.14159 * distXWithSway) + swayY;

    // Smooth wave band: sharpness of the edge can be tweaked here
    return smoothstep(waveY - 0.05, waveY, yPos) - smoothstep(waveY, waveY + 0.05, yPos);
  }

  void main() {
    vec3 color;

    // Gradient stops:
    // 0.0 - 0.25: blue to yellow
    if (vUv.y < 0.25) {
      float t = smoothstep(0.0, 0.25, vUv.y);
      vec3 blue = vec3(0.0, 0.3, 0.6);
      vec3 yellow = vec3(1.0, 0.9, 0.3);
      color = mix(blue, yellow, t);
    } 
    // 0.25 - 0.6: yellow to orange
    else if (vUv.y < 0.6) {
      float t = smoothstep(0.25, 0.6, vUv.y);
      vec3 yellow = vec3(1.0, 0.9, 0.3);
      vec3 orange = vec3(1.0, 0.5, 0.0);
      color = mix(yellow, orange, t);
    } 
    // 0.6 - 1.0: orange to red
    else {
      float t = smoothstep(0.6, 1.0, vUv.y);
      vec3 orange = vec3(1.0, 0.5, 0.0);
      vec3 red = vec3(0.8, 0.0, 0.0);
      color = mix(orange, red, t);
    }

    // Top 40% waves effect (vUv.y > 0.6)
    if (vUv.y > 0.6) {
      float yNorm = (vUv.y - 0.6) / 0.4;

      // Three waves with different parameters (centerX, sway amplitudes, frequency, phase)
      float w1 = wave(vUv.x, 0.25, 0.015, 0.15, 1.0, 0.0, yNorm, 0.3);
      float w2 = wave(vUv.x, 0.5, 0.02, 0.2, 1.2, 1.5, yNorm, 0.3);
      float w3 = wave(vUv.x, 0.75, 0.01, 0.1, 0.8, 3.0, yNorm, 0.3);

      float wavesCombined = max(max(w1, w2), w3);

      vec3 waveColor = vec3(1.0, 0.8, 0.2); // bright yellow/orange-ish for waves

      color = mix(color, waveColor, wavesCombined);
    }

    gl_FragColor = vec4(color, 1.0);
  }
`;
