<template>
	<h1 class="adminui-subtitle adminui-logo" :class="setClass">
		<img src="@images/logo.svg" alt="Logo icon" class="adminui-logo__icon" />
		<span class="adminui-logo__text">Leighton Quito</span>
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

<style lang="scss" scoped>
@use '@styles/utils/utils' as *;

.adminui-logo {
	display: flex;
	align-items: center;
	color: var(--lq-slate-50);

	&__icon {
		width: 36px;
		height: 36px;
		flex: 0 0 auto;
		margin-right: $spacing-sm;
	}

	&__text {
		min-width: 1px;
		flex: 1;
		display: block;
	}
}
</style>
