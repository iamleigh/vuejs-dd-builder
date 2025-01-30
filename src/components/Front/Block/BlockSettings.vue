<template>
	<div class="leighton-quito-block-settings">
		<h3 v-if="title" class="leighton-quito-block-settings__title">
			{{ title }}
		</h3>

		<slot></slot>
	</div>
</template>

<script setup>
defineProps({
	title: {
		type: String,
		default: null,
	},
});
</script>

<style lang="scss" scoped>
@forward '@styles/block/block-settings';
</style>
