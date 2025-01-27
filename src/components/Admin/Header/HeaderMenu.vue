<template>
	<div
		role="menubar"
		class="leighton-quito-builder-menubar"
		:class="{ 'leighton-quito-builder-menubar--active': openSidebar }"
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
@forward '../../../assets/scss/builder/builder-menubar';
</style>
