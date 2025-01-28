<template>
	<ul class="leighton-quito-builder-toolbox__list">
		<li v-for="(element, index) in elements" :key="index">
			<span class="title">{{ element.label }}</span>

			<button
				class="content"
				:aria-label="'Add ' + element.label + ' Element'"
				@click="$emit('click', element)"
			>
				<component :is="getComponent(element.type)" />
			</button>
		</li>
	</ul>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import ElementText from '@admin/Element/ElementText.vue';
import ElementImage from '@admin/Element/ElementImage.vue';

defineProps({
	elements: {
		type: Array,
		default: () => [],
		required: true,
	},
});

defineEmits(['click']);

const getComponent = (type) => {
	switch (type) {
		case 'TextElement':
			return ElementText;

		case 'ImageElement':
			return ElementImage;

		default:
			return null;
	}
};
</script>

<style lang="scss" scoped>
@forward '@styles/builder/builder-toolbox';
</style>
