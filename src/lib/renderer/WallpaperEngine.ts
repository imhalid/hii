import * as THREE from 'three';
import { SDFVectorPass } from './passes/SDFVectorPass';
import { PostProcessPipeline } from './passes/PostProcessPipeline';
import type { WallpaperRenderParams } from './types';

export class WallpaperEngine {
	private canvas: HTMLCanvasElement;
	private renderer: THREE.WebGLRenderer;
	private sdfPass: SDFVectorPass;
	private postPass: PostProcessPipeline;
	private sceneRenderTarget: THREE.WebGLRenderTarget;

	private width: number = 1920;
	private height: number = 1080;
	private isDisposed: boolean = false;
	private animationFrameId: number | null = null;
	private currentParams: WallpaperRenderParams | null = null;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;

		// Initialize High-Precision WebGL/WebGPU Hardware Renderer
		this.renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
			powerPreference: 'high-performance',
			alpha: false,
			preserveDrawingBuffer: true
		});

		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.renderer.setSize(window.innerWidth, window.innerHeight, false);

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		// Offscreen Framebuffer for SDF Vector Pass
		this.sceneRenderTarget = new THREE.WebGLRenderTarget(this.width, this.height, {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBAFormat,
			type: THREE.UnsignedByteType
		});

		// Instantiate Shader Pass Controllers
		this.sdfPass = new SDFVectorPass();
		this.postPass = new PostProcessPipeline();
	}

	public resize(width: number, height: number): void {
		if (this.isDisposed) return;

		this.width = width;
		this.height = height;

		this.renderer.setSize(width, height, false);
		this.sceneRenderTarget.setSize(width, height);

		if (this.currentParams) {
			this.render(this.currentParams);
		}
	}

	public render(params: WallpaperRenderParams): void {
		if (this.isDisposed) return;
		this.currentParams = params;

		// 1. Update SDF Vector Pass Uniforms
		this.sdfPass.updateUniforms(params, this.width, this.height);

		// 2. Render SDF Vector Scene to Offscreen Framebuffer
		this.sdfPass.render(this.renderer, this.sceneRenderTarget);

		// 3. Update Post-Processing Uniforms
		this.postPass.updateUniforms(params, this.width, this.height);

		// 4. Render Post-Processing Pass to Screen Framebuffer
		this.postPass.render(this.renderer, this.sceneRenderTarget.texture);
	}

	public async export4K(targetW: number = 3840, targetH: number = 2160): Promise<Blob | null> {
		if (!this.currentParams) return null;

		const scaleX = targetW / this.width;
		const scaleY = targetH / this.height;

		// Scale parameters proportionally to match screen framing 1:1
		const scaledParams: WallpaperRenderParams = {
			...this.currentParams,
			grid: {
				...this.currentParams.grid,
				size: this.currentParams.grid.size * scaleX,
				lineWidth: this.currentParams.grid.lineWidth * scaleX
			},
			cross: {
				...this.currentParams.cross,
				size: this.currentParams.cross.size * scaleX,
				thickness: this.currentParams.cross.thickness * scaleX
			},
			textBadge: {
				...this.currentParams.textBadge,
				fontSize: this.currentParams.textBadge.fontSize * scaleX,
				borderWidth: this.currentParams.textBadge.borderWidth * scaleX
			},
			gridPan: {
				x: this.currentParams.gridPan.x * scaleX,
				y: this.currentParams.gridPan.y * scaleY
			}
		};

		// 1. Create temporary 4K Render Target
		const target4K = new THREE.WebGLRenderTarget(targetW, targetH, {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBAFormat,
			type: THREE.UnsignedByteType
		});

		const offscreenCanvas = document.createElement('canvas');
		offscreenCanvas.width = targetW;
		offscreenCanvas.height = targetH;

		const offscreenRenderer = new THREE.WebGLRenderer({
			canvas: offscreenCanvas,
			antialias: true,
			powerPreference: 'high-performance',
			alpha: false,
			preserveDrawingBuffer: true
		});

		offscreenRenderer.setSize(targetW, targetH, false);

		// 2. Render 4K SDF Pass with scaled framing
		this.sdfPass.updateUniforms(scaledParams, targetW, targetH);
		this.sdfPass.render(offscreenRenderer, target4K);

		// 3. Render 4K Post-Process Pass directly to offscreen canvas
		this.postPass.updateUniforms(scaledParams, targetW, targetH);
		this.postPass.render(offscreenRenderer, target4K.texture);

		// 4. Extract 4K PNG Blob directly from GPU Framebuffer
		return new Promise((resolve) => {
			offscreenCanvas.toBlob((blob) => {
				offscreenRenderer.dispose();
				target4K.dispose();
				resolve(blob);
			}, 'image/png', 1.0);
		});
	}

	public dispose(): void {
		this.isDisposed = true;
		if (this.animationFrameId !== null) {
			cancelAnimationFrame(this.animationFrameId);
		}
		this.sceneRenderTarget.dispose();
		this.renderer.dispose();
	}
}
