export const postProcessVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const postProcessFragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D tDiffuse; // Input scene texture
  uniform vec2 uResolution;

  // Radial Glow Uniforms
  uniform bool uGlowShow;
  uniform vec3 uGlowColor;
  uniform float uGlowOpacity;

  // Vignette Uniforms
  uniform bool uVignetteShow;
  uniform vec3 uVignetteColor;
  uniform float uVignetteOpacity;
  uniform float uVignetteCoverage;
  uniform float uVignetteSoftness;

  // Directional Organic Tree Shadow Uniforms
  uniform bool uGodRaysShow;
  uniform vec3 uGodRaysColor;
  uniform float uGodRaysOpacity;
  uniform float uGodRaysBlur;
  uniform float uGodRaysAngle;
  uniform float uGodRaysScale;
  uniform float uGodRaysMaskCoverage;
  uniform float uGodRaysSeed;
  uniform int uGodRaysBlendMode; // 0=soft-light, 1=multiply, 2=overlay, 3=normal, 4=difference

  // Tactile Film Grain Noise Uniforms
  uniform bool uNoiseShow;
  uniform float uNoiseOpacity;
  uniform float uNoiseFrequency;
  uniform float uNoiseSeed;

  // High-Frequency Grain Hash
  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345) + vec2(uNoiseSeed * 17.1, uNoiseSeed * 31.7));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  // 2D Noise for Organic Tree Canopy Shadow
  float noise2d(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // Fractal Brownian Motion (FBM) for soft organic canopy shapes
  float fbmBranches(vec2 p) {
    float val = 0.0;
    float amp = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 4; i++) {
      val += amp * noise2d(p);
      p = rot * p * 2.02 + shift;
      amp *= 0.5;
    }
    return val;
  }

  // Directional Volumetric Tree Shadow Shader with Blur & Seed
  float computeAngledTreeShadow(vec2 uv, float angleDeg, float scale, float maskCov, float blurVal) {
    float rad = radians(angleDeg);
    vec2 rayDir = vec2(cos(rad), sin(rad));
    vec2 perpDir = vec2(-sin(rad), cos(rad));

    // Top-left origin (0, 0)
    vec2 relUv = uv - vec2(0.0, 0.0);

    float proj = dot(relUv, rayDir);   // Light propagation direction
    float perp = dot(relUv, perpDir);  // Perpendicular beam spread

    // Elongated directional shadow beam coordinates offset by seed
    vec2 beamP = vec2(proj * 0.05, perp * (scale * 0.035)) + vec2(uGodRaysSeed * 1.3, uGodRaysSeed * 2.7);

    // Organic FBM noise with blur adjustment
    float fbm = fbmBranches(beamP * 3.0);
    float blurAmount = blurVal * 0.003;
    float organicBeams = smoothstep(clamp(0.25 - blurAmount, 0.05, 0.45), clamp(0.75 + blurAmount, 0.55, 0.95), fbm);

    // Multi-stripe directional shadow beam harmonics with seed offset
    float stripe1 = sin(perp * (scale * 0.12) + uGodRaysSeed * 0.7) * 0.5 + 0.5;
    float stripe2 = sin(perp * (scale * 0.31) + uGodRaysSeed * 2.3) * 0.5 + 0.5;
    float directionalStripes = pow(stripe1 * 0.6 + stripe2 * 0.4, 2.0);

    // Random ray length termination (some rays cut off halfway!)
    float rayLengthNoise = noise2d(vec2(perp * (scale * 0.08), uGodRaysSeed * 0.5));
    float rayMaxLen = 0.35 + 0.75 * rayLengthNoise;
    float lengthFade = smoothstep(rayMaxLen, rayMaxLen * 0.3, proj);

    // Radial origin mask fading smoothly outward from top-left
    float dist = length(relUv);
    float mask = smoothstep((maskCov * 0.01) * 2.2, 0.05, dist);

    return directionalStripes * (0.3 + 0.7 * organicBeams) * lengthFade * mask;
  }

  void main() {
    vec4 baseColor = texture2D(tDiffuse, vUv);
    vec3 color = baseColor.rgb;

    // 1. RADIAL GLOW PASS
    if (uGlowShow && uGlowOpacity > 0.0) {
      vec2 glowCenter = vec2(0.15, 0.15); // Top-left light source
      float glowDist = length(vUv - glowCenter);
      float glowFactor = exp(-glowDist * 2.2) * uGlowOpacity;
      color = color + uGlowColor * glowFactor;
    }

    // 2. DIRECTIONAL ANGLED TREE-BRANCH SHADOW PASS WITH BLEND MODES & BLUR
    if (uGodRaysShow && uGodRaysOpacity > 0.0) {
      float shadowIntensity = computeAngledTreeShadow(vUv, uGodRaysAngle, uGodRaysScale, uGodRaysMaskCoverage, uGodRaysBlur);
      float shadowAlpha = shadowIntensity * uGodRaysOpacity;

      if (uGodRaysBlendMode == 1) { // Multiply
        color = mix(color, color * uGodRaysColor, shadowAlpha);
      } else if (uGodRaysBlendMode == 2) { // Overlay
        vec3 overlayRes = vec3(
          color.r < 0.5 ? (2.0 * color.r * uGodRaysColor.r) : (1.0 - 2.0 * (1.0 - color.r) * (1.0 - uGodRaysColor.r)),
          color.g < 0.5 ? (2.0 * color.g * uGodRaysColor.g) : (1.0 - 2.0 * (1.0 - color.g) * (1.0 - uGodRaysColor.g)),
          color.b < 0.5 ? (2.0 * color.b * uGodRaysColor.b) : (1.0 - 2.0 * (1.0 - color.b) * (1.0 - uGodRaysColor.b))
        );
        color = mix(color, overlayRes, shadowAlpha);
      } else if (uGodRaysBlendMode == 4) { // Difference
        color = mix(color, abs(color - uGodRaysColor), shadowAlpha);
      } else if (uGodRaysBlendMode == 3) { // Normal
        color = mix(color, uGodRaysColor, shadowAlpha);
      } else { // Soft Light (Default)
        vec3 softLightRes = 2.0 * color * uGodRaysColor + color * color * (1.0 - 2.0 * uGodRaysColor);
        color = mix(color, softLightRes, shadowAlpha);
      }
    }

    // 3. CINEMATIC VIGNETTE PASS
    if (uVignetteShow && uVignetteOpacity > 0.0) {
      vec2 distFromCenter = vUv - vec2(0.5);
      float dist = length(distFromCenter) * 1.414;
      float innerR = uVignetteCoverage * 0.01;
      float outerR = innerR + (uVignetteSoftness * 0.01);
      float vignetteAlpha = smoothstep(innerR, outerR, dist) * uVignetteOpacity;
      color = mix(color, uVignetteColor, vignetteAlpha);
    }

    // 4. TACTILE FILM GRAIN NOISE PASS
    if (uNoiseShow && uNoiseOpacity > 0.0) {
      vec2 noiseCoord = vUv * uResolution * (uNoiseFrequency * 0.8);
      float grain = hash(noiseCoord);
      float noiseFactor = (grain - 0.5) * uNoiseOpacity * 1.2;
      color = clamp(color + vec3(noiseFactor), 0.0, 1.0);
    }

    gl_FragColor = vec4(color, 1.0);
  }
`;
