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

<style lang="scss">
.sidebar {
	width: 200px;
	position: relative;
	background: #919191;
	padding: 10px;

	&__title {
		color: #fff;
	}

	&--float {
		position: absolute;
		left: 100%;
	}
}
</style>
