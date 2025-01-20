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
		height: 100%;
		position: absolute;
		top: 0;
		left: 100%;
		margin-left: 1px; // Remove later
	}

	&__list {
		margin: 0;
		padding: 0;
		list-style: none;

		li {
			cursor: move;
			margin: 16px 0;
			padding: 8px;
			background: #fff;

			&.sortable-chosen {
				box-shadow: 0 0 4px black;
			}

			// STATE: When element is being moved
			// &.sortable-ghost {
			// 	background: blue;
			// }

			&:first-child {
				margin-top: 0;
			}

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
}
</style>
