<template>
	<div class="adminui-loading">
		<div class="adminui-loading__block">
			<span
				class="adminui-loading__spinner pi"
				:class="{
					'pi-spinner pi-spin adminui-color--primary': 'loading' === status,
					'pi-check-circle adminui-color--success': 'complete' === status,
				}"
				aria-hidden="true"
			/>

			<h2
				class="adminui-subtitle adminui-color--dark adminui-spacing--bottom-sm"
			>
				{{ title }}
			</h2>
			<p v-if="message">{{ message }}</p>
		</div>
	</div>
</template>

<script setup>
defineProps({
	title: {
		type: String,
		default: 'Loading assets',
		required: true,
	},
	message: {
		type: String,
		default: null,
	},
	status: {
		type: String,
		default: 'loading',
		required: true,
		validator: (value) => {
			return ['loading', 'complete'].includes(value);
		},
	},
});
</script>

<style lang="scss" scoped>
.adminui-loading {
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	padding: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	background: rgb(237, 240, 252);
	background: -moz-linear-gradient(
		0deg,
		rgba(237, 240, 252, 1) 0%,
		rgba(229, 250, 254, 1) 100%
	);
	background: -webkit-linear-gradient(
		0deg,
		rgba(237, 240, 252, 1) 0%,
		rgba(229, 250, 254, 1) 100%
	);
	background: linear-gradient(
		0deg,
		rgba(237, 240, 252, 1) 0%,
		rgba(229, 250, 254, 1) 100%
	);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#edf0fc",endColorstr="#e5fafe",GradientType=1);

	&__block {
		position: relative;
		display: block;
		padding-left: 36px;
	}

	&__spinner {
		position: absolute;
		top: 0;
		left: 0;
		font-size: 20px;
	}
}
</style>
