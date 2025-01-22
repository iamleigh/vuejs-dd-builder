<template>
	<header class="leighton-quito-builder-header">
		<div class="leighton-quito-builder-topbar">
			<div class="leighton-quito-builder-topbar__left">
				<UILogo />
			</div>

			<div class="leighton-quito-builder-topbar__right">
				<Button
					:aria-label="openSidebar ? 'Open Sidebar' : 'Close Sidebar'"
					:icon="openSidebar ? 'pi pi-times' : 'pi pi-bars'"
					severity="contrast"
					@click="$emit('click')"
				/>
			</div>
		</div>

		<div
			role="menubar"
			class="leighton-quito-builder-menubar"
			:class="{ 'leighton-quito-builder-menubar--active': openSidebar }"
		>
			<Button
				role="menuitem"
				aria-label="Open Settings"
				icon="pi pi-cog"
				severity="contrast"
			/>

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
	</header>
</template>

<script setup>
import { Button } from 'primevue';
import UILogo from '../UI/UILogo.vue';

defineProps({
	openSidebar: {
		type: Boolean,
		default: false,
	},
});

defineEmits(['click', 'add-element', 'download']);
</script>

<style lang="scss" scoped>
@forward '../../assets/scss/builder/builder-header';
@forward '../../assets/scss/builder/builder-topbar';
@forward '../../assets/scss/builder/builder-menubar';
</style>
