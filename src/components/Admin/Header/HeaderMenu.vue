<template>
	<div
		role="menubar"
		class="adminui-menubar"
		:class="{ 'adminui-menubar--active': openSidebar }"
	>
		<Button
			role="menuitem"
			aria-label="Add Element"
			icon="pi pi-plus"
			severity="contrast"
			@click="$emit('add-element')"
		/>

		<Button
			role="menuitem"
			aria-label="Download"
			icon="pi pi-download"
			severity="contrast"
			@click="$emit('download')"
		/>
	</div>
</template>

<script setup>
import { Button } from 'primevue';

defineProps({
	openSidebar: {
		type: Boolean,
		default: false,
		required: true,
	},
});

defineEmits(['add-element', 'download']);
</script>

<style lang="scss" scoped>
@use '@styles/utils/utils' as *;

.adminui-menubar {
	display: none;
	flex-flow: row wrap;
	justify-content: center;
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	margin: $spacing-md;
	padding: $spacing-sm;
	border-radius: var(--lq-border-radius-md);
	background: var(--lq-button-contrast-background, $color-mono-dark);

	// Element: Button
	button[role='menuitem'] {
		margin-right: $spacing-sm;

		&:last-child {
			margin-right: 0;
		}
	}

	// State: Active
	&--active {
		display: flex;
	}

	// Hide element in tablets and lower screens
	@include bp(min-width, md) {
		display: none;
	}
}
</style>
