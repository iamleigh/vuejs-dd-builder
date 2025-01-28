<template>
	<header class="leighton-quito-builder-header">
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
@forward '@styles/builder/builder-header';
</style>
