<script setup>
defineProps({
	title: {
		type: String,
		default: null,
	},
});
</script>

<template>
	<aside class="sidebar">
		<h3 v-if="title" class="sidebar__title">{{ title }}</h3>
		<slot></slot>
	</aside>
</template>

<style lang="scss">
.sidebar {
	width: 200px;
	background: #919191;
	padding: 10px;

	&__title {
		color: #fff;
	}
}
</style>
