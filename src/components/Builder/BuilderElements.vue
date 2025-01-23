<template>
	<ul class="leighton-quito-builder-toolbox__list">
		<li v-for="(element, index) in elements">
			<span class="title">{{ element.label }}</span>

			<button
				:key="index"
				class="content"
				:aria-label="'Add ' + element.label + ' Element'"
				@click="() => click(element)"
			>
				<template v-if="'TextElement' === element.type">
					The quick brown fox jumps over the lazy dog.
				</template>

				<template v-else-if="'ImageElement' === element.type">
					<span
						:style="{
							minHeight: '80px',
							background: 'var(--lq-neutral-200)',
							padding: '8px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}"
					>
						<i class="pi pi-image" style="font-size: 2rem"></i>
					</span>
				</template>
			</button>
		</li>
	</ul>
</template>

<script setup>
defineProps({
	elements: {
		type: Array,
		required: true,
	},
	click: {
		type: Function,
	},
});
</script>

<style lang="scss" scoped>
@forward '../../assets/scss/builder/builder-toolbox';
</style>
