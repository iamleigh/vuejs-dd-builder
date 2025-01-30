<template>
	<header class="adminui-header">
		<HeaderBar :open-sidebar="openSidebar" @toggle-sidebar="$emit('click')" />
		<HeaderMenu
			:open-sidebar="openSidebar"
			@add-element="$emit('add-element')"
			@download="$emit('download')"
		/>
	</header>
</template>

<script setup>
import HeaderBar from '@admin/Header/HeaderBar.vue';
import HeaderMenu from '@admin/Header/HeaderMenu.vue';

defineProps({
	openSidebar: {
		type: Boolean,
		default: false,
		required: true,
	},
});

defineEmits(['click', 'add-element', 'download']);
</script>

<style lang="scss" scoped>
@use '@styles/utils/utils' as *;

.adminui-header {
	@include bp(max-width, md) {
		position: sticky;
		z-index: 100;
		top: 0;
		left: 0;
	}

	@include bp(min-width, md) {
		flex: 0 0 auto;
	}
}
</style>
