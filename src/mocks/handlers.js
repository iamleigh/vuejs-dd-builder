import { http, HttpResponse } from 'msw';

let canvasData = [];

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
		return HttpResponse.json(canvasData);
	}),

	http.put('/api/canvas', async ({ request }) => {
		const newElement = await request.json();
		canvasData.push(newElement);

		return HttpResponse.json(canvasData);
	}),

	http.delete('/api/canvas', async ({ request }) => {
		const { id } = await request.json();
		canvasData = canvasData.filter((element) => element.id !== id);

		return HttpResponse.json(canvasData);
	}),

	http.patch('/api/canvas', async ({ request }) => {
		const { id, newIndex } = await request.json();
		const elementIndex = canvasData.findIndex((element) => element.id === id);

		if (elementIndex !== -1) {
			const [element] = canvasData.splice(elementIndex, 1);
			canvasData.splice(newIndex, 0, element);
		}

		return HttpResponse.json(canvasData);
	}),
];
