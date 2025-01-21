<template>
	<aside
		class="leighton-quito-sidebar"
		:class="{
			'sidebar--float': float,
			'leighton-quito-sidebar--vertical': vertical,
		}"
	>
		<h3 v-if="title" class="sidebar__title">{{ title }}</h3>
		<slot></slot>
	</aside>
</template>

<script setup>
defineProps({
	title: {
		type: String,
		default: null,
	},
	float: {
		type: Boolean,
		default: false,
	}, // TBD: Add styles for this variation
	vertical: {
		type: Boolean,
		default: false,
	},
});
</script>

<style lang="scss" scoped>
@forward '../../assets/scss/components/ui-sidebar';
</style>
