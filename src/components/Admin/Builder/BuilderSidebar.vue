<template>
	<aside class="adminui-sidebar">
		<Button
			class="leighton-quito-builder-sidebar__button"
			icon="pi pi-plus"
			aria-label="Add Element"
			:selected="openToolbox"
			:aria-selected="openToolbox"
			:severity="openToolbox ? 'primary' : 'contrast'"
			@click="$emit('add-element')"
		/>

		<Button
			class="adminui-sidebar__button"
			icon="pi pi-download"
			aria-label="Download"
			severity="contrast"
			@click="$emit('download')"
		/>
	</aside>
</template>

<script setup>
import { Button } from 'primevue';

defineProps({
	openToolbox: {
		type: Boolean,
		default: false,
	},
});

defineEmits(['add-element', 'download']);
</script>

<style lang="scss" scoped>
@use '@styles/utils/utils' as *;

.adminui-sidebar {
	overflow-y: auto;
	width: $sidebar-width;
	position: absolute;
	z-index: 100;
	top: #{68px + $spacing-lg};
	bottom: $spacing-lg;
	left: $spacing-lg;
	display: flex;
	flex-direction: column;
	padding: $spacing-lg $spacing-md;
	border-radius: var(--lq-border-radius-md);
	background: var(--lq-button-contrast-background, $color-mono-dark);
	color: white;

	@include bp(max-width, md) {
		display: none;
	}

	&__button {
		margin-bottom: $spacing-sm;

		&:last-child {
			margin-bottom: 0;
		}
	}
}
</style>
