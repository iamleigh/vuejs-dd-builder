<template>
	<aside class="adminui-devices" aria-label="Device Selection">
		<Button
			aria-label="Desktop View"
			icon="pi pi-desktop"
			class="adminui-devices__item"
			:disabled="'desktop' === selected ? true : false"
			@click="$emit('resize-desktop')"
		/>

		<Button
			aria-label="Tablet View"
			icon="pi pi-tablet"
			class="adminui-devices__item"
			:disabled="'tablet' === selected ? true : false"
			@click="$emit('resize-tablet')"
		/>

		<Button
			aria-label="Mobile View"
			icon="pi pi-mobile"
			class="adminui-devices__item"
			:disabled="'mobile' === selected ? true : false"
			@click="$emit('resize-mobile')"
		/>
	</aside>
</template>

<script setup>
import { Button } from 'primevue';

const props = defineProps({
	selected: {
		type: String,
		default: 'desktop',
	},
});

defineEmits(['resize-desktop', 'resize-tablet', 'resize-mobile']);
</script>

<style lang="scss" scoped>
@use '@styles/utils/utils' as *;

.adminui-devices {
	position: fixed;
	z-index: 100;
	right: $spacing-lg;
	bottom: $spacing-lg;
	border-radius: var(--lq-border-radius-md);

	// Hide element from medium to lower screens
	@include bp(max-width, md) {
		display: none;
	}

	// Element: Device Item
	&__item {
		margin-right: $spacing-sm;

		&:last-child {
			margin-right: 0;
		}
	}
}
</style>
