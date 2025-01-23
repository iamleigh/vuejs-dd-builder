<template>
	<div role="figure" class="lq-front-block-image">
		<img :src="value" :alt="alt" />
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
});
</script>

<style lang="scss" scoped>
@forward '../../assets/scss/front/front-block-image';
</style>
