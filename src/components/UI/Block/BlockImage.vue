<template>
	<BlockWrapper role="figure" class="lq-front-block-image">
		<img :src="'/assets/banner-' + image + '.webp'" :alt="alt" />
	</BlockWrapper>
</template>

<script setup>
import BlockWrapper from './BlockWrapper.vue';

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
@forward '../../../assets/scss/front/front-block-image';
</style>
