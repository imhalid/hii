import * as THREE from 'three';
import { sdfVertexShader, sdfFragmentShader } from '../shaders/sdfShader';
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

function hexToRgba(hex: string, alpha: number): string {
	if (!hex) return `rgba(0, 0, 0, ${alpha})`;
	let c = hex.replace('#', '');
	if (c.length === 3) c = c.split('').map((x) => x + x).join('');
	const num = parseInt(c, 16);
	if (isNaN(num)) return `rgba(0, 0, 0, ${alpha})`;
	const r = (num >> 16) & 255;
	const g = (num >> 8) & 255;
	const b = num & 255;
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export class SDFVectorPass {
	private mesh: THREE.Mesh;
	private material: THREE.ShaderMaterial;
	private scene: THREE.Scene;
	private camera: THREE.OrthographicCamera;

	private badgeCanvas: HTMLCanvasElement;
	private badgeCtx: CanvasRenderingContext2D | null;
	private badgeTexture: THREE.CanvasTexture;

	constructor() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

		this.badgeCanvas = document.createElement('canvas');
		this.badgeCanvas.width = 1920;
		this.badgeCanvas.height = 1080;
		this.badgeCtx = this.badgeCanvas.getContext('2d');
		
		this.badgeTexture = new THREE.CanvasTexture(this.badgeCanvas);
		this.badgeTexture.minFilter = THREE.LinearFilter;
		this.badgeTexture.magFilter = THREE.LinearFilter;
		this.badgeTexture.flipY = false;

		this.material = new THREE.ShaderMaterial({
			vertexShader: sdfVertexShader,
			fragmentShader: sdfFragmentShader,
			uniforms: {
				uResolution: { value: new THREE.Vector2(1920, 1080) },
				uBgColor: { value: new THREE.Vector3(0.12, 0.25, 0.38) },
				uGridColor: { value: new THREE.Vector3(1, 1, 1) },
				uGridOpacity: { value: 0.1 },
				uGridSize: { value: 60 },
				uGridLineWidth: { value: 1 },
				uGridType: { value: 0 },
				uCrossColor: { value: new THREE.Vector3(1, 1, 1) },
				uCrossOpacity: { value: 0.35 },
				uCrossSize: { value: 10 },
				uCrossThickness: { value: 1 },
				uCrossShow: { value: true },
				uGridPan: { value: new THREE.Vector2(0, 0) },
				uBadgeShow: { value: true },
				uBadgeRect: { value: new THREE.Vector4(0, 0, 0, 0) },
				uBadgeTexture: { value: this.badgeTexture }
			},
			depthWrite: false,
			depthTest: false
		});

		const geometry = new THREE.PlaneGeometry(2, 2);
		this.mesh = new THREE.Mesh(geometry, this.material);
		this.scene.add(this.mesh);
	}

	private renderVectorSceneCanvas(params: WallpaperRenderParams, width: number, height: number): void {
		if (!this.badgeCtx || width <= 0 || height <= 0) return;

		if (this.badgeCanvas.width !== width || this.badgeCanvas.height !== height) {
			this.badgeCanvas.width = width;
			this.badgeCanvas.height = height;
		}

		const ctx = this.badgeCtx;
		ctx.clearRect(0, 0, width, height);

		// Badge Dimensions
		const size = params.grid.size || 60;
		const bx = Math.round(params.gridPan.x + params.textBadge.gridX * size);
		const by = Math.round(params.gridPan.y + params.textBadge.gridY * size);
		const bw = Math.round(params.textBadge.spanGridWidth * size);
		const bh = Math.round(params.textBadge.spanGridHeight * size);

		// 1. BURST RAYS & CIRCLES LAYER (Hard Cutout Mask around text badge rect so ZERO lines enter!)
		ctx.save();
		ctx.beginPath();
		ctx.rect(0, 0, width, height);
		if (params.textBadge.show && bw > 0 && bh > 0) {
			ctx.rect(bx, by, bw, bh);
		}
		// Cut out text badge rectangle from canvas so zero lines or circles enter!
		ctx.clip('evenodd');

		// Burst Rays
		const burstColor = params.colors.burstColor;
		const burstOpacity = params.burstBottomLeft?.opacity || 0.35;
		const burstThickness = params.burstBottomLeft?.thickness || 1;

		function drawBursts(rays: any[], originX: number, originY: number) {
			if (!rays) return;
			ctx.save();
			ctx.translate(originX, originY);
			for (const r of rays) {
				ctx.beginPath();
				ctx.moveTo(r.x1, r.y1);
				ctx.lineTo(r.xFar, r.yFar);
				ctx.lineWidth = burstThickness;
				ctx.strokeStyle = hexToRgba(burstColor, burstOpacity);
				if (r.dashArray) {
					const dashes = r.dashArray.split(' ').map((v: string) => parseFloat(v));
					ctx.setLineDash(dashes);
				} else {
					ctx.setLineDash([]);
				}
				ctx.lineCap = 'round';
				ctx.stroke();
			}
			ctx.restore();
		}

		const offsetBL = params.burstBottomLeft?.originOffset || -100;
		drawBursts(params.rays?.bottomLeft || [], offsetBL, height - offsetBL);
		drawBursts(params.rays?.bottomRight || [], width - offsetBL, height - offsetBL);
		drawBursts(params.rays?.topLeft || [], offsetBL, offsetBL);
		drawBursts(params.rays?.topRight || [], width - offsetBL, offsetBL);

		// Geometric Circles
		if (params.circles && params.circles.length > 0) {
			for (const c of params.circles) {
				const cxPx = (c.cxPct / 100) * width + c.offsetX;
				const cyPx = (c.cyPct / 100) * height + c.offsetY;

				ctx.save();
				ctx.translate(cxPx, cyPx);
				ctx.lineWidth = params.randomCircles?.thickness || 1.5;
				ctx.strokeStyle = hexToRgba(params.colors.circlesColor, params.randomCircles?.opacity || 0.35);

				if (c.renderMode === 'dashed' && c.dashArray) {
					const dashes = c.dashArray.split(' ').map((v: string) => parseFloat(v));
					ctx.setLineDash(dashes);
					ctx.beginPath();
					ctx.arc(0, 0, c.r, 0, Math.PI * 2);
					ctx.stroke();
				} else {
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.arc(0, 0, c.r, 0, Math.PI * 2);
					ctx.stroke();
				}
				ctx.restore();
			}
		}

		ctx.restore(); // Restore cutout clip mask

		// 2. SOLID TEXT BADGE RECTANGLE & TYPOGRAPHY
		if (params.textBadge.show && bw > 0 && bh > 0) {
			ctx.save();
			const bgHex = params.colors.badgeBgColor || params.colors.bgColor;
			ctx.fillStyle = bgHex;
			ctx.fillRect(bx, by, bw, bh);

			if (params.textBadge.borderWidth > 0) {
				ctx.lineWidth = params.textBadge.borderWidth;
				ctx.strokeStyle = params.colors.badgeBorderColor;
				ctx.strokeRect(bx, by, bw, bh);
			}

			const textContent = params.textBadge.text || 'Free Computer.';
			const fontSz = params.textBadge.fontSize;
			ctx.fillStyle = params.colors.badgeTextColor;
			ctx.font = `${params.textBadge.fontWeight} ${fontSz}px ${params.textBadge.fontFamily}`;
			ctx.textAlign = params.textBadge.align === 'center' ? 'center' : params.textBadge.align === 'flex-end' ? 'right' : 'left';
			ctx.textBaseline = 'middle';

			const textX = params.textBadge.align === 'center' ? bx + bw / 2 : params.textBadge.align === 'flex-end' ? bx + bw - 16 : bx + 16;
			ctx.fillText(textContent, textX, by + bh / 2);
			ctx.restore();
		}

		this.badgeTexture.needsUpdate = true;
	}

	public updateUniforms(params: WallpaperRenderParams, width: number, height: number): void {
		const u = this.material.uniforms;

		u.uResolution.value.set(width, height);
		u.uBgColor.value.copy(hexToVec3(params.colors.bgColor));
		u.uGridColor.value.copy(hexToVec3(params.colors.gridColor));
		u.uGridOpacity.value = params.grid.show ? params.grid.opacity : 0.0;
		u.uGridSize.value = params.grid.size || 60;
		u.uGridLineWidth.value = params.grid.lineWidth || 1;
		u.uGridType.value = params.grid.type === 'dots' ? 1 : 0;

		u.uCrossColor.value.copy(hexToVec3(params.colors.crossColor));
		u.uCrossOpacity.value = params.cross.show ? params.cross.opacity : 0.0;
		u.uCrossSize.value = params.cross.size || 10;
		u.uCrossThickness.value = params.cross.thickness || 1;
		u.uCrossShow.value = params.cross.show;

		u.uGridPan.value.set(params.gridPan.x, params.gridPan.y);

		this.renderVectorSceneCanvas(params, width, height);

		u.uBadgeShow.value = params.textBadge.show;
		if (params.textBadge.show) {
			const size = params.grid.size || 60;
			const bx = Math.round(params.gridPan.x + params.textBadge.gridX * size);
			const by = Math.round(params.gridPan.y + params.textBadge.gridY * size);
			const bw = Math.round(params.textBadge.spanGridWidth * size);
			const bh = Math.round(params.textBadge.spanGridHeight * size);

			u.uBadgeRect.value.set(bx, by, bw, bh);
		} else {
			u.uBadgeRect.value.set(0, 0, 0, 0);
		}
	}

	public render(renderer: THREE.WebGLRenderer, renderTarget?: THREE.WebGLRenderTarget): void {
		const prevTarget = renderer.getRenderTarget();
		renderer.setRenderTarget(renderTarget || null);
		renderer.render(this.scene, this.camera);
		renderer.setRenderTarget(prevTarget);
	}
}
