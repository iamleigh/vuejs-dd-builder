<template>
	<header class="leighton-quito-header">
		<UILogo />

		<Button
			:aria-label="menuActive ? 'Open Sidebar' : 'Close Sidebar'"
			:icon="menuActive ? 'pi pi-times' : 'pi pi-bars'"
			severity="contrast"
			@click="$emit('click')"
		/>
	</header>
</template>

<script setup>
import UILogo from './UILogo.vue';
import { Button } from 'primevue';

defineProps({
	menuActive: {
		type: Boolean,
		default: false,
	},
});

defineEmits(['click']);
</script>

<style lang="scss">
@forward '../../assets/scss/components/ui-header';
</style>
