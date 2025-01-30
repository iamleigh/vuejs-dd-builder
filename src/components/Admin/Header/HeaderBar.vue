<template>
	<div class="adminui-topbar">
		<div class="adminui-topbar__left">
			<UILogo />
		</div>

		<div class="adminui-topbar__right">
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
import UILogo from '@admin/UI/UILogo.vue';
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
@use '@styles/utils/utils' as *;

.adminui-topbar {
	display: flex;
	padding: $spacing-md;
	background: var(--lq-button-contrast-background, $color-mono-dark);

	@include bp(min-width, md) {
		padding: $spacing-md $spacing-lg;
	}

	// Element: Left Content
	&__left {
		flex: 1;
	}

	// Element: Right Content
	&__right {
		flex: 0 0 auto;
		margin-left: $spacing-sm;

		@include bp(min-width, md) {
			display: none;
		}
	}
}
</style>
