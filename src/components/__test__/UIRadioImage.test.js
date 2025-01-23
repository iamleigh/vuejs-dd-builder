import { expect, describe, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UIRadioImage from '../UI/UIRadioImage.vue';

describe('UIRadioImage', () => {
	const props = {
		id: 123,
		label: 'Test Image',
		value: 'https://example.com/image.jpg',
		checked: false,
	};

	it('renders the correct label and attribute', () => {
		const wrapper = mount(UIRadioImage, {
			props,
		});

		// Check label attributes
		const label = wrapper.find('label');
		expect(label.attributes('for')).toBe(
			`element-${props.id}-image--${props.value}`,
		);
		expect(label.attributes('aria-label')).toBe(`Select ${props.label} Image`);
		expect(label.attributes('style')).toContain(
			`background-image: url(${props.value})`,
		);

		// Check input attributes
		const input = wrapper.find('input');
		expect(input.attributes('id')).toBe(
			`element-${props.id}-image--${props.value}`,
		);
		expect(input.attributes('name')).toBe(`element-${props.id}-image`);
		expect(input.attributes('type')).toBe('radio');
		expect(input.attributes('value')).toBe(props.value);
	});

	it('applies the "radio-image--selected" class when checked', () => {
		const wrapper = mount(UIRadioImage, {
			props: {
				...props,
				checked: true,
			},
		});

		// Check if the selected class is applied
		expect(wrapper.find('label').classes()).toContain('radio-image--selected');
	});

	it('does not apply the "radio-image--selected" class when not checked', () => {
		const wrapper = mount(UIRadioImage, {
			props: {
				...props,
				checked: false,
			},
		});

		// Check if the selected class is not applied
		expect(wrapper.find('label').classes()).not.toContain(
			'radio-image--selected',
		);
	});

	it('emits the "update" event with the correct value when changed', async () => {
		const wrapper = mount(UIRadioImage, {
			props,
		});

		// Simulate a change event
		await wrapper.find('input').setValue();

		// Check if the update event is emitted with the correct value
		expect(wrapper.emitted('update')).toBeTruthy();
		expect(wrapper.emitted('update')[0]).toEqual([props.value]);
	});
});
