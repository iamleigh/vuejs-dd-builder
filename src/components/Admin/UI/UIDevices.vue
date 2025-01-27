<template>
	<aside class="leighton-quito-builder-devices" aria-label="Device Selection">
		<Button
			aria-label="Desktop View"
			icon="pi pi-desktop"
			class="leighton-quito-builder-devices__item"
			:disabled="'desktop' === selected ? true : false"
			@click="$emit('resize-desktop')"
		/>

		<Button
			aria-label="Tablet View"
			icon="pi pi-tablet"
			class="leighton-quito-builder-devices__item"
			:disabled="'tablet' === selected ? true : false"
			@click="$emit('resize-tablet')"
		/>

		<Button
			aria-label="Mobile View"
			icon="pi pi-mobile"
			class="leighton-quito-builder-devices__item"
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
@forward '../../../assets/scss/builder/builder-devices';
</style>
