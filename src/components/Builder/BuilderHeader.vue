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
import HeaderBar from '@header/HeaderBar.vue';
import HeaderMenu from '@header/HeaderMenu.vue';

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
@forward '../../assets/scss/builder/builder-header';
</style>
