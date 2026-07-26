import * as THREE from 'three';
import { postProcessVertexShader, postProcessFragmentShader } from '../shaders/postProcessShaders';
import type { WallpaperRenderParams } from '../types';

function hexToVec3(hex: string): THREE.Vector3 {
	if (!hex) return new THREE.Vector3(0, 0, 0);
	let c = hex.replace('#', '');
	if (c.length === 3) c = c.split('').map((x) => x + x).join('');
	const num = parseInt(c, 16);
	if (isNaN(num)) return new THREE.Vector3(0, 0, 0);
	const r = ((num >> 16) & 255) / 255;
	const g = ((num >> 8) & 255) / 255;
	const b = (num & 255) / 255;
	return new THREE.Vector3(r, g, b);
}

function parseBlendMode(blendMode: string): number {
	switch (blendMode) {
		case 'multiply': return 1;
		case 'overlay': return 2;
		case 'normal': return 3;
		case 'difference': return 4;
		case 'soft-light':
		default: return 0;
	}
}

export class PostProcessPipeline {
	private scene: THREE.Scene;
	private camera: THREE.OrthographicCamera;
	private material: THREE.ShaderMaterial;
	private mesh: THREE.Mesh;

	constructor() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

		this.material = new THREE.ShaderMaterial({
			vertexShader: postProcessVertexShader,
			fragmentShader: postProcessFragmentShader,
			uniforms: {
				tDiffuse: { value: null },
				uResolution: { value: new THREE.Vector2(1920, 1080) },
				uGlowShow: { value: false },
				uGlowColor: { value: new THREE.Vector3(1, 0.55, 0) },
				uGlowOpacity: { value: 0.35 },
				uVignetteShow: { value: true },
				uVignetteColor: { value: new THREE.Vector3(0, 0, 0) },
				uVignetteOpacity: { value: 0.25 },
				uVignetteCoverage: { value: 35 },
				uVignetteSoftness: { value: 100 },
				uGodRaysShow: { value: true },
				uGodRaysColor: { value: new THREE.Vector3(0, 0, 0) },
				uGodRaysOpacity: { value: 0.35 },
				uGodRaysBlur: { value: 40 },
				uGodRaysAngle: { value: 65 },
				uGodRaysScale: { value: 150 },
				uGodRaysMaskCoverage: { value: 100 },
				uGodRaysSeed: { value: 1.0 },
				uGodRaysBlendMode: { value: 0 },
				uNoiseShow: { value: true },
				uNoiseOpacity: { value: 0.03 },
				uNoiseFrequency: { value: 0.85 },
				uNoiseSeed: { value: 19.0 }
			},
			depthWrite: false,
			depthTest: false
		});

		const geometry = new THREE.PlaneGeometry(2, 2);
		this.mesh = new THREE.Mesh(geometry, this.material);
		this.scene.add(this.mesh);
	}

	public updateUniforms(params: WallpaperRenderParams, width: number, height: number): void {
		const u = this.material.uniforms;

		u.uResolution.value.set(width, height);

		// Radial Glow
		u.uGlowShow.value = params.effects?.enableRadialGlow || false;
		u.uGlowColor.value.copy(hexToVec3(params.colors.glowColor));
		u.uGlowOpacity.value = params.effects?.glowOpacity || 0.35;

		// Vignette
		u.uVignetteShow.value = params.vignette.show;
		u.uVignetteColor.value.copy(hexToVec3(params.colors.vignetteColor));
		u.uVignetteOpacity.value = params.vignette.opacity;
		u.uVignetteCoverage.value = params.vignette.coverage;
		u.uVignetteSoftness.value = params.vignette.softness;

		// God Rays
		u.uGodRaysShow.value = params.godRays.show;
		u.uGodRaysColor.value.copy(hexToVec3(params.colors.godRaysColor));
		u.uGodRaysOpacity.value = params.godRays.opacity;
		u.uGodRaysBlur.value = params.godRays.blur;
		u.uGodRaysAngle.value = params.godRays.angle;
		u.uGodRaysScale.value = params.godRays.scale;
		u.uGodRaysMaskCoverage.value = params.godRays.maskCoverage;
		u.uGodRaysSeed.value = params.godRays.seed || 1.0;
		u.uGodRaysBlendMode.value = parseBlendMode(params.godRays.blendMode);

		// Noise
		u.uNoiseShow.value = params.noise.show;
		u.uNoiseOpacity.value = params.noise.opacity;
		u.uNoiseFrequency.value = params.noise.frequency;
		u.uNoiseSeed.value = params.noise.seed;
	}

	public render(renderer: THREE.WebGLRenderer, inputTexture: THREE.Texture, outputTarget?: THREE.WebGLRenderTarget): void {
		this.material.uniforms.tDiffuse.value = inputTexture;
		const prevTarget = renderer.getRenderTarget();
		renderer.setRenderTarget(outputTarget || null);
		renderer.render(this.scene, this.camera);
		renderer.setRenderTarget(prevTarget);
	}
}
