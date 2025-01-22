<template>
	<div class="block">
		<slot></slot>
		<UIButton v-if="onDelete" label="Remove Block" @click="onDelete" />
	</div>
</template>

<script setup>
import UIButton from '../UIButton.vue';

defineProps({
	onDelete: {
		type: Function,
		default: null,
	},
});
</script>

<style lang="scss" scoped></style>
