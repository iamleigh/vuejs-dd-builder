<template>
	<div role="figure" class="lq-front-block-image">
		<img :src="'/assets/banner-' + image + '.webp'" :alt="alt" />
	</div>
</template>

<script setup>
const props = defineProps({
	alt: {
		type: String,
		default: 'Image without description',
	},
	image: {
		type: String,
		default: 'tourism',
	},
});
</script>

<style lang="scss" scoped>
@forward '../../assets/scss/front/front-block-image';
</style>
