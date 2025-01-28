<template>
	<h1 class="leighton-quito-logo" :class="setClass">
		<img
			src="@images/logo.svg"
			alt="Logo icon"
			class="leighton-quito-logo__icon"
		/>
		<span class="leighton-quito-logo__text">Leighton Quito</span>
	</h1>
</template>

<script setup>
defineProps({
	setClass: {
		type: String,
		default: null,
	},
});
</script>

<style lang="scss">
@forward '@styles/ui/ui-logo.scss';
</style>
