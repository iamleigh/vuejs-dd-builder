/**
 * Gets bounding boxes for an element.
 *
 * @param {HTMLElement} element - The element to get the bounding boxes for.
 */
export const getElementBounds = (element) => {
	const bounds = element.getBoundingClientRect();
	const top = bounds.top + window.scrollY;
	const left = bounds.left + window.scrollX;

	return {
		x: left,
		y: top,
		top,
		left,
		width: bounds.width,
		height: bounds.height,
	};
};
