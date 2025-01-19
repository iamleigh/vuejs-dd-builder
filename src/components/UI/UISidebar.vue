<script setup>
defineProps({
	title: {
		type: String,
		default: null,
	},
	float: {
		type: Boolean,
		default: false,
	},
});
</script>

<template>
	<aside class="sidebar" :class="{ 'sidebar--float': float }">
		<h3 v-if="title" class="sidebar__title">{{ title }}</h3>
		<slot></slot>
	</aside>
</template>

<style lang="scss" scoped>
.sidebar {
	width: 200px;
	position: relative;
	background: #919191;
	padding: 10px;

	&__title {
		color: #fff;
	}

	&--float {
		height: 100%;
		position: absolute;
		top: 0;
		left: 100%;
		margin-left: 1px; // Remove later
	}
}
</style>
