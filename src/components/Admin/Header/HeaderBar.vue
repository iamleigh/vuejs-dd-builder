<template>
	<div class="leighton-quito-builder-topbar">
		<div class="leighton-quito-builder-topbar__left">
			<UILogo />
		</div>

		<div class="leighton-quito-builder-topbar__right">
			<Button
				:aria-label="openSidebar ? 'Open Sidebar' : 'Close Sidebar'"
				:icon="openSidebar ? 'pi pi-times' : 'pi pi-bars'"
				severity="contrast"
				@click="$emit('toggleSidebar')"
			/>
		</div>
	</div>
</template>

<script setup>
import UILogo from '@UI/UILogo.vue';
import { Button } from 'primevue';

defineProps({
	openSidebar: {
		type: Boolean,
		default: false,
		required: true,
	},
});

defineEmits(['toggleSidebar']);
</script>

<style lang="scss" scoped>
@forward '../../../assets/scss/builder/builder-topbar';
</style>
