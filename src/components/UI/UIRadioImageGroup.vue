<template>
	<div class="radio-image-group">
		<UIRadioImage
			v-for="(option, index) in options"
			:key="index"
			:id="group"
			:label="option.label"
			:value="option.value"
			:checked="selectedValue === option.value"
			@update="updateSelection(option.value)"
		/>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import UIRadioImage from './UIRadioImage.vue';

// Define the emits for the component
const emit = defineEmits(['update']);

const props = defineProps({
	group: {
		type: Number,
		required: true,
	},
	options: {
		type: Array,
		required: true,
	},
	defaultOption: {
		type: String,
		default: null,
	},
});

// Init the selected value with the defaultOption prop
const selectedValue = ref(props.defaultOption);

// Update the selected value
const updateSelection = (value) => {
	selectedValue.value = value;

	// Emit the updated value to the parent
	emit('update', value);
};
</script>

<style lang="scss" scoped>
.radio-image-group {
	display: grid;
	gap: 8px;
	grid-template-columns: 1fr 1fr;

	.radio-image {
		display: block;
		flex: 0 0 50%;
		margin-right: 4px;

		&:last-child {
			margin-right: 0;
		}
	}
}
</style>
