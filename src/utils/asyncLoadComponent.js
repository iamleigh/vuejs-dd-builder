import { defineAsyncComponent } from 'vue';

/**
 * Utility for lazy loading Vue components
 *
 * @param {Function} loader - The import function for the component
 * @param {Object} options - Additional options for the async component
 * @returns {Object} - The async component definition
 */
export const asyncLoadComponent = (loader, options = {}) => {
	return defineAsyncComponent({
		loader,
		delay: 200,
		...options,
	});
};
