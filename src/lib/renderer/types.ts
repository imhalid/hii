export interface ColorParams {
	bgColor: string;
	gridColor: string;
	crossColor: string;
	badgeBgColor: string;
	badgeTextColor: string;
	badgeBorderColor: string;
	vignetteColor: string;
	burstColor: string;
	circlesColor: string;
	godRaysColor: string;
	glowColor: string;
}

export interface GridParams {
	show: boolean;
	size: number;
	lineWidth: number;
	opacity: number;
	type: 'lines' | 'dots';
}

export interface CrossParams {
	show: boolean;
	opacity: number;
	size: number;
	thickness: number;
}

export interface TextBadgeParams {
	show: boolean;
	text: string;
	opacity: number;
	gridX: number;
	gridY: number;
	spanGridWidth: number;
	spanGridHeight: number;
	fontSize: number;
	fontWeight: string;
	fontFamily: string;
	align: string;
	borderWidth: number;
}

export interface VignetteParams {
	show: boolean;
	opacity: number;
	coverage: number;
	softness: number;
	blendMode: string;
}

export interface GodRaysParams {
	show: boolean;
	opacity: number;
	blur: number;
	angle: number;
	scale: number;
	maskCoverage: number;
	seed: number;
	blendMode: string;
}

export interface NoiseParams {
	show: boolean;
	type: 'turbulence' | 'fractalNoise';
	monochrome: boolean;
	frequency: number;
	octaves: number;
	seed: number;
	opacity: number;
	invert: boolean;
	blendMode: string;
}

export interface EffectsParams {
	enableRadialGlow: boolean;
	glowOpacity: number;
}

export interface CircleItem {
	id: number;
	cxPct: number;
	cyPct: number;
	offsetX: number;
	offsetY: number;
	r: number;
	solidPath: string;
	dashedPath: string;
	dashArray: string;
	renderMode: string;
}

export interface RayItem {
	id: number;
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	xFar: number;
	yFar: number;
	dashArray?: string;
}

export interface WallpaperRenderParams {
	colors: ColorParams;
	grid: GridParams;
	cross: CrossParams;
	textBadge: TextBadgeParams;
	vignette: VignetteParams;
	godRays: GodRaysParams;
	noise: NoiseParams;
	effects: EffectsParams;
	circles: CircleItem[];
	rays: {
		bottomLeft: RayItem[];
		bottomRight: RayItem[];
		topLeft: RayItem[];
		topRight: RayItem[];
	};
	gridPan: { x: number; y: number };
}
