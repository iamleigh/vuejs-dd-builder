<template>
	<aside class="leighton-quito-builder-sidebar">
		<Button
			role="menuitem"
			class="leighton-quito-builder-sidebar__button"
			icon="pi pi-cog"
			aria-label="Open Settings"
			severity="contrast"
		/>

		<Button
			role="menuitem"
			class="leighton-quito-builder-sidebar__button"
			icon="pi pi-plus"
			aria-label="Add Element"
			severity="contrast"
			@click="$emit('add-element')"
		/>

		<Button
			role="menuitem"
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
</script>

<style lang="scss" scope>
@forward '../../assets/scss/builder/builder-sidebar';
</style>
