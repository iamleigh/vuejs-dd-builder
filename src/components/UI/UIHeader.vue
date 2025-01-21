<template>
	<header class="leighton-quito-header">
		<UILogo />

		<UIButton
			:label="menuActive ? 'Open Sidebar' : 'Close Sidebar'"
			:icon="menuActive ? 'close' : 'bars'"
			class="leighton-quito-header__button"
			:active="menuActive"
			@click="$emit('click')"
		/>
	</header>
</template>

<script setup>
import UIButton from './UIButton.vue';
import UILogo from './UILogo.vue';

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
