<template>
	<div class="builder-mask">
		<img
			src="../../../assets/placeholder-image.svg"
			alt="Image of an element being dragged"
		/>
		<p>Drop content blocks from the sidebar here</p>
	</div>
</template>

<style lang="scss" scoped>
.builder-mask {
	pointer-events: none;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	padding: 24px;
	border: 2px dashed #ccc;
	text-align: center;

	img {
		display: block;
		margin: 0 auto;
	}

	p {
		margin: 24px 0 0;
		text-align: center;
	}
}
</style>
