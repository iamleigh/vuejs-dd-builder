<template>
	<menu
		class="leighton-quito-menu"
		:class="vertical ? 'leighton-quito-menu--vertical' : ''"
	>
		<UIButton
			v-for="(button, index) in buttons"
			:key="index"
			:label="button.label"
			:icon="button.icon"
			@click="button.clickFn"
			class="leighton-quito-menu__item"
		/>
	</menu>
</template>

<script setup>
import UIButton from './UIButton.vue';

defineProps({
	buttons: {
		type: Array,
		default: [],
		required: true,
	},
	vertical: {
		type: Boolean,
		default: false,
	},
});
</script>

<style lang="scss" scoped>
@forward '../../assets/scss/components/ui-menu';
</style>
