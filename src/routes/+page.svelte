<script lang="ts">
	import { createDialKitController } from 'dialkit/svelte';

	const dial = createDialKitController(
		'Wallpaper Dials',
		{
			// Main Background Color
			bgColor: '#C04A0D',

			// Grid Controls
			grid: {
				_collapsed: true,
				show: true,
				color: '#ffffff',
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
				color: '#ffffff',
				opacity: [0.35, 0, 1, 0.05],
				size: [10, 4, 60, 2],
				thickness: [1, 1, 8, 1]
			},

			// Typographic Grid-Snapped Text Badge ("Free Computer.")
			textBadge: {
				_collapsed: true,
				show: true,
				text: 'Free Computer.',
				bgColor: '#C04A0D',
				textColor: '#ffffff',
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
				borderWidth: [0, 0, 10, 1],
				borderColor: '#ffffff'
			},

			// Dedicated Cinematic Vignette Effect
			vignette: {
				_collapsed: true,
				show: true,
				color: '#000000',
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
				color: '#ffffff',
				opacity: [0.35, 0, 1, 0.05],
				count: [4, 0, 100, 1],
				thickness: [1, 0.5, 10, 0.5],
				seed: [1, 0, 100, 1],
				originOffset: [-100, -300, 100, 10],
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
				color: '#ffffff',
				opacity: [0.35, 0, 1, 0.05],
				count: [4, 0, 100, 1],
				thickness: [1, 0.5, 10, 0.5],
				seed: [2, 0, 100, 1],
				originOffset: [-100, -300, 100, 10],
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
				color: '#ffffff',
				opacity: [0.35, 0, 1, 0.05],
				count: [4, 0, 100, 1],
				thickness: [1, 0.5, 10, 0.5],
				seed: [3, 0, 100, 1],
				originOffset: [-100, -300, 100, 10],
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
				color: '#ffffff',
				opacity: [0.35, 0, 1, 0.05],
				count: [3, 0, 100, 1],
				thickness: [1, 0.5, 10, 0.5],
				seed: [45, 0, 100, 1],
				originOffset: [-100, -300, 100, 10],
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
				color: '#ffffff',
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
				color: '#000000',
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
				glowColor: '#FF8C00',
				glowOpacity: [0.35, 0, 1, 0.05]
			},

			// Reset Action Button
			resetAction: {
				type: 'action',
				label: '🔄 Reset to Defaults'
			}
		},
		{
			id: 'wallpaper-dialkit-config-v35',
			persist: true,
			onAction: (action) => {
				if (action === 'resetAction') {
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

	const MAX_ANGLE = 85;

	// Reactive linkage: when main bgColor changes, update textBadge.bgColor via dial.setValue()
	let prevBgColor = $state(dial.values.bgColor);
	$effect(() => {
		const currentBg = dial.values.bgColor;
		if (currentBg !== prevBgColor) {
			dial.setValue('textBadge.bgColor', currentBg);
			prevBgColor = currentBg;
		}
	});

	// Universal corner ray generator helper
	function generateCornerRays(
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

		if (count === 1) {
			const angleDeg = minAngle + pseudoRandom(1, 10) * maxArc;
			const rad = (angleDeg * Math.PI) / 180;
			const len = 3000;
			const isDashed = styleType === 'dashed' || (styleType === 'mix' && pseudoRandom(1, 30) > 0.5);
			lines.push({
				x2: Math.cos(rad) * len,
				y2: flipY ? Math.sin(rad) * len : -Math.sin(rad) * len,
				dashArray: isDashed ? `${dashLen} ${dashLen * 1.2}` : undefined
			});
			return lines;
		}

		// Generate count - 1 random gap weights using seed
		const weights: number[] = [];
		let totalWeight = 0;
		for (let i = 0; i < count - 1; i++) {
			const pr = pseudoRandom(i + 1, 100);
			const w = Math.pow(pr, 2.2) * 8 + 0.3;
			weights.push(w);
			totalWeight += w;
		}

		const padding = Math.min(2, maxArc / (count * 2));
		const availableArc = maxArc - padding * 2;

		let currentAngle = minAngle + padding;
		for (let i = 0; i < count; i++) {
			if (i > 0) {
				const gapFraction = weights[i - 1] / totalWeight;
				currentAngle += gapFraction * availableArc;
			}

			const rad = (currentAngle * Math.PI) / 180;
			const lenRand = pseudoRandom(i + 1, 200);
			const len = 3000 + lenRand * 1000;

			const x2 = Math.cos(rad) * len;
			const y2 = flipY ? Math.sin(rad) * len : -Math.sin(rad) * len;

			const styleRand = pseudoRandom(i + 1, 300);
			let isDashed = false;
			if (styleType === 'dashed') {
				isDashed = true;
			} else if (styleType === 'solid') {
				isDashed = false;
			} else {
				isDashed = styleRand > 0.5;
			}

			const dashArray = isDashed ? `${dashLen} ${dashLen * (1 + lenRand * 0.6)}` : undefined;

			lines.push({ x2, y2, dashArray });
		}

		return lines;
	}

	// 1. Bottom-Left Corner Rays
	const rayBottomLeft = $derived(generateCornerRays(params.burstBottomLeft, 2, 83, false));

	// 2. Bottom-Right Corner Rays
	const rayBottomRight = $derived(generateCornerRays(params.burstBottomRight, 97, 178, false));

	// 3. Top-Left Corner Rays
	const rayTopLeft = $derived(generateCornerRays(params.burstTopLeft, 2, 83, true));

	// 4. Top-Right Corner Rays
	const rayTopRight = $derived(generateCornerRays(params.burstTopRight, 97, 178, true));

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

	// Derived array of PERFECT circles with controlled probability of hybrid solid+dashed arcs
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
			const r = minR + pseudoRandom(i + 1, 30) * Math.max(maxR - minR, 1);

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
				cxPct,
				cyPct,
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
</script>

<div
	class="wallpaper-container"
	style:background-color={params.bgColor}
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
		<svg class="layer burst-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
			<g style="transform: translate({params.burstBottomLeft.originOffset}px, calc(100vh - {params.burstBottomLeft.originOffset}px));">
				{#each rayBottomLeft as ray}
					<line
						x1="0"
						y1="0"
						x2={ray.x2}
						y2={ray.y2}
						stroke={hexToRgba(params.burstBottomLeft.color, params.burstBottomLeft.opacity)}
						stroke-width={params.burstBottomLeft.thickness}
						stroke-dasharray={ray.dashArray}
						stroke-linecap="round"
					/>
				{/each}
			</g>
		</svg>
	{/if}

	{#if params.burstBottomRight.show}
		<svg class="layer burst-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
			<g style="transform: translate(calc(100vw - {params.burstBottomRight.originOffset}px), calc(100vh - {params.burstBottomRight.originOffset}px));">
				{#each rayBottomRight as ray}
					<line
						x1="0"
						y1="0"
						x2={ray.x2}
						y2={ray.y2}
						stroke={hexToRgba(params.burstBottomRight.color, params.burstBottomRight.opacity)}
						stroke-width={params.burstBottomRight.thickness}
						stroke-dasharray={ray.dashArray}
						stroke-linecap="round"
					/>
				{/each}
			</g>
		</svg>
	{/if}

	{#if params.burstTopLeft.show}
		<svg class="layer burst-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
			<g style="transform: translate({params.burstTopLeft.originOffset}px, {params.burstTopLeft.originOffset}px);">
				{#each rayTopLeft as ray}
					<line
						x1="0"
						y1="0"
						x2={ray.x2}
						y2={ray.y2}
						stroke={hexToRgba(params.burstTopLeft.color, params.burstTopLeft.opacity)}
						stroke-width={params.burstTopLeft.thickness}
						stroke-dasharray={ray.dashArray}
						stroke-linecap="round"
					/>
				{/each}
			</g>
		</svg>
	{/if}

	{#if params.burstTopRight.show}
		<svg class="layer burst-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
			<g style="transform: translate(calc(100vw - {params.burstTopRight.originOffset}px), {params.burstTopRight.originOffset}px);">
				{#each rayTopRight as ray}
					<line
						x1="0"
						y1="0"
						x2={ray.x2}
						y2={ray.y2}
						stroke={hexToRgba(params.burstTopRight.color, params.burstTopRight.opacity)}
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
		<svg class="layer circles-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
			{#each circleList as c}
				<g style="transform: translate({c.cxPct}vw, {c.cyPct}vh);">
					{#if c.renderMode === 'solid'}
						<circle
							cx="0"
							cy="0"
							r={c.r}
							fill="none"
							stroke={hexToRgba(params.randomCircles.color, params.randomCircles.opacity)}
							stroke-width={params.randomCircles.thickness}
						/>
					{:else if c.renderMode === 'dashed'}
						<circle
							cx="0"
							cy="0"
							r={c.r}
							fill="none"
							stroke={hexToRgba(params.randomCircles.color, params.randomCircles.opacity)}
							stroke-width={params.randomCircles.thickness}
							stroke-dasharray={c.dashArray}
						/>
					{:else}
						<path
							d={c.solidPath}
							fill="none"
							stroke={hexToRgba(params.randomCircles.color, params.randomCircles.opacity)}
							stroke-width={params.randomCircles.thickness}
							stroke-linecap="round"
						/>
						<path
							d={c.dashedPath}
							fill="none"
							stroke={hexToRgba(params.randomCircles.color, params.randomCircles.opacity)}
							stroke-width={params.randomCircles.thickness}
							stroke-dasharray={c.dashArray}
							stroke-linecap="round"
						/>
					{/if}
				</g>
			{/each}
		</svg>
	{/if}

	<!-- LAYER 3 (z-index 40): Radial Glow -->
	{#if params.effects.enableRadialGlow}
		<div
			class="layer glow"
			style:background="radial-gradient(circle at 50% 50%, {hexToRgba(
				params.effects.glowColor,
				params.effects.glowOpacity
			)} 0%, transparent 70%)"
		></div>
	{/if}

	<!-- LAYER 4 (z-index 70): Typographic Grid-Snapped Text Badge ("Free Computer.") -->
	{#if params.textBadge.show}
		<div
			class="layer text-badge-layer"
			style:left="{params.textBadge.gridX * params.grid.size}px"
			style:top="{params.textBadge.gridY * params.grid.size}px"
			style:width="{params.textBadge.spanGridWidth * params.grid.size}px"
			style:height="{params.textBadge.spanGridHeight * params.grid.size}px"
			style:background-color={hexToRgba(params.textBadge.bgColor, params.textBadge.opacity)}
			style:color={params.textBadge.textColor}
			style:border="{params.textBadge.borderWidth}px solid {params.textBadge.borderColor}"
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
			style:transition="all 0.15s ease"
		>
			<span>{params.textBadge.text}</span>
		</div>
	{/if}

	<!-- LAYER 5 (z-index 80): Base Grid Lines (Rendered ON TOP of badge borders, interior masked out!) -->
	<svg class="layer grid-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
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
							stroke={hexToRgba(params.grid.color, params.grid.opacity)}
							stroke-width={params.grid.lineWidth}
						/>
						<!-- Vertical Grid Line at left origin x=0 -->
						<line
							x1="0"
							y1="0"
							x2="0"
							y2={params.grid.size}
							stroke={hexToRgba(params.grid.color, params.grid.opacity)}
							stroke-width={params.grid.lineWidth}
						/>
					{:else if params.grid.type === 'dots'}
						<circle
							cx="0"
							cy="0"
							r={params.grid.lineWidth}
							fill={hexToRgba(params.grid.color, params.grid.opacity)}
						/>
					{/if}
				{/if}
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#grid-pattern)" mask="url(#badge-interior-mask)" />
	</svg>

	<!-- LAYER 6 (z-index 85): Plus (+) Cross Markers (Rendered ON TOP of badge borders, interior masked out!) -->
	{#if params.cross.show}
		<svg class="layer cross-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
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
						stroke={hexToRgba(params.cross.color, params.cross.opacity)}
						stroke-width={params.cross.thickness}
						stroke-linecap="square"
					/>
					<!-- Vertical arm -->
					<line
						x1={cx}
						y1={cy - half}
						x2={cx}
						y2={cy + half}
						stroke={hexToRgba(params.cross.color, params.cross.opacity)}
						stroke-width={params.cross.thickness}
						stroke-linecap="square"
					/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#cross-pattern)" mask="url(#badge-interior-mask)" />
		</svg>
	{/if}

	<!-- LAYER 7 (z-index 88): Dedicated Cinematic Vignette Layer (Rendered OVER text badge & background!) -->
	{#if params.vignette.show}
		<div
			class="layer vignette-layer"
			style:mix-blend-mode={params.vignette.blendMode}
			style:background="radial-gradient(ellipse at 50% 50%, transparent {params.vignette.coverage}%, {hexToRgba(
				params.vignette.color,
				params.vignette.opacity
			)} {params.vignette.coverage + params.vignette.softness}%)"
		></div>
	{/if}

	<!-- LAYER 8 (z-index 90): Multi-Layered Volumetric Shadow Rays (God Rays) -->
	{#if params.godRays.show}
		<div
			class="layer god-rays"
			style:filter="blur({params.godRays.blur}px)"
			style:mix-blend-mode={params.godRays.blendMode}
			style:background-image="
				repeating-linear-gradient(
					{params.godRays.angle}deg,
					{hexToRgba(params.godRays.color, params.godRays.opacity)} 0%,
					{hexToRgba(params.godRays.color, params.godRays.opacity)} 2.3%,
					transparent 4.1%,
					transparent 9.7%,
					{hexToRgba(params.godRays.color, params.godRays.opacity)} 11.2%,
					{hexToRgba(params.godRays.color, params.godRays.opacity)} 17.5%,
					transparent 21.8%,
					transparent 24.1%,
					{hexToRgba(params.godRays.color, params.godRays.opacity)} 31.4%,
					{hexToRgba(params.godRays.color, params.godRays.opacity)} 32.8%,
					transparent 39.2%,
					transparent 44.5%,
					{hexToRgba(params.godRays.color, params.godRays.opacity)} 48.1%,
					{hexToRgba(params.godRays.color, params.godRays.opacity)} 57.3%,
					transparent 63.9%,
					transparent 69.1%,
					{hexToRgba(params.godRays.color, params.godRays.opacity)} 74.2%,
					{hexToRgba(params.godRays.color, params.godRays.opacity)} 78.6%,
					transparent 85.3%,
					transparent 92.1%,
					{hexToRgba(params.godRays.color, params.godRays.opacity)} 96.4%,
					transparent 100%
				),
				repeating-linear-gradient(
					{params.godRays.angle + 7}deg,
					{hexToRgba(params.godRays.color, params.godRays.opacity * 0.7)} 0%,
					{hexToRgba(params.godRays.color, params.godRays.opacity * 0.7)} 1.1%,
					transparent 6.3%,
					transparent 12.4%,
					{hexToRgba(params.godRays.color, params.godRays.opacity * 0.7)} 15.8%,
					{hexToRgba(params.godRays.color, params.godRays.opacity * 0.7)} 19.2%,
					transparent 28.5%,
					transparent 33.1%,
					{hexToRgba(params.godRays.color, params.godRays.opacity * 0.7)} 41.7%,
					{hexToRgba(params.godRays.color, params.godRays.opacity * 0.7)} 45.2%,
					transparent 52.6%,
					transparent 61.3%,
					{hexToRgba(params.godRays.color, params.godRays.opacity * 0.7)} 68.9%,
					{hexToRgba(params.godRays.color, params.godRays.opacity * 0.7)} 71.4%,
					transparent 81.2%,
					transparent 89.6%,
					{hexToRgba(params.godRays.color, params.godRays.opacity * 0.7)} 93.7%,
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
			class="layer noise-wrapper"
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
</div>

<style>
	.wallpaper-container {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		transition: background-color 0.15s ease;
	}

	.layer {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.burst-svg {
		z-index: 20;
	}

	.circles-svg {
		z-index: 30;
	}

	.glow {
		z-index: 40;
	}

	.text-badge-layer {
		z-index: 70;
	}

	.grid-svg {
		z-index: 80;
	}

	.cross-svg {
		z-index: 85;
	}

	.vignette-layer {
		z-index: 88;
	}

	.god-rays {
		z-index: 90;
	}

	.noise-wrapper {
		z-index: 100;
	}

	:global(.dialkit-action-button),
	:global(.dialkit-actions-group) {
		margin-bottom: 13px !important;
	}
</style>
