<template>
	<aside class="leighton-quito-builder-sidebar">
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
			class="leighton-quito-builder-sidebar__button"
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
@forward '../../assets/scss/builder/builder-sidebar';
</style>
