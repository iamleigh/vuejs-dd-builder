<template>
	<menu class="menu">
		<slot></slot>
	</menu>
</template>

<style lang="scss">
.menu {
	display: block;
	margin: 0;
	padding: 0;

	button {
		// width: 100%;
		display: block;
		margin: 0 0 16px;

		&:last-child {
			margin: 0;
		}
	}
}
</style>
