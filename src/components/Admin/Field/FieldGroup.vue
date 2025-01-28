<template>
	<div class="settings-field">
		<h4 v-if="title">{{ title }}</h4>
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
.settings-field {
	margin-bottom: 32px;
	color: #fff;

	&:last-child {
		margin-bottom: 0;
	}

	h4 {
		margin: 0 0 16px;
		font-weight: 600;
		font-size: 16px;
		line-height: 20px;
	}
}
</style>
