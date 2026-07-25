<script lang="ts">
	import { createDialKitController } from 'dialkit/svelte';

	const dial = createDialKitController(
		'Wallpaper Dials',
		{
			// 🎨 MASTER COLOR PALETTE (Relocated to the top for effortless tweaking)
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
				gridX: [12, 0, 30, 1],
				gridY: [8, 0, 20, 1],
				spanGridWidth: [6, 1, 10, 1],
				spanGridHeight: [2, 1, 10, 1],
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
				show: false,
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
				opacity: [0.25, 0, 1, 0.05],
				blur: [25, 0, 100, 5],
				angle: [65, 0, 180, 5],
				scale: [100, 50, 500, 10],
				maskCoverage: [100, 20, 100, 5],
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
				frequency: [0.35, 0.05, 2.5, 0.05],
				octaves: [3, 1, 6, 1],
				seed: [9, 0, 50, 1],
				opacity: [0.15, 0, 1, 0.01],
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

			// Lighting & Effects
			effects: {
				_collapsed: true,
				enableRadialGlow: false,
				glowOpacity: [0.35, 0, 1, 0.05]
			},

			// Reset Action Button
			resetAction: {
				type: 'action',
				label: '🔄 Reset to Defaults'
			}
		},
		{
			id: 'wallpaper-dialkit-config-v47',
			persist: true,
			onAction: (action) => {
				if (action === 'resetAction') {
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
	const cx = $derived(params.grid.size / 2);
	const cy = $derived(params.grid.size / 2);
	const half = $derived(params.cross.size / 2);

	// Independent per-circle position offsets and radius deltas state map
	let circleOverrides = $state<Record<number, { offsetX: number; offsetY: number; rDelta: number }>>({});

	// Independent per-burst-line origin & target direction point offsets map
	let burstLineOverrides = $state<Record<string, Record<number, { originX: number; originY: number; targetX: number; targetY: number }>>>({
		burstBottomLeft: {},
		burstBottomRight: {},
		burstTopLeft: {},
		burstTopRight: {}
	});

	// Calculate perceptual luminance of hex background color
	function getLuminance(hex: string): number {
		if (!hex) return 0;
		let c = hex.replace('#', '');
		if (c.length === 3) c = c.split('').map((x) => x + x).join('');
		const num = parseInt(c, 16);
		if (isNaN(num)) return 0;
		const r = (num >> 16) & 255;
		const g = (num >> 8) & 255;
		const b = num & 255;
		return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	}

	// Adaptive Color Linkage: when main colors.bgColor changes, adapt text, grid, cross, burst & circle colors for optimal accessibility contrast
	let prevBgColor = $state(dial.values.colors.bgColor);
	$effect(() => {
		const currentBg = dial.values.colors.bgColor;
		if (currentBg !== prevBgColor) {
			const isLight = getLuminance(currentBg) > 0.55;
			const targetFg = isLight ? '#18181b' : '#ffffff';

			dial.setValue('colors.badgeBgColor', currentBg);
			dial.setValue('colors.gridColor', targetFg);
			dial.setValue('colors.crossColor', targetFg);
			dial.setValue('colors.badgeTextColor', targetFg);
			dial.setValue('colors.badgeBorderColor', targetFg);
			dial.setValue('colors.burstColor', targetFg);
			dial.setValue('colors.circlesColor', targetFg);

			prevBgColor = currentBg;
		}
	});

	// Universal corner ray generator helper where ray ALWAYS points directly through the target direction point (yellow dot)!
	function generateCornerRays(
		cornerKey: string,
		config: {
			show: boolean;
			count: number;
			thickness: number;
			opacity: number;
			seed: number;
			styleType: string;
			dashLength: number;
			originOffset: number;
		},
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

		// Generate count + 1 gap weights
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
			
			// Pink Dot (Origin)
			const x1 = 0 + (ov.originX || 0);
			const y1 = 0 + (ov.originY || 0);

			// Target Direction Point (Default 180px along base ray)
			const defaultDist = 180;
			const defaultTx = Math.cos(baseRad) * defaultDist;
			const defaultTy = flipY ? Math.sin(baseRad) * defaultDist : -Math.sin(baseRad) * defaultDist;

			const x2 = defaultTx + (ov.targetX || 0);
			const y2 = defaultTy + (ov.targetY || 0);

			// Ray angle calculated from Origin (x1, y1) to Target Point (x2, y2)
			const rayAngleRad = Math.atan2(y2 - y1, x2 - x1);
			const RAY_LENGTH = 4000;

			// Ray extended far endpoint
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

			lines.push({
				id: i,
				x1,
				y1,
				x2,
				y2,
				xFar,
				yFar,
				dashArray
			});

			accumulatedWeight += weights[i + 1];
		}

		return lines;
	}

	// 1. Bottom-Left Corner Rays
	const rayBottomLeft = $derived(generateCornerRays('burstBottomLeft', params.burstBottomLeft, 2, 83, false));

	// 2. Bottom-Right Corner Rays
	const rayBottomRight = $derived(generateCornerRays('burstBottomRight', params.burstBottomRight, 97, 178, false));

	// 3. Top-Left Corner Rays
	const rayTopLeft = $derived(generateCornerRays('burstTopLeft', params.burstTopLeft, 2, 83, true));

	// 4. Top-Right Corner Rays
	const rayTopRight = $derived(generateCornerRays('burstTopRight', params.burstTopRight, 97, 178, true));

	// Helper function to build SVG arc path string from startAngleDeg to endAngleDeg
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

	// Derived array of PERFECT circles with INDEPENDENT per-circle positions and radii
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

	// --------------------------------------------------------------------------
	// INTERACTIVE CANVAS UX DRAG, RESIZE & ROTATE HANDLERS
	// --------------------------------------------------------------------------
	let selectedElement = $state<string | null>(null);
	let hoveredCircleIndex = $state<number | null>(null);
	let hoveredBurstKey = $state<string | null>(null);
	let hoveredElement = $state<string | null>(null);

	let isDragging = $state(false);
	let dragAction = $state<'move' | 'resize' | 'rotate' | null>(null);

	let dragStart = { x: 0, y: 0 };
	let initialValues: Record<string, number> = {};

	function handlePointerDown(
		e: PointerEvent,
		elementKey: string,
		action: 'move' | 'resize' | 'rotate' = 'move'
	) {
		e.stopPropagation();

		selectedElement = elementKey;
		isDragging = true;
		dragAction = action;
		dragStart = { x: e.clientX, y: e.clientY };

		if (elementKey === 'textBadge') {
			initialValues = {
				gridX: params.textBadge.gridX,
				gridY: params.textBadge.gridY,
				spanGridWidth: params.textBadge.spanGridWidth,
				spanGridHeight: params.textBadge.spanGridHeight
			};
		} else if (elementKey.startsWith('burstline-')) {
			// Format: burstline-cornerKey-index
			const parts = elementKey.split('-');
			const cornerKey = parts[1];
			const index = parseInt(parts[2], 10);
			
			if (!burstLineOverrides[cornerKey]) burstLineOverrides[cornerKey] = {};
			const ov = burstLineOverrides[cornerKey][index] || { originX: 0, originY: 0, targetX: 0, targetY: 0 };
			
			initialValues = {
				originX: ov.originX || 0,
				originY: ov.originY || 0,
				targetX: ov.targetX || 0,
				targetY: ov.targetY || 0
			};
		} else if (elementKey.startsWith('circle-')) {
			const index = parseInt(elementKey.replace('circle-', ''), 10);
			const ov = circleOverrides[index] || { offsetX: 0, offsetY: 0, rDelta: 0 };
			initialValues = {
				offsetX: ov.offsetX || 0,
				offsetY: ov.offsetY || 0,
				rDelta: ov.rDelta || 0
			};
		}
	}

	function handlePointerMove(e: PointerEvent) {
		if (!isDragging || !selectedElement) return;

		const dx = e.clientX - dragStart.x;
		const dy = e.clientY - dragStart.y;
		const size = params.grid.size || 60;

		if (selectedElement === 'textBadge') {
			if (dragAction === 'move') {
				const dGridX = Math.round(dx / size);
				const dGridY = Math.round(dy / size);

				const newX = Math.max(0, initialValues.gridX + dGridX);
				const newY = Math.max(0, initialValues.gridY + dGridY);

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
				if (!burstLineOverrides[cornerKey][index]) {
					burstLineOverrides[cornerKey][index] = { originX: 0, originY: 0, targetX: 0, targetY: 0 };
				}

				if (dragAction === 'move') {
					// Moving origin moves both origin and target together
					burstLineOverrides[cornerKey][index] = {
						...burstLineOverrides[cornerKey][index],
						originX: initialValues.originX + dx,
						originY: initialValues.originY + dy,
						targetX: initialValues.targetX + dx,
						targetY: initialValues.targetY + dy
					};
				} else if (dragAction === 'rotate') {
					// Dragging target direction point updates target so line points directly through it!
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
				if (!circleOverrides[index]) {
					circleOverrides[index] = { offsetX: 0, offsetY: 0, rDelta: 0 };
				}

				if (dragAction === 'move') {
					circleOverrides[index] = {
						...circleOverrides[index],
						offsetX: initialValues.offsetX + dx,
						offsetY: initialValues.offsetY + dy
					};
				} else if (dragAction === 'resize') {
					circleOverrides[index] = {
						...circleOverrides[index],
						rDelta: initialValues.rDelta + dx
					};
				}
			}
		}
	}

	function handlePointerUp(e: PointerEvent) {
		if (isDragging) {
			isDragging = false;
			dragAction = null;
		}
	}

	function handleCanvasBackgroundPointerDown(e: PointerEvent) {
		selectedElement = null;
		hoveredCircleIndex = null;
		hoveredBurstKey = null;
		hoveredElement = null;
	}
</script>

<!-- Window Event Listener for global mouse up release -->
<svelte:window onpointermove={handlePointerMove} onpointerup={handlePointerUp} />

<div
	class="wallpaper-container"
	style:background-color={params.colors.bgColor}
	onpointerdown={handleCanvasBackgroundPointerDown}
>
	<!-- Shared SVG Interior Mask: Inset by exact half cross length so edge/corner cross arms render 100% UNCLIPPED -->
	<svg width="0" height="0" style="position: absolute;">
		<defs>
			<mask id="badge-interior-mask">
				<rect width="100vw" height="100vh" fill="white" />
				{#if params.textBadge.show && (params.textBadge.spanGridWidth > 1 || params.textBadge.spanGridHeight > 1)}
					<rect
						x={params.textBadge.gridX * params.grid.size + half}
						y={params.textBadge.gridY * params.grid.size + half}
						width={params.textBadge.spanGridWidth * params.grid.size - 2 * half}
						height={params.textBadge.spanGridHeight * params.grid.size - 2 * half}
						fill="black"
					/>
				{/if}
			</mask>
		</defs>
	</svg>

	<!-- LAYER 1 (z-index 20): Burst Lines -->
	{#if params.burstBottomLeft.show}
		<svg class="layer burst-svg passthrough-layer" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
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
		</svg>
	{/if}

	{#if params.burstBottomRight.show}
		<svg class="layer burst-svg passthrough-layer" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
			<g style="transform: translate(calc(100vw - {params.burstBottomRight.originOffset}px), calc(100vh - {params.burstBottomRight.originOffset}px));">
				{#each rayBottomRight as ray}
					<line
						x1={ray.x1}
						y1={ray.y1}
						x2={ray.xFar}
						y2={ray.yFar}
						stroke={hexToRgba(params.colors.burstColor, params.burstBottomRight.opacity)}
						stroke-width={params.burstBottomRight.thickness}
						stroke-dasharray={ray.dashArray}
						stroke-linecap="round"
					/>
				{/each}
			</g>
		</svg>
	{/if}

	{#if params.burstTopLeft.show}
		<svg class="layer burst-svg passthrough-layer" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
			<g style="transform: translate({params.burstTopLeft.originOffset}px, {params.burstTopLeft.originOffset}px);">
				{#each rayTopLeft as ray}
					<line
						x1={ray.x1}
						y1={ray.y1}
						x2={ray.xFar}
						y2={ray.yFar}
						stroke={hexToRgba(params.colors.burstColor, params.burstTopLeft.opacity)}
						stroke-width={params.burstTopLeft.thickness}
						stroke-dasharray={ray.dashArray}
						stroke-linecap="round"
					/>
				{/each}
			</g>
		</svg>
	{/if}

	{#if params.burstTopRight.show}
		<svg class="layer burst-svg passthrough-layer" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
			<g style="transform: translate(calc(100vw - {params.burstTopRight.originOffset}px), {params.burstTopRight.originOffset}px);">
				{#each rayTopRight as ray}
					<line
						x1={ray.x1}
						y1={ray.y1}
						x2={ray.xFar}
						y2={ray.yFar}
						stroke={hexToRgba(params.colors.burstColor, params.burstTopRight.opacity)}
						stroke-width={params.burstTopRight.thickness}
						stroke-dasharray={ray.dashArray}
						stroke-linecap="round"
					/>
				{/each}
			</g>
		</svg>
	{/if}

	<!-- LAYER 2 (z-index 30): Random Geometric Circles -->
	{#if params.randomCircles.show}
		<svg
			class="layer circles-svg passthrough-layer"
			width="100%"
			height="100%"
			xmlns="http://www.w3.org/2000/svg"
		>
			{#each circleList as c}
				<g style="transform: translate(calc({c.cxPct}vw + {c.offsetX}px), calc({c.cyPct}vh + {c.offsetY}px));">
					{#if c.renderMode === 'solid'}
						<circle
							cx="0"
							cy="0"
							r={c.r}
							fill="none"
							stroke={hexToRgba(params.colors.circlesColor, params.randomCircles.opacity)}
							stroke-width={params.randomCircles.thickness}
						/>
					{:else if c.renderMode === 'dashed'}
						<circle
							cx="0"
							cy="0"
							r={c.r}
							fill="none"
							stroke={hexToRgba(params.colors.circlesColor, params.randomCircles.opacity)}
							stroke-width={params.randomCircles.thickness}
							stroke-dasharray={c.dashArray}
						/>
					{:else}
						<path
							d={c.solidPath}
							fill="none"
							stroke={hexToRgba(params.colors.circlesColor, params.randomCircles.opacity)}
							stroke-width={params.randomCircles.thickness}
							stroke-linecap="round"
						/>
						<path
							d={c.dashedPath}
							fill="none"
							stroke={hexToRgba(params.colors.circlesColor, params.randomCircles.opacity)}
							stroke-width={params.randomCircles.thickness}
							stroke-dasharray={c.dashArray}
							stroke-linecap="round"
						/>
					{/if}
				</g>
			{/each}
		</svg>
	{/if}

	<!-- LAYER 3 (z-index 70): Typographic Grid-Snapped Text Badge ("Free Computer.") -->
	{#if params.textBadge.show}
		<div
			class="layer text-badge-layer interactive-badge"
			class:selected={selectedElement === 'textBadge'}
			class:hovered={hoveredElement === 'textBadge'}
			style:left="{params.textBadge.gridX * params.grid.size}px"
			style:top="{params.textBadge.gridY * params.grid.size}px"
			style:width="{params.textBadge.spanGridWidth * params.grid.size}px"
			style:height="{params.textBadge.spanGridHeight * params.grid.size}px"
			style:background-color={hexToRgba(params.colors.badgeBgColor, params.textBadge.opacity)}
			style:color={params.colors.badgeTextColor}
			style:border="{params.textBadge.borderWidth}px solid {params.colors.badgeBorderColor}"
			style:border-radius="0px"
			style:font-size="{params.textBadge.fontSize}px"
			style:font-weight={params.textBadge.fontWeight}
			style:font-family={params.textBadge.fontFamily}
			style:display="flex"
			style:align-items="center"
			style:justify-content={params.textBadge.align}
			style:padding="0 16px"
			style:box-sizing="border-box"
			style:letter-spacing="-0.03em"
			style:box-shadow="none"
			style:transition="background-color 0.15s ease, border 0.15s ease"
			onpointerenter={() => (hoveredElement = 'textBadge')}
			onpointerleave={() => (hoveredElement = null)}
			onpointerdown={(e) => handlePointerDown(e, 'textBadge', 'move')}
		>
			<span>{params.textBadge.text}</span>

			<!-- Grid Snap Indicator Label when dragging -->
			{#if isDragging && selectedElement === 'textBadge'}
				<div class="grid-coordinate-label">
					{params.textBadge.gridX}, {params.textBadge.gridY} ({params.textBadge.spanGridWidth}x{params.textBadge.spanGridHeight})
				</div>
			{/if}

			<!-- Grid Step Resize Handle at Bottom Right -->
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

	<!-- LAYER 4 (z-index 80): Base Grid Lines -->
	<svg class="layer grid-svg passthrough-layer" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<pattern
				id="grid-pattern"
				x="0"
				y="0"
				width={params.grid.size}
				height={params.grid.size}
				patternUnits="userSpaceOnUse"
			>
				{#if params.grid.show}
					{#if params.grid.type === 'lines'}
						<!-- Horizontal Grid Line at top origin y=0 -->
						<line
							x1="0"
							y1="0"
							x2={params.grid.size}
							y2="0"
							stroke={hexToRgba(params.colors.gridColor, params.grid.opacity)}
							stroke-width={params.grid.lineWidth}
						/>
						<!-- Vertical Grid Line at left origin x=0 -->
						<line
							x1="0"
							y1="0"
							x2="0"
							y2={params.grid.size}
							stroke={hexToRgba(params.colors.gridColor, params.grid.opacity)}
							stroke-width={params.grid.lineWidth}
						/>
					{:else if params.grid.type === 'dots'}
						<circle
							cx="0"
							cy="0"
							r={params.grid.lineWidth}
							fill={hexToRgba(params.colors.gridColor, params.grid.opacity)}
						/>
					{/if}
				{/if}
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#grid-pattern)" mask="url(#badge-interior-mask)" />
	</svg>

	<!-- LAYER 5 (z-index 85): Plus (+) Cross Markers -->
	{#if params.cross.show}
		<svg class="layer cross-svg passthrough-layer" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<!-- Shift pattern tile by (-cx, -cy) so (cx, cy) lands EXACTLY on (0,0), (60,60) with full symmetric 4-arm cross -->
				<pattern
					id="cross-pattern"
					x={-cx}
					y={-cy}
					width={params.grid.size}
					height={params.grid.size}
					patternUnits="userSpaceOnUse"
				>
					<!-- Horizontal arm -->
					<line
						x1={cx - half}
						y1={cy}
						x2={cx + half}
						y2={cy}
						stroke={hexToRgba(params.colors.crossColor, params.cross.opacity)}
						stroke-width={params.cross.thickness}
						stroke-linecap="square"
					/>
					<!-- Vertical arm -->
					<line
						x1={cx}
						y1={cy - half}
						x2={cx}
						y2={cy + half}
						stroke={hexToRgba(params.colors.crossColor, params.cross.opacity)}
						stroke-width={params.cross.thickness}
						stroke-linecap="square"
					/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#cross-pattern)" mask="url(#badge-interior-mask)" />
		</svg>
	{/if}

	<!-- LAYER 6 (z-index 86): Radial Glow -->
	{#if params.effects.enableRadialGlow}
		<div
			class="layer glow passthrough-layer"
			style:background="radial-gradient(circle at 50% 50%, {hexToRgba(
				params.colors.glowColor,
				params.effects.glowOpacity
			)} 0%, transparent 70%)"
		></div>
	{/if}

	<!-- LAYER 7 (z-index 88): Dedicated Cinematic Vignette Layer -->
	{#if params.vignette.show}
		<div
			class="layer vignette-layer passthrough-layer"
			style:mix-blend-mode={params.vignette.blendMode}
			style:background="radial-gradient(ellipse at 50% 50%, transparent {params.vignette.coverage}%, {hexToRgba(
				params.colors.vignetteColor,
				params.vignette.opacity
			)} {params.vignette.coverage + params.vignette.softness}%)"
		></div>
	{/if}

	<!-- LAYER 8 (z-index 90): Multi-Layered Volumetric Shadow Rays (God Rays) -->
	{#if params.godRays.show}
		<div
			class="layer god-rays passthrough-layer"
			style:filter="blur({params.godRays.blur}px)"
			style:mix-blend-mode={params.godRays.blendMode}
			style:background-image="
				repeating-linear-gradient(
					{params.godRays.angle}deg,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity)} 0%,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity)} 2.3%,
					transparent 4.1%,
					transparent 9.7%,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity)} 11.2%,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity)} 17.5%,
					transparent 21.8%,
					transparent 24.1%,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity)} 31.4%,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity)} 32.8%,
					transparent 39.2%,
					transparent 44.5%,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity)} 48.1%,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity)} 57.3%,
					transparent 63.9%,
					transparent 69.1%,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity)} 74.2%,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity)} 78.6%,
					transparent 85.3%,
					transparent 92.1%,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity)} 96.4%,
					transparent 100%
				),
				repeating-linear-gradient(
					{params.godRays.angle + 7}deg,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity * 0.7)} 0%,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity * 0.7)} 1.1%,
					transparent 6.3%,
					transparent 12.4%,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity * 0.7)} 15.8%,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity * 0.7)} 19.2%,
					transparent 28.5%,
					transparent 33.1%,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity * 0.7)} 41.7%,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity * 0.7)} 45.2%,
					transparent 52.6%,
					transparent 61.3%,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity * 0.7)} 68.9%,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity * 0.7)} 71.4%,
					transparent 81.2%,
					transparent 89.6%,
					{hexToRgba(params.colors.godRaysColor, params.godRays.opacity * 0.7)} 93.7%,
					transparent 100%
				)
			"
			style:background-size="{params.godRays.scale}% {params.godRays.scale}%, {params.godRays.scale * 1.47}% {params.godRays.scale * 1.47}%"
			style:-webkit-mask-image="radial-gradient(ellipse at 0% 0%, black 15%, transparent {params.godRays.maskCoverage}%)"
			style:mask-image="radial-gradient(ellipse at 0% 0%, black 15%, transparent {params.godRays.maskCoverage}%)"
		></div>
	{/if}

	<!-- LAYER 9 (z-index 100): Topmost SVG Film Grain Noise Layer -->
	{#if params.noise.show}
		<div
			class="layer noise-wrapper passthrough-layer"
			style:mix-blend-mode={params.noise.blendMode}
			style:opacity={params.noise.opacity}
		>
			<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
				<filter id="grain-filter" x="0%" y="0%" width="100%" height="100%">
					<feTurbulence
						type={params.noise.type}
						baseFrequency={params.noise.frequency}
						numOctaves={params.noise.octaves}
						seed={params.noise.seed}
						stitchTiles="stitch"
					/>
					{#if params.noise.monochrome}
						<feColorMatrix type="saturate" values="0" />
					{/if}
					{#if params.noise.invert}
						<feComponentTransfer>
							<feFuncR type="linear" slope="-1" intercept="1" />
							<feFuncG type="linear" slope="-1" intercept="1" />
							<feFuncB type="linear" slope="-1" intercept="1" />
						</feComponentTransfer>
					{/if}
				</filter>
				<rect
					width="100%"
					height="100%"
					filter="url(#grain-filter)"
				/>
			</svg>
		</div>
	{/if}

	<!-- LAYER 10 (z-index 105): TOPMOST INTERACTIVE CIRCLES CANVAS HANDLES -->
	{#if params.randomCircles.show}
		<svg
			class="layer interactive-circles-overlay"
			width="100%"
			height="100%"
			xmlns="http://www.w3.org/2000/svg"
		>
			{#each circleList as c}
				<g style="transform: translate(calc({c.cxPct}vw + {c.offsetX}px), calc({c.cyPct}vh + {c.offsetY}px));">
					<!-- Invisible Wide Hit Ring for Independent Dragging -->
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

					<!-- Static Handle Dot & Dashed Guide Line when Hovered or Selected -->
					{#if hoveredCircleIndex === c.id || selectedElement === `circle-${c.id}`}
						<circle
							cx="0"
							cy="0"
							r={c.r + 4}
							fill="none"
							stroke="#3b82f6"
							stroke-width="1.5"
							stroke-dasharray="4 4"
							style="pointer-events: none;"
						/>
						<!-- Static Circle Resize Handle Dot at right edge -->
						<circle
							cx={c.r + 4}
							cy="0"
							r="6.5"
							fill="#3b82f6"
							stroke="#ffffff"
							stroke-width="1.5"
							class="circle-resize-handle"
							onpointerdown={(e) => handlePointerDown(e, `circle-${c.id}`, 'resize')}
						/>
					{/if}
				</g>
			{/each}
		</svg>
	{/if}

	<!-- LAYER 11 (z-index 110): TOPMOST INTERACTIVE BURST LINES CANVAS HANDLES (SWISS TECH BLUE ACCENT + OUTER PADDING ENVELOPE LAYER) -->
	<svg class="layer interactive-burst-overlay" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
		<!-- 1. Bottom-Left Corner Vector Burst Lines -->
		{#if params.burstBottomLeft.show}
			<g style="transform: translate({params.burstBottomLeft.originOffset}px, calc(100vh - {params.burstBottomLeft.originOffset}px));">
				{#each rayBottomLeft as ray}
					<!-- Wide Invisible Hit Line (24px hit width) -->
					<line
						x1={ray.x1}
						y1={ray.y1}
						x2={ray.xFar}
						y2={ray.yFar}
						stroke="transparent"
						stroke-width="24"
						class="burst-line-hit"
						onpointerenter={() => (hoveredBurstKey = `burstline-burstBottomLeft-${ray.id}`)}
						onpointerleave={() => (hoveredBurstKey = null)}
						onpointerdown={(e) => handlePointerDown(e, `burstline-burstBottomLeft-${ray.id}`, 'move')}
					/>

					<!-- Selection & Hover Blue Dashed Line + Outer Padding Envelope Layer + Blue Handles -->
					{#if hoveredBurstKey === `burstline-burstBottomLeft-${ray.id}` || selectedElement === `burstline-burstBottomLeft-${ray.id}`}
						<!-- Outer Padding Envelope Glow Layer (8px width, 0.25 opacity) -->
						<line
							x1={ray.x1}
							y1={ray.y1}
							x2={ray.xFar}
							y2={ray.yFar}
							stroke="#3b82f6"
							stroke-width="8"
							stroke-opacity="0.25"
							stroke-linecap="round"
							style="pointer-events: none;"
						/>
						<!-- Inner Blue Dashed Selection Line -->
						<line
							x1={ray.x1}
							y1={ray.y1}
							x2={ray.xFar}
							y2={ray.yFar}
							stroke="#3b82f6"
							stroke-width="2"
							stroke-dasharray="4 4"
							style="pointer-events: none;"
						/>
						<!-- Blue Origin Start Dot (Drag to move origin) -->
						<circle
							cx={ray.x1}
							cy={ray.y1}
							r="6.5"
							fill="#3b82f6"
							stroke="#ffffff"
							stroke-width="1.5"
							class="burst-handle-node"
							onpointerdown={(e) => handlePointerDown(e, `burstline-burstBottomLeft-${ray.id}`, 'move')}
							title="Drag origin point"
						/>
						<!-- Light Blue Target Direction Dot (Line points directly through this target point) -->
						<circle
							cx={ray.x2}
							cy={ray.y2}
							r="6"
							fill="#60a5fa"
							stroke="#ffffff"
							stroke-width="1.5"
							class="burst-rotate-node"
							onpointerdown={(e) => handlePointerDown(e, `burstline-burstBottomLeft-${ray.id}`, 'rotate')}
							title="Drag target direction point"
						/>
						<!-- Dashed line segment to Target Dot -->
						<line x1={ray.x1} y1={ray.y1} x2={ray.x2} y2={ray.y2} stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="2 2" style="pointer-events: none;" />
					{/if}
				{/each}
			</g>
		{/if}

		<!-- 2. Bottom-Right Corner Vector Burst Lines -->
		{#if params.burstBottomRight.show}
			<g style="transform: translate(calc(100vw - {params.burstBottomRight.originOffset}px), calc(100vh - {params.burstBottomRight.originOffset}px));">
				{#each rayBottomRight as ray}
					<!-- Wide Invisible Hit Line -->
					<line
						x1={ray.x1}
						y1={ray.y1}
						x2={ray.xFar}
						y2={ray.yFar}
						stroke="transparent"
						stroke-width="24"
						class="burst-line-hit"
						onpointerenter={() => (hoveredBurstKey = `burstline-burstBottomRight-${ray.id}`)}
						onpointerleave={() => (hoveredBurstKey = null)}
						onpointerdown={(e) => handlePointerDown(e, `burstline-burstBottomRight-${ray.id}`, 'move')}
					/>

					{#if hoveredBurstKey === `burstline-burstBottomRight-${ray.id}` || selectedElement === `burstline-burstBottomRight-${ray.id}`}
						<line
							x1={ray.x1}
							y1={ray.y1}
							x2={ray.xFar}
							y2={ray.yFar}
							stroke="#3b82f6"
							stroke-width="8"
							stroke-opacity="0.25"
							stroke-linecap="round"
							style="pointer-events: none;"
						/>
						<line
							x1={ray.x1}
							y1={ray.y1}
							x2={ray.xFar}
							y2={ray.yFar}
							stroke="#3b82f6"
							stroke-width="2"
							stroke-dasharray="4 4"
							style="pointer-events: none;"
						/>
						<circle
							cx={ray.x1}
							cy={ray.y1}
							r="6.5"
							fill="#3b82f6"
							stroke="#ffffff"
							stroke-width="1.5"
							class="burst-handle-node"
							onpointerdown={(e) => handlePointerDown(e, `burstline-burstBottomRight-${ray.id}`, 'move')}
						/>
						<circle
							cx={ray.x2}
							cy={ray.y2}
							r="6"
							fill="#60a5fa"
							stroke="#ffffff"
							stroke-width="1.5"
							class="burst-rotate-node"
							onpointerdown={(e) => handlePointerDown(e, `burstline-burstBottomRight-${ray.id}`, 'rotate')}
						/>
						<line x1={ray.x1} y1={ray.y1} x2={ray.x2} y2={ray.y2} stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="2 2" style="pointer-events: none;" />
					{/if}
				{/each}
			</g>
		{/if}

		<!-- 3. Top-Left Corner Vector Burst Lines -->
		{#if params.burstTopLeft.show}
			<g style="transform: translate({params.burstTopLeft.originOffset}px, {params.burstTopLeft.originOffset}px);">
				{#each rayTopLeft as ray}
					<!-- Wide Invisible Hit Line -->
					<line
						x1={ray.x1}
						y1={ray.y1}
						x2={ray.xFar}
						y2={ray.yFar}
						stroke="transparent"
						stroke-width="24"
						class="burst-line-hit"
						onpointerenter={() => (hoveredBurstKey = `burstline-burstTopLeft-${ray.id}`)}
						onpointerleave={() => (hoveredBurstKey = null)}
						onpointerdown={(e) => handlePointerDown(e, `burstline-burstTopLeft-${ray.id}`, 'move')}
					/>

					{#if hoveredBurstKey === `burstline-burstTopLeft-${ray.id}` || selectedElement === `burstline-burstTopLeft-${ray.id}`}
						<line
							x1={ray.x1}
							y1={ray.y1}
							x2={ray.xFar}
							y2={ray.yFar}
							stroke="#3b82f6"
							stroke-width="8"
							stroke-opacity="0.25"
							stroke-linecap="round"
							style="pointer-events: none;"
						/>
						<line
							x1={ray.x1}
							y1={ray.y1}
							x2={ray.xFar}
							y2={ray.yFar}
							stroke="#3b82f6"
							stroke-width="2"
							stroke-dasharray="4 4"
							style="pointer-events: none;"
						/>
						<circle
							cx={ray.x1}
							cy={ray.y1}
							r="6.5"
							fill="#3b82f6"
							stroke="#ffffff"
							stroke-width="1.5"
							class="burst-handle-node"
							onpointerdown={(e) => handlePointerDown(e, `burstline-burstTopLeft-${ray.id}`, 'move')}
						/>
						<circle
							cx={ray.x2}
							cy={ray.y2}
							r="6"
							fill="#60a5fa"
							stroke="#ffffff"
							stroke-width="1.5"
							class="burst-rotate-node"
							onpointerdown={(e) => handlePointerDown(e, `burstline-burstTopLeft-${ray.id}`, 'rotate')}
						/>
						<line x1={ray.x1} y1={ray.y1} x2={ray.x2} y2={ray.y2} stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="2 2" style="pointer-events: none;" />
					{/if}
				{/each}
			</g>
		{/if}

		<!-- 4. Top-Right Corner Vector Burst Lines -->
		{#if params.burstTopRight.show}
			<g style="transform: translate(calc(100vw - {params.burstTopRight.originOffset}px), {params.burstTopRight.originOffset}px);">
				{#each rayTopRight as ray}
					<!-- Wide Invisible Hit Line -->
					<line
						x1={ray.x1}
						y1={ray.y1}
						x2={ray.xFar}
						y2={ray.yFar}
						stroke="transparent"
						stroke-width="24"
						class="burst-line-hit"
						onpointerenter={() => (hoveredBurstKey = `burstline-burstTopRight-${ray.id}`)}
						onpointerleave={() => (hoveredBurstKey = null)}
						onpointerdown={(e) => handlePointerDown(e, `burstline-burstTopRight-${ray.id}`, 'move')}
					/>

					{#if hoveredBurstKey === `burstline-burstTopRight-${ray.id}` || selectedElement === `burstline-burstTopRight-${ray.id}`}
						<line
							x1={ray.x1}
							y1={ray.y1}
							x2={ray.xFar}
							y2={ray.yFar}
							stroke="#3b82f6"
							stroke-width="8"
							stroke-opacity="0.25"
							stroke-linecap="round"
							style="pointer-events: none;"
						/>
						<line
							x1={ray.x1}
							y1={ray.y1}
							x2={ray.xFar}
							y2={ray.yFar}
							stroke="#3b82f6"
							stroke-width="2"
							stroke-dasharray="4 4"
							style="pointer-events: none;"
						/>
						<circle
							cx={ray.x1}
							cy={ray.y1}
							r="6.5"
							fill="#3b82f6"
							stroke="#ffffff"
							stroke-width="1.5"
							class="burst-handle-node"
							onpointerdown={(e) => handlePointerDown(e, `burstline-burstTopRight-${ray.id}`, 'move')}
						/>
						<circle
							cx={ray.x2}
							cy={ray.y2}
							r="6"
							fill="#60a5fa"
							stroke="#ffffff"
							stroke-width="1.5"
							class="burst-rotate-node"
							onpointerdown={(e) => handlePointerDown(e, `burstline-burstTopRight-${ray.id}`, 'rotate')}
						/>
						<line x1={ray.x1} y1={ray.y1} x2={ray.x2} y2={ray.y2} stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="2 2" style="pointer-events: none;" />
					{/if}
				{/each}
			</g>
		{/if}
	</svg>
</div>

<style>
	/* Universal Reset for Browser Default Focus Rectangle Highlights */
	:global(svg),
	:global(svg *),
	:global(circle),
	:global(g),
	:global(path),
	:global(line) {
		outline: none !important;
		-webkit-tap-highlight-color: transparent !important;
		box-shadow: none !important;
	}

	:global(circle:focus),
	:global(circle:focus-visible),
	:global(g:focus),
	:global(g:focus-visible) {
		outline: none !important;
		border: none !important;
	}

	.wallpaper-container {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		transition: background-color 0.15s ease;
		user-select: none;
	}

	.layer {
		position: absolute;
		inset: 0;
	}

	.passthrough-layer,
	.burst-svg,
	.circles-svg,
	.glow,
	.grid-svg,
	.cross-svg,
	.vignette-layer,
	.god-rays,
	.noise-wrapper {
		pointer-events: none !important;
	}

	.interactive-badge {
		pointer-events: auto !important;
		cursor: grab;
		position: absolute;
		outline: 1px dashed transparent;
		transition: outline 0.15s ease, box-shadow 0.15s ease;
	}

	.interactive-badge:hover {
		outline: 2px dashed rgba(59, 130, 246, 0.7);
	}

	.interactive-badge.selected {
		outline: 2px solid #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
	}

	.interactive-badge:active {
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
		z-index: 10;
		pointer-events: auto !important;
	}

	.interactive-badge:hover .badge-resize-handle,
	.interactive-badge.selected .badge-resize-handle {
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
		pointer-events: none;
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
		pointer-events: none;
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
