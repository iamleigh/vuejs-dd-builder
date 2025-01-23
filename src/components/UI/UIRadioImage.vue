<template>
	<label
		:for="'element-' + id + '-image--' + value"
		class="radio-image"
		:class="{ 'radio-image--selected': checked }"
		:style="{ backgroundImage: `url('${value}')` }"
		:aria-label="'Select ' + label + ' Image'"
	>
		<input
			type="radio"
			:id="'element-' + id + '-image--' + value"
			:name="'element-' + id + '-image'"
			:value="value"
			:checked="checked"
			@change="$emit('update', value)"
		/>
	</label>
</template>

<script setup>
defineProps({
	id: {
		type: Number,
		required: true,
	},
	label: {
		type: String,
	},
	value: {
		type: String,
		required: true,
	},
	checked: {
		type: Boolean,
		default: false,
	},
});
</script>

<style lang="scss" scoped>
.radio-image {
	cursor: pointer;
	width: 100%;
	height: 132px;
	opacity: 0.4;
	display: block;
	background-repeat: no-repeat;
	background-size: cover;

	input {
		opacity: 0;
	}

	&--selected {
		opacity: 1;
	}
}
</style>
