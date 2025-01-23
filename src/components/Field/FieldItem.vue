<template>
	<div class="field-item">
		<label v-if="title" class="field-item__label">{{ title }}</label>
		<slot></slot>
		<span v-if="message" class="field-item__message">{{ message }}</span>
	</div>
</template>

<script setup>
defineProps({
	title: {
		type: String,
		default: null,
	},
	message: {
		type: String,
		default: null,
	},
});
</script>

<style lang="scss" scoped>
.field-item {
	margin-bottom: 16px;

	&:last-child {
		margin-bottom: 16px;
	}

	&__label {
		display: inline-block;
		margin-bottom: 8px;
		font-weight: 400;
		font-size: 16px;
		line-height: 20px;
	}

	&__message {
		display: block;
		margin-top: 4px;
		font-size: 14px;
		line-height: 16px;
	}
}
</style>
