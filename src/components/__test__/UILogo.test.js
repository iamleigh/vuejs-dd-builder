import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import UILogo from '../UI/UILogo.vue';

describe('UILogo', () => {
	it('renders the component properly', () => {
		const wrapper = mount(UILogo);

		// Check if the component renders
		expect(wrapper.exists()).toBe(true);
	});

	it('applies the default class to the logo', () => {
		const wrapper = mount(UILogo);

		// Ensure the default class is applied
		expect(wrapper.classes()).toContain('leighton-quito-logo');
	});

	it('applies the custom class passed via props', () => {
		const customClass = 'custom-logo-class';
		const wrapper = mount(UILogo, {
			props: {
				setClass: customClass,
			},
		});

		// Ensure the custom class is applied
		expect(wrapper.classes()).toContain(customClass);
	});

	it('renders the logo text correctly', () => {
		const wrapper = mount(UILogo);

		const logoText = wrapper.find('span');
		expect(logoText.exists()).toBe(true);
		expect(logoText.text()).toBe('Leighton Quito');
	});
});
