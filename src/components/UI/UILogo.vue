<template>
	<h1 class="leighton-quito-logo" :class="setClass">
		<img
			src="../../assets/img/logo.svg"
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
	},
});
</script>

<style lang="scss">
@forward '../../assets/scss/ui/ui-logo';
</style>
