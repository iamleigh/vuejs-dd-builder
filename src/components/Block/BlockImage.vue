<template>
	<div role="figure" class="theme-image">
		<img :src="value" :alt="alt" :style="{ height: height + 'px' }" />
	</div>
</template>

<script setup>
const props = defineProps({
	alt: {
		type: String,
		default: 'Image without description',
	},
	value: {
		type: String,
		required: true,
	},
	height: {
		type: Number,
		default: null,
	},
});
</script>

<style lang="scss" scoped>
.theme-image {
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
}
</style>
