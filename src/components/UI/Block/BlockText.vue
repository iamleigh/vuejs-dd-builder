<template>
	<BlockWrapper>
		<p>{{ value }}</p>
	</BlockWrapper>
</template>

<script setup>
import BlockWrapper from './BlockWrapper.vue';

defineProps({
	value: {
		type: String,
		required: true,
	},
});
</script>

<style lang="scss" scoped>
p {
	color: blue;
}
</style>
