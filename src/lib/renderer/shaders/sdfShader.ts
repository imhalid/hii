export const sdfVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const sdfFragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform vec3 uBgColor;
  uniform vec3 uGridColor;
  uniform float uGridOpacity;
  uniform float uGridSize;
  uniform float uGridLineWidth;
  uniform int uGridType; // 0 = lines, 1 = dots

  uniform vec3 uCrossColor;
  uniform float uCrossOpacity;
  uniform float uCrossSize;
  uniform float uCrossThickness;
  uniform bool uCrossShow;

  uniform vec2 uGridPan;

  uniform bool uBadgeShow;
  uniform vec4 uBadgeRect; // (x, y, width, height) in pixels
  uniform sampler2D uBadgeTexture; // Full screen vector scene texture

  // Subpixel Anti-Aliasing Helper using Screen Derivatives
  float aaStep(float threshold, float value) {
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.7071067811865475;
    return smoothstep(threshold - afwidth, threshold + afwidth, value);
  }

  // SDF Grid Box Cutout for Badge
  float sdBox(vec2 p, vec2 b) {
    vec2 d = abs(p) - b;
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
  }

  void main() {
    vec2 p = vec2(vUv.x * uResolution.x, (1.0 - vUv.y) * uResolution.y);
    vec2 pPan = p - uGridPan;
    vec3 color = uBgColor;

    // 1. FULL-SCREEN VECTOR LAYER (Circles & Burst Lines clipped outside text badge + Solid Text Badge)
    vec2 screenUv = vec2(vUv.x, 1.0 - vUv.y);
    vec4 sceneTexColor = texture2D(uBadgeTexture, screenUv);
    if (sceneTexColor.a > 0.0) {
      color = mix(color, sceneTexColor.rgb, sceneTexColor.a);
    }

    // Check if pixel is STRICTLY INSIDE the interior of the text badge (1px inside the border)
    bool insideBadgeInterior = false;
    if (uBadgeShow && uBadgeRect.z > 1.0 && uBadgeRect.w > 1.0) {
      vec2 badgeCenter = vec2(uBadgeRect.x + uBadgeRect.z * 0.5, uBadgeRect.y + uBadgeRect.w * 0.5);
      vec2 innerHalf = vec2(uBadgeRect.z * 0.5 - 1.5, uBadgeRect.w * 0.5 - 1.5);
      if (sdBox(p - badgeCenter, innerHalf) <= 0.0) {
        insideBadgeInterior = true;
      }
    }

    // 2. SDF GRID LINES PASS (Masked inside text badge interior)
    if (uGridOpacity > 0.0 && !insideBadgeInterior) {
      vec2 gridCell = mod(pPan, uGridSize);
      float distToLine = min(
        min(gridCell.x, uGridSize - gridCell.x),
        min(gridCell.y, uGridSize - gridCell.y)
      );

      float halfWidth = uGridLineWidth * 0.5;
      float gridLineAlpha = (1.0 - aaStep(halfWidth, distToLine)) * uGridOpacity;
      color = mix(color, uGridColor, gridLineAlpha);
    }

    // 3. SDF CROSS INTERSECTION (+ MARKERS) PASS (Rendered EVERYWHERE across the grid, including inside the text badge!)
    if (uCrossShow && uCrossOpacity > 0.0) {
      vec2 crossCell = mod(pPan + uGridSize * 0.5, uGridSize) - uGridSize * 0.5;

      float halfArm = uCrossSize * 0.5;
      float halfThick = uCrossThickness * 0.5;

      float distH = max(abs(crossCell.x) - halfArm, abs(crossCell.y) - halfThick);
      float distV = max(abs(crossCell.y) - halfArm, abs(crossCell.x) - halfThick);
      float distCross = min(distH, distV);

      float crossAlpha = (1.0 - aaStep(0.0, distCross)) * uCrossOpacity;
      color = mix(color, uCrossColor, crossAlpha);
    }

    gl_FragColor = vec4(color, 1.0);
  }
`;
