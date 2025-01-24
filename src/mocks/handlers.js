import { http, HttpResponse } from 'msw';

export const handlers = [
	http.get('/api/elements', () => {
		return HttpResponse.json([
			{
				type: 'TextElement',
				label: 'Text Element',
				value: 'The quick brown fox jumps over the lazy dog.',
				container: {
					height: null,
					vPadding: 30,
					hPadding: 30,
					background: '#fff',
				},
			},
			{
				type: 'ImageElement',
				label: 'Image Element',
				value: '/assets/banner-tourism.webp',
				container: {
					height: 240,
					vPadding: 30,
					hPadding: 30,
					background: '#fff',
				},
			},
		]);
	}),

	http.get('/api/canvas', () => {
		return HttpResponse.json([]);
	}),
];
