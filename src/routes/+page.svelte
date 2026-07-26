<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { createDialKitController } from 'dialkit/svelte';
	import { WallpaperEngine } from '$lib/renderer/WallpaperEngine';
	import type { WallpaperRenderParams } from '$lib/renderer/types';

	let canvasRef = $state<HTMLCanvasElement | null>(null);
	let wallpaperEngine = $state<WallpaperEngine | null>(null);
	let isExporting = $state(false);

	const dial = createDialKitController(
		'Wallpaper Dials',
		{
			// 🎨 MASTER COLOR PALETTE
			colors: {
				_collapsed: false,
				bgColor: '#1f3f60',
				gridColor: '#ffffff',
				crossColor: '#ffffff',
				badgeBgColor: '#1f3f60',
				badgeTextColor: '#ffffff',
				badgeBorderColor: '#ffffff',
				vignetteColor: '#000000',
				burstColor: '#ffffff',
				circlesColor: '#ffffff',
				godRaysColor: '#000000',
				glowColor: '#FF8C00'
			},

			// Grid Controls
			grid: {
				_collapsed: true,
				show: true,
				size: [60, 10, 300, 5],
				lineWidth: [1, 0.5, 10, 0.5],
				opacity: [0.1, 0, 1, 0.05],
				type: {
					type: 'select',
					options: [
						{ value: 'lines', label: 'Grid Lines' },
						{ value: 'dots', label: 'Dots' }
					],
					default: 'lines'
				}
			},

			// Intersection Cross (+) Markers
			cross: {
				_collapsed: true,
				show: true,
				opacity: [0.35, 0, 1, 0.05],
				size: [10, 4, 60, 2],
				thickness: [1, 1, 8, 1]
			},

			// Typographic Grid-Snapped Text Badge ("Free Computer.")
			textBadge: {
				_collapsed: true,
				show: true,
				text: 'Free Computer.',
				opacity: [1, 0, 1, 0.05],
				gridX: [14, -200, 200, 1],
				gridY: [7, -200, 200, 1],
				spanGridWidth: [6, 1, 30, 1],
				spanGridHeight: [2, 1, 30, 1],
				fontSize: [29, 10, 72, 1],
				fontWeight: {
					type: 'select',
					options: [
						{ value: '400', label: 'Regular (400)' },
						{ value: '500', label: 'Medium (500)' },
						{ value: '700', label: 'Bold (700)' },
						{ value: '900', label: 'Black (900)' }
					],
					default: '400'
				},
				fontFamily: {
					type: 'select',
					options: [
						{ value: 'Georgia, serif', label: 'Georgia (Editorial Serif)' },
						{ value: "'Space Grotesk', sans-serif", label: 'Space Grotesk (Swiss Tech)' },
						{ value: "'Inter', sans-serif", label: 'Inter (Clean Sans)' },
						{ value: "'JetBrains Mono', monospace", label: 'JetBrains Mono (Code/Mono)' }
					],
					default: 'Georgia, serif'
				},
				align: {
					type: 'select',
					options: [
						{ value: 'center', label: 'Center' },
						{ value: 'flex-start', label: 'Left / Top' },
						{ value: 'flex-end', label: 'Right / Bottom' }
					],
					default: 'center'
				},
				borderWidth: [0, 0, 10, 1]
			},

			// Dedicated Cinematic Vignette Effect
			vignette: {
				_collapsed: true,
				show: true,
				opacity: [0.25, 0, 1, 0.05],
				coverage: [35, 10, 90, 5],
				softness: [100, 10, 100, 5],
				blendMode: {
					type: 'select',
					options: [
						{ value: 'multiply', label: 'Multiply' },
						{ value: 'normal', label: 'Normal' },
						{ value: 'overlay', label: 'Overlay' },
						{ value: 'darken', label: 'Darken' }
					],
					default: 'multiply'
				}
			},

			// 1. Bottom-Left Vector Burst Lines
			burstBottomLeft: {
				_collapsed: true,
				show: true,
				opacity: [0.35, 0, 1, 0.05],
				count: [4, 0, 100, 1],
				thickness: [1, 0.5, 10, 0.5],
				seed: [1, 0, 100, 1],
				originOffset: [-100, -300, 300, 5],
				styleType: {
					type: 'select',
					options: [
						{ value: 'mix', label: 'Mix (Dashed + Solid)' },
						{ value: 'dashed', label: 'Dashed Only' },
						{ value: 'solid', label: 'Solid Only' }
					],
					default: 'mix'
				},
				dashLength: [10, 2, 40, 2]
			},

			// 2. Bottom-Right Vector Burst Lines
			burstBottomRight: {
				_collapsed: true,
				show: false,
				opacity: [0.35, 0, 1, 0.05],
				count: [4, 0, 100, 1],
				thickness: [1, 0.5, 10, 0.5],
				seed: [2, 0, 100, 1],
				originOffset: [-100, -300, 300, 5],
				styleType: {
					type: 'select',
					options: [
						{ value: 'mix', label: 'Mix (Dashed + Solid)' },
						{ value: 'dashed', label: 'Dashed Only' },
						{ value: 'solid', label: 'Solid Only' }
					],
					default: 'mix'
				},
				dashLength: [10, 2, 40, 2]
			},

			// 3. Top-Left Vector Burst Lines
			burstTopLeft: {
				_collapsed: true,
				show: false,
				opacity: [0.35, 0, 1, 0.05],
				count: [4, 0, 100, 1],
				thickness: [1, 0.5, 10, 0.5],
				seed: [3, 0, 100, 1],
				originOffset: [-100, -300, 300, 5],
				styleType: {
					type: 'select',
					options: [
						{ value: 'mix', label: 'Mix (Dashed + Solid)' },
						{ value: 'dashed', label: 'Dashed Only' },
						{ value: 'solid', label: 'Solid Only' }
					],
					default: 'mix'
				},
				dashLength: [10, 2, 40, 2]
			},

			// 4. Top-Right Vector Burst Lines
			burstTopRight: {
				_collapsed: true,
				show: false,
				opacity: [0.35, 0, 1, 0.05],
				count: [3, 0, 100, 1],
				thickness: [1, 0.5, 10, 0.5],
				seed: [45, 0, 100, 1],
				originOffset: [-100, -300, 300, 5],
				styleType: {
					type: 'select',
					options: [
						{ value: 'mix', label: 'Mix (Dashed + Solid)' },
						{ value: 'dashed', label: 'Dashed Only' },
						{ value: 'solid', label: 'Solid Only' }
					],
					default: 'mix'
				},
				dashLength: [10, 2, 40, 2]
			},

			// Random Geometric Circles Layer
			randomCircles: {
				_collapsed: true,
				show: true,
				opacity: [0.35, 0, 1, 0.05],
				count: [6, 0, 50, 1],
				minRadius: [25, 5, 200, 5],
				maxRadius: [160, 20, 500, 10],
				thickness: [1.5, 0.5, 10, 0.5],
				seed: [35, 0, 100, 1],
				styleType: {
					type: 'select',
					options: [
						{ value: 'mix', label: 'Mix (Natural Blend & Rare Hybrid Arcs)' },
						{ value: 'dashed', label: 'Dashed Only' },
						{ value: 'solid', label: 'Solid Only' }
					],
					default: 'mix'
				},
				dashLength: [10, 2, 40, 2]
			},

			// Organic Volumetric Shadow Rays
			godRays: {
				_collapsed: true,
				show: true,
				opacity: [0.35, 0, 1, 0.05],
				blur: [40, 0, 100, 5],
				angle: [65, 0, 180, 5],
				scale: [150, 50, 500, 10],
				maskCoverage: [100, 20, 100, 5],
				seed: [1, 0, 100, 1],
				blendMode: {
					type: 'select',
					options: [
						{ value: 'soft-light', label: 'Soft Light' },
						{ value: 'multiply', label: 'Multiply' },
						{ value: 'overlay', label: 'Overlay' },
						{ value: 'normal', label: 'Normal' },
						{ value: 'difference', label: 'Difference' }
					],
					default: 'soft-light'
				}
			},

			// Topmost SVG Film Grain / Noise Overlay
			noise: {
				_collapsed: true,
				show: true,
				type: {
					type: 'select',
					options: [
						{ value: 'turbulence', label: 'Turbulence Swirl' },
						{ value: 'fractalNoise', label: 'Fractal Grain' }
					],
					default: 'turbulence'
				},
				monochrome: false,
				frequency: [0.85, 0.05, 2.5, 0.05],
				octaves: [2, 1, 6, 1],
				seed: [19, 0, 50, 1],
				opacity: [0.03, 0, 1, 0.01],
				invert: false,
				blendMode: {
					type: 'select',
					options: [
						{ value: 'color-dodge', label: 'Color Dodge' },
						{ value: 'overlay', label: 'Overlay' },
						{ value: 'soft-light', label: 'Soft Light' },
						{ value: 'hard-light', label: 'Hard Light' },
						{ value: 'screen', label: 'Screen' },
						{ value: 'multiply', label: 'Multiply' },
						{ value: 'difference', label: 'Difference' },
						{ value: 'normal', label: 'Normal' }
					],
					default: 'color-dodge'
				}
			},

			// Lighting & Glow Effects
			effects: {
				_collapsed: true,
				enableRadialGlow: false,
				glowOpacity: [0.35, 0, 1, 0.05]
			},

			// 📸 Export 4K PNG Action Button (WebGPU / WebGL SDF GPU Engine)
			exportAction: {
				type: 'action',
				label: '📸 Export 4K PNG (WebGPU / WebGL SDF Engine)'
			},

			// Reset Action Button
			resetAction: {
				type: 'action',
				label: '🔄 Reset to Defaults'
			}
		},
		{
			id: 'wallpaper-dialkit-config-v69',
			persist: true,
			onAction: (action) => {
				if (action === 'exportAction') {
					export4KGPUWallpaper();
				} else if (action === 'resetAction') {
					gridPan = { x: 0, y: 0 };
					circleOverrides = {};
					burstLineOverrides = {
						burstBottomLeft: {},
						burstBottomRight: {},
						burstTopLeft: {},
						burstTopRight: {}
					};
					dial.resetValues();
					if (typeof localStorage !== 'undefined') {
						localStorage.clear();
					}
					if (typeof window !== 'undefined') {
						window.location.reload();
					}
				}
			}
		}
	);

	const params = $derived(dial.values);

	// Synchronize badgeBgColor with bgColor dynamically when bgColor changes
	$effect(() => {
		const bg = params.colors.bgColor;
		if (bg && bg !== lastBgColor) {
			lastBgColor = bg;
			dial.setValue('colors.badgeBgColor', bg);
		}
	});
	let lastBgColor = params.colors.bgColor;

	// Infinite Canvas Pan Offset State
	let gridPan = $state({ x: 0, y: 0 });

	// Circle Overrides Map
	let circleOverrides = $state<Record<number, { offsetX: number; offsetY: number; rDelta: number }>>({});

	// Burst Line Overrides Map
	let burstLineOverrides = $state<Record<string, Record<number, { originX: number; originY: number; targetX: number; targetY: number }>>>({
		burstBottomLeft: {},
		burstBottomRight: {},
		burstTopLeft: {},
		burstTopRight: {}
	});

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

	function describeArc(cx: number, cy: number, r: number, startAngleDeg: number, endAngleDeg: number) {
		const a1 = (startAngleDeg * Math.PI) / 180;
		const a2 = (endAngleDeg * Math.PI) / 180;
		const x1 = cx + r * Math.cos(a1);
		const y1 = cy + r * Math.sin(a1);
		const x2 = cx + r * Math.cos(a2);
		const y2 = cy + r * Math.sin(a2);
		const angleDiff = (endAngleDeg - startAngleDeg + 360) % 360;
		const largeArcFlag = angleDiff > 180 ? 1 : 0;
		return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
	}

	// Initialize WebGPU / WebGL WallpaperEngine on Mount
	onMount(() => {
		if (canvasRef) {
			wallpaperEngine = new WallpaperEngine(canvasRef);
			const handleResize = () => {
				wallpaperEngine?.resize(window.innerWidth, window.innerHeight);
			};
			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
				wallpaperEngine?.dispose();
			};
		}
	});

	// Synchronize GPU WallpaperEngine render loop whenever DialKit values or grid pan changes
	$effect(() => {
		if (wallpaperEngine) {
			const renderParams: WallpaperRenderParams = {
				colors: params.colors,
				grid: params.grid,
				cross: params.cross,
				textBadge: params.textBadge,
				vignette: params.vignette,
				godRays: params.godRays,
				noise: params.noise,
				effects: params.effects,
				circles: circleList,
				rays: {
					bottomLeft: rayBottomLeft,
					bottomRight: rayBottomRight,
					topLeft: rayTopLeft,
					topRight: rayTopRight
				},
				gridPan
			};

			wallpaperEngine.render(renderParams);
		}
	});

	// Export 4K PNG matching exact screen aspect ratio & GPU layer stack
	async function export4KGPUWallpaper() {
		if (!wallpaperEngine || isExporting) return;
		isExporting = true;

		try {
			const screenW = window.innerWidth;
			const screenH = window.innerHeight;
			const targetW = 3840;
			const targetH = Math.round(3840 * (screenH / screenW));

			const blob = await wallpaperEngine.export4K(targetW, targetH);
			if (blob) {
				const downloadUrl = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = downloadUrl;
				a.download = `wallpaper-gpu-4k-${Date.now()}.png`;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(downloadUrl);
			}
		} catch (err) {
			console.error('GPU 4K Export Error:', err);
		} finally {
			isExporting = false;
		}
	}

	function generateCornerRays(
		cornerKey: string,
		config: any,
		startAngleDeg: number,
		endAngleDeg: number,
		flipY: boolean = false
	) {
		if (!config || !config.show || config.count <= 0) return [];
		const count = config.count;
		const styleType = config.styleType;
		const dashLen = config.dashLength;
		const seed = config.seed || 1;
		const lines = [];

		const maxArc = Math.abs(endAngleDeg - startAngleDeg);
		const minAngle = Math.min(startAngleDeg, endAngleDeg);

		function pseudoRandom(index: number, offset: number) {
			const x = Math.sin(index * 999.123 + seed * 45.67 + offset * 12.34) * 43758.5453123;
			return x - Math.floor(x);
		}

		const weights: number[] = [];
		let totalWeight = 0;
		for (let i = 0; i <= count; i++) {
			const pr = pseudoRandom(i + 1, 100);
			const w = Math.pow(pr, 2.2) * 8 + 0.5;
			weights.push(w);
			totalWeight += w;
		}

		const cornerMap = burstLineOverrides[cornerKey] || {};

		let accumulatedWeight = weights[0];
		for (let i = 0; i < count; i++) {
			const angleFraction = accumulatedWeight / totalWeight;
			const baseAngleDeg = minAngle + angleFraction * maxArc;
			const baseRad = (baseAngleDeg * Math.PI) / 180;
			
			const ov = cornerMap[i] || { originX: 0, originY: 0, targetX: 0, targetY: 0 };
			const x1 = 0 + (ov.originX || 0);
			const y1 = 0 + (ov.originY || 0);

			const defaultDist = 180;
			const defaultTx = Math.cos(baseRad) * defaultDist;
			const defaultTy = flipY ? Math.sin(baseRad) * defaultDist : -Math.sin(baseRad) * defaultDist;

			const x2 = defaultTx + (ov.targetX || 0);
			const y2 = defaultTy + (ov.targetY || 0);

			const rayAngleRad = Math.atan2(y2 - y1, x2 - x1);
			const RAY_LENGTH = 4000;

			const xFar = x1 + Math.cos(rayAngleRad) * RAY_LENGTH;
			const yFar = y1 + Math.sin(rayAngleRad) * RAY_LENGTH;

			const styleRand = pseudoRandom(i + 1, 300);
			let isDashed = false;
			if (styleType === 'dashed') {
				isDashed = true;
			} else if (styleType === 'solid') {
				isDashed = false;
			} else {
				isDashed = styleRand > 0.5;
			}

			const dashLenRand = pseudoRandom(i + 1, 200);
			const dashArray = isDashed ? `${dashLen} ${dashLen * (1 + dashLenRand * 0.6)}` : undefined;

			lines.push({ id: i, x1, y1, x2, y2, xFar, yFar, dashArray });
			accumulatedWeight += weights[i + 1];
		}

		return lines;
	}

	const rayBottomLeft = $derived(generateCornerRays('burstBottomLeft', params.burstBottomLeft, 2, 83, false));
	const rayBottomRight = $derived(generateCornerRays('burstBottomRight', params.burstBottomRight, 97, 178, false));
	const rayTopLeft = $derived(generateCornerRays('burstTopLeft', params.burstTopLeft, 2, 83, true));
	const rayTopRight = $derived(generateCornerRays('burstTopRight', params.burstTopRight, 97, 178, true));

	const circleList = $derived.by(() => {
		if (!params.randomCircles || !params.randomCircles.show || params.randomCircles.count <= 0) return [];
		const count = params.randomCircles.count;
		const minR = params.randomCircles.minRadius;
		const maxR = params.randomCircles.maxRadius;
		const styleType = params.randomCircles.styleType;
		const dashLen = params.randomCircles.dashLength;
		const seed = params.randomCircles.seed || 1;
		const circles = [];

		function pseudoRandom(index: number, offset: number) {
			const x = Math.sin(index * 999.123 + seed * 45.67 + offset * 12.34) * 43758.5453123;
			return x - Math.floor(x);
		}

		for (let i = 0; i < count; i++) {
			const cxPct = 8 + pseudoRandom(i + 1, 10) * 84;
			const cyPct = 8 + pseudoRandom(i + 1, 20) * 84;
			const baseR = minR + pseudoRandom(i + 1, 30) * Math.max(maxR - minR, 1);
			const ov = circleOverrides[i] || { offsetX: 0, offsetY: 0, rDelta: 0 };
			const r = Math.max(5, baseR + (ov.rDelta || 0));

			const startAngle = pseudoRandom(i + 1, 40) * 360;
			const solidArcSpan = 120 + pseudoRandom(i + 1, 50) * 120;
			const endAngle = startAngle + solidArcSpan;

			const solidPath = describeArc(0, 0, r, startAngle, endAngle);
			const dashedPath = describeArc(0, 0, r, endAngle, startAngle + 360);

			const dashGapMultiplier = 1.2 + pseudoRandom(i + 1, 60) * 1.5;
			const dashArray = `${dashLen} ${dashLen * dashGapMultiplier}`;

			const randType = pseudoRandom(i + 1, 70);
			let renderMode = 'solid';
			if (styleType === 'solid') {
				renderMode = 'solid';
			} else if (styleType === 'dashed') {
				renderMode = 'dashed';
			} else {
				if (randType < 0.25) {
					renderMode = 'hybrid';
				} else if (randType < 0.65) {
					renderMode = 'solid';
				} else {
					renderMode = 'dashed';
				}
			}

			circles.push({
				id: i,
				cxPct,
				cyPct,
				offsetX: ov.offsetX || 0,
				offsetY: ov.offsetY || 0,
				r,
				solidPath,
				dashedPath,
				dashArray,
				renderMode
			});
		}

		return circles;
	});

	// Transparent Pointer Interaction Handlers
	let selectedElement = $state<string | null>(null);
	let hoveredCircleIndex = $state<number | null>(null);
	let hoveredBurstKey = $state<string | null>(null);
	let isDragging = $state(false);
	let dragAction = $state<'move' | 'resize' | 'rotate' | 'panGrid' | null>(null);
	let dragStart = { x: 0, y: 0 };
	let initialValues: Record<string, number> = {};

	function handlePointerDown(e: PointerEvent, elementKey: string, action: 'move' | 'resize' | 'rotate' | 'panGrid' = 'move') {
		e.stopPropagation();
		selectedElement = elementKey;
		isDragging = true;
		dragAction = action;
		dragStart = { x: e.clientX, y: e.clientY };

		if (elementKey === 'canvasGrid') {
			initialValues = { panX: gridPan.x, panY: gridPan.y };
		} else if (elementKey === 'textBadge') {
			initialValues = {
				gridX: params.textBadge.gridX,
				gridY: params.textBadge.gridY,
				spanGridWidth: params.textBadge.spanGridWidth,
				spanGridHeight: params.textBadge.spanGridHeight
			};
		} else if (elementKey.startsWith('burstline-')) {
			const parts = elementKey.split('-');
			const cornerKey = parts[1];
			const index = parseInt(parts[2], 10);
			if (!burstLineOverrides[cornerKey]) burstLineOverrides[cornerKey] = {};
			const ov = burstLineOverrides[cornerKey][index] || { originX: 0, originY: 0, targetX: 0, targetY: 0 };
			initialValues = { originX: ov.originX || 0, originY: ov.originY || 0, targetX: ov.targetX || 0, targetY: ov.targetY || 0 };
		} else if (elementKey.startsWith('circle-')) {
			const index = parseInt(elementKey.replace('circle-', ''), 10);
			const ov = circleOverrides[index] || { offsetX: 0, offsetY: 0, rDelta: 0 };
			initialValues = { offsetX: ov.offsetX || 0, offsetY: ov.offsetY || 0, rDelta: ov.rDelta || 0 };
		}
	}

	function handlePointerMove(e: PointerEvent) {
		if (!isDragging || !selectedElement) return;
		const dx = e.clientX - dragStart.x;
		const dy = e.clientY - dragStart.y;
		const size = params.grid.size || 60;

		if (selectedElement === 'canvasGrid' && dragAction === 'panGrid') {
			gridPan = { x: initialValues.panX + dx, y: initialValues.panY + dy };
		} else if (selectedElement === 'textBadge') {
			if (dragAction === 'move') {
				const dGridX = Math.round(dx / size);
				const dGridY = Math.round(dy / size);
				const newX = initialValues.gridX + dGridX;
				const newY = initialValues.gridY + dGridY;
				if (newX !== params.textBadge.gridX) dial.setValue('textBadge.gridX', newX);
				if (newY !== params.textBadge.gridY) dial.setValue('textBadge.gridY', newY);
			} else if (dragAction === 'resize') {
				const dSpanW = Math.round(dx / size);
				const dSpanH = Math.round(dy / size);
				const newW = Math.max(1, initialValues.spanGridWidth + dSpanW);
				const newH = Math.max(1, initialValues.spanGridHeight + dSpanH);
				if (newW !== params.textBadge.spanGridWidth) dial.setValue('textBadge.spanGridWidth', newW);
				if (newH !== params.textBadge.spanGridHeight) dial.setValue('textBadge.spanGridHeight', newH);
			}
		} else if (selectedElement.startsWith('burstline-')) {
			const parts = selectedElement.split('-');
			const cornerKey = parts[1];
			const index = parseInt(parts[2], 10);
			if (!isNaN(index) && cornerKey) {
				if (!burstLineOverrides[cornerKey]) burstLineOverrides[cornerKey] = {};
				if (!burstLineOverrides[cornerKey][index]) burstLineOverrides[cornerKey][index] = { originX: 0, originY: 0, targetX: 0, targetY: 0 };

				if (dragAction === 'move') {
					burstLineOverrides[cornerKey][index] = {
						...burstLineOverrides[cornerKey][index],
						originX: initialValues.originX + dx,
						originY: initialValues.originY + dy,
						targetX: initialValues.targetX + dx,
						targetY: initialValues.targetY + dy
					};
				} else if (dragAction === 'rotate') {
					burstLineOverrides[cornerKey][index] = {
						...burstLineOverrides[cornerKey][index],
						targetX: initialValues.targetX + dx,
						targetY: initialValues.targetY + dy
					};
				}
			}
		} else if (selectedElement.startsWith('circle-')) {
			const index = parseInt(selectedElement.replace('circle-', ''), 10);
			if (!isNaN(index)) {
				if (!circleOverrides[index]) circleOverrides[index] = { offsetX: 0, offsetY: 0, rDelta: 0 };
				if (dragAction === 'move') {
					circleOverrides[index] = { ...circleOverrides[index], offsetX: initialValues.offsetX + dx, offsetY: initialValues.offsetY + dy };
				} else if (dragAction === 'resize') {
					circleOverrides[index] = { ...circleOverrides[index], rDelta: initialValues.rDelta + dx };
				}
			}
		}
	}

	function handlePointerUp() {
		if (isDragging) {
			isDragging = false;
			dragAction = null;
		}
	}
</script>

<svelte:window onpointermove={handlePointerMove} onpointerup={handlePointerUp} />

<div
	class="wallpaper-container"
	class:panning={isDragging && dragAction === 'panGrid'}
	onpointerdown={(e) => handlePointerDown(e, 'canvasGrid', 'panGrid')}
>
	<!-- Shared SVG Mask: Physical Cutout Hole for Text Badge -->
	<svg width="0" height="0" style="position: absolute;">
		<defs>
			<mask id="badge-interior-mask">
				<rect width="100vw" height="100vh" fill="white" />
				{#if params.textBadge.show && (params.textBadge.spanGridWidth > 0 || params.textBadge.spanGridHeight > 0)}
					<rect
						x={gridPan.x + params.textBadge.gridX * params.grid.size}
						y={gridPan.y + params.textBadge.gridY * params.grid.size}
						width={params.textBadge.spanGridWidth * params.grid.size}
						height={params.textBadge.spanGridHeight * params.grid.size}
						fill="black"
					/>
				{/if}
			</mask>
		</defs>
	</svg>

	<!-- LAYER 0: WebGPU / WebGL GPU SDF Wallpaper Engine Canvas (Includes Background, Grid, Crosses) -->
	<canvas bind:this={canvasRef} class="gpu-canvas"></canvas>

	<!-- LAYER 1: Full-Screen SVG Vector Layer for Burst Rays & Geometric Circles (HARD-MASKED to cut off at text badge boundary!) -->
	<svg class="layer full-vector-layer" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" mask="url(#badge-interior-mask)">
		<!-- 1. Burst Rays Layer -->
		{#if params.burstBottomLeft.show}
			<g style="transform: translate({params.burstBottomLeft.originOffset}px, calc(100vh - {params.burstBottomLeft.originOffset}px));">
				{#each rayBottomLeft as ray}
					<line
						x1={ray.x1}
						y1={ray.y1}
						x2={ray.xFar}
						y2={ray.yFar}
						stroke={hexToRgba(params.colors.burstColor, params.burstBottomLeft.opacity)}
						stroke-width={params.burstBottomLeft.thickness}
						stroke-dasharray={ray.dashArray}
						stroke-linecap="round"
					/>
				{/each}
			</g>
		{/if}

		<!-- 2. Geometric Circles Layer (Solid, Dashed, Hybrid Arcs) -->
		{#if params.randomCircles.show}
			{#each circleList as c}
				<g style="transform: translate(calc({c.cxPct}vw + {c.offsetX}px), calc({c.cyPct}vh + {c.offsetY}px));">
					{#if c.renderMode === 'solid'}
						<circle cx="0" cy="0" r={c.r} fill="none" stroke={hexToRgba(params.colors.circlesColor, params.randomCircles.opacity)} stroke-width={params.randomCircles.thickness} />
					{:else if c.renderMode === 'dashed'}
						<circle cx="0" cy="0" r={c.r} fill="none" stroke={hexToRgba(params.colors.circlesColor, params.randomCircles.opacity)} stroke-width={params.randomCircles.thickness} stroke-dasharray={c.dashArray} />
					{:else}
						<path d={c.solidPath} fill="none" stroke={hexToRgba(params.colors.circlesColor, params.randomCircles.opacity)} stroke-width={params.randomCircles.thickness} stroke-linecap="round" />
						<path d={c.dashedPath} fill="none" stroke={hexToRgba(params.colors.circlesColor, params.randomCircles.opacity)} stroke-width={params.randomCircles.thickness} stroke-dasharray={c.dashArray} stroke-linecap="round" />
					{/if}
				</g>
			{/each}
		{/if}
	</svg>

	<!-- LAYER 2: Text Badge Interactive Pointer Handle -->
	{#if params.textBadge.show}
		<div
			class="text-badge-hit-layer"
			class:selected={selectedElement === 'textBadge'}
			style:left="{gridPan.x + params.textBadge.gridX * params.grid.size}px"
			style:top="{gridPan.y + params.textBadge.gridY * params.grid.size}px"
			style:width="{params.textBadge.spanGridWidth * params.grid.size}px"
			style:height="{params.textBadge.spanGridHeight * params.grid.size}px"
			onpointerdown={(e) => handlePointerDown(e, 'textBadge', 'move')}
		>
			{#if isDragging && selectedElement === 'textBadge'}
				<div class="grid-coordinate-label">
					{params.textBadge.gridX}, {params.textBadge.gridY} ({params.textBadge.spanGridWidth}x{params.textBadge.spanGridHeight})
				</div>
			{/if}

			<div
				class="badge-resize-handle"
				onpointerdown={(e) => handlePointerDown(e, 'textBadge', 'resize')}
				title="Drag to resize in grid steps"
			>
				<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11 1V11H1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
					<path d="M11 6V11H6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
				</svg>
			</div>
		</div>
	{/if}

	<!-- LAYER 3: Interactive Circles Pointer Overlay -->
	{#if params.randomCircles.show}
		<svg class="layer interactive-circles-overlay" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
			{#each circleList as c}
				<g style="transform: translate(calc({c.cxPct}vw + {c.offsetX}px), calc({c.cyPct}vh + {c.offsetY}px));">
					<circle
						cx="0"
						cy="0"
						r={c.r}
						fill="none"
						stroke="transparent"
						stroke-width="28"
						class="circle-hit-ring"
						onpointerenter={() => (hoveredCircleIndex = c.id)}
						onpointerleave={() => (hoveredCircleIndex = null)}
						onpointerdown={(e) => handlePointerDown(e, `circle-${c.id}`, 'move')}
					/>

					{#if hoveredCircleIndex === c.id || selectedElement === `circle-${c.id}`}
						<circle cx="0" cy="0" r={c.r + 4} fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4 4" style="pointer-events: none;" />
						<circle cx={c.r + 4} cy="0" r="6.5" fill="#3b82f6" stroke="#ffffff" stroke-width="1.5" class="circle-resize-handle" onpointerdown={(e) => handlePointerDown(e, `circle-${c.id}`, 'resize')} />
					{/if}
				</g>
			{/each}
		</svg>
	{/if}

	<!-- LAYER 4: Interactive Burst Lines Pointer Overlay -->
	<svg class="layer interactive-burst-overlay" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
		{#if params.burstBottomLeft.show}
			<g style="transform: translate({params.burstBottomLeft.originOffset}px, calc(100vh - {params.burstBottomLeft.originOffset}px));">
				{#each rayBottomLeft as ray}
					<line x1={ray.x1} y1={ray.y1} x2={ray.xFar} y2={ray.yFar} stroke="transparent" stroke-width="24" class="burst-line-hit" onpointerenter={() => (hoveredBurstKey = `burstline-burstBottomLeft-${ray.id}`)} onpointerleave={() => (hoveredBurstKey = null)} onpointerdown={(e) => handlePointerDown(e, `burstline-burstBottomLeft-${ray.id}`, 'move')} />
					{#if hoveredBurstKey === `burstline-burstBottomLeft-${ray.id}` || selectedElement === `burstline-burstBottomLeft-${ray.id}`}
						<line x1={ray.x1} y1={ray.y1} x2={ray.xFar} y2={ray.yFar} stroke="#3b82f6" stroke-width="2" stroke-dasharray="4 4" style="pointer-events: none;" />
						<circle cx={ray.x1} cy={ray.y1} r="6.5" fill="#3b82f6" stroke="#ffffff" stroke-width="1.5" class="burst-handle-node" onpointerdown={(e) => handlePointerDown(e, `burstline-burstBottomLeft-${ray.id}`, 'move')} />
						<circle cx={ray.x2} cy={ray.y2} r="6" fill="#60a5fa" stroke="#ffffff" stroke-width="1.5" class="burst-rotate-node" onpointerdown={(e) => handlePointerDown(e, `burstline-burstBottomLeft-${ray.id}`, 'rotate')} />
					{/if}
				{/each}
			</g>
		{/if}
	</svg>
</div>

<style>
	.wallpaper-container {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		user-select: none;
		cursor: grab;
	}

	.wallpaper-container.panning {
		cursor: grabbing;
	}

	.gpu-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		display: block;
		z-index: 0;
	}

	.layer {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.full-vector-layer {
		z-index: 1;
	}

	.text-badge-hit-layer {
		position: absolute;
		z-index: 10;
		pointer-events: auto !important;
		cursor: grab;
		background: transparent;
		outline: 1px dashed transparent;
		transition: outline 0.15s ease;
	}

	.text-badge-hit-layer:hover {
		outline: 2px dashed rgba(59, 130, 246, 0.7);
	}

	.text-badge-hit-layer.selected {
		outline: 2px solid #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
	}

	.text-badge-hit-layer:active {
		cursor: grabbing;
	}

	.badge-resize-handle {
		position: absolute;
		right: -4px;
		bottom: -4px;
		width: 18px;
		height: 18px;
		background: #3b82f6;
		color: #ffffff;
		border-radius: 2px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: se-resize;
		opacity: 0;
		transition: opacity 0.15s ease;
		z-index: 20;
	}

	.text-badge-hit-layer:hover .badge-resize-handle,
	.text-badge-hit-layer.selected .badge-resize-handle {
		opacity: 1;
	}

	.grid-coordinate-label {
		position: absolute;
		top: -24px;
		left: 0;
		background: #3b82f6;
		color: #ffffff;
		font-size: 11px;
		font-family: 'JetBrains Mono', monospace;
		font-weight: 700;
		padding: 2px 6px;
		border-radius: 3px;
		white-space: nowrap;
		pointer-events: none;
	}

	.interactive-circles-overlay {
		z-index: 105;
	}

	.circle-hit-ring {
		cursor: grab;
		pointer-events: auto !important;
	}

	.circle-hit-ring:active {
		cursor: grabbing;
	}

	.circle-resize-handle {
		cursor: ew-resize;
		pointer-events: auto !important;
	}

	.interactive-burst-overlay {
		z-index: 110;
	}

	.burst-line-hit {
		cursor: grab;
		pointer-events: auto !important;
	}

	.burst-line-hit:active {
		cursor: grabbing;
	}

	.burst-handle-node {
		cursor: move;
		pointer-events: auto !important;
	}

	.burst-rotate-node {
		cursor: crosshair;
		pointer-events: auto !important;
	}

	:global(.dialkit-action-button),
	:global(.dialkit-actions-group) {
		margin-bottom: 13px !important;
	}
</style>
