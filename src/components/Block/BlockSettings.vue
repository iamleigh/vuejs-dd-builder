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
	},
});
</script>

<style lang="scss" scoped>
@forward '../../assets/scss/block/block-settings';
</style>
