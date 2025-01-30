import { test, expect, describe, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UIRadioImage from '@admin/UI/UIRadioImage.vue';
import UIRadioImageGroup from '@admin/UI/UIRadioImageGroup.vue';

describe('UIRadioImageGroup', () => {
	const options = [
		{ label: 'Option 1', value: 'option1' },
		{ label: 'Option 2', value: 'option2' },
		{ label: 'Option 3', value: 'option3' },
	];

	it('renders the correct number of UIRadioImage components', () => {
		const wrapper = mount(UIRadioImageGroup, {
			props: {
				group: 1,
				options,
				defaultOption: 'option2',
			},
		});

		// Ensure the correct number of radio images are rendered
		const radioImages = wrapper.findAllComponents(UIRadioImage);
		expect(radioImages.length).toBe(options.length);
	});

	it('passes the correct props to UIRadioImage components', () => {
		const wrapper = mount(UIRadioImageGroup, {
			props: {
				group: 1,
				options,
				defaultOption: 'option2',
			},
		});

		// Check the props for each UIRadioImage
		const radioImages = wrapper.findAllComponents(UIRadioImage);
		options.forEach((option, index) => {
			expect(radioImages[index].props()).toMatchObject({
				id: 1,
				label: option.label,
				value: option.value,
				checked: option.value === 'option2', // Should match the defaultOption
			});
		});
	});

	it('selects the correct default option', () => {
		const wrapper = mount(UIRadioImageGroup, {
			props: {
				group: 1,
				options,
				defaultOption: 'option2',
			},
		});

		// Ensure the correct option is selected
		const radioImages = wrapper.findAllComponents(UIRadioImage);
		const selectedImage = radioImages.find((img) => img.props('checked'));
		expect(selectedImage.props('value')).toBe('option2');
	});

	it('updates the selected value when a radio image is clicked', async () => {
		const wrapper = mount(UIRadioImageGroup, {
			props: {
				group: 1,
				options,
				defaultOption: 'option2',
			},
		});

		// Simulate clicking on the first option
		const radioImages = wrapper.findAllComponents(UIRadioImage);
		await radioImages[0].find('input').setValue();

		// Check if the selected value is updated
		expect(wrapper.emitted('update')).toBeTruthy();
		expect(wrapper.emitted('update')[0]).toEqual(['option1']);
	});

	it('ensures only one option is selected at a time', async () => {
		const wrapper = mount(UIRadioImageGroup, {
			props: {
				group: 1,
				options,
				defaultOption: 'option2',
			},
		});

		// Simulate selecting multiple options
		const radioImages = wrapper.findAllComponents(UIRadioImage);
		await radioImages[0].find('input').setValue();
		await radioImages[2].find('input').setValue();

		// Ensure the last selected option is the only one selected
		const selectedImages = radioImages.filter((img) => img.props('checked'));
		expect(selectedImages.length).toBe(1);
		expect(selectedImages[0].props('value')).toBe('option3');
	});
});
