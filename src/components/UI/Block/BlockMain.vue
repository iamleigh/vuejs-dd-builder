<template>
	<BlockText v-if="'TextElement' === element" :id="id" :value="value" />
	<BlockImage v-else-if="'ImageElement' === element" :value="value" />
</template>

<script setup>
import BlockImage from './BlockImage.vue';
import BlockText from './BlockText.vue';

defineProps({
	id: {
		type: Number,
		required: true,
	},
	element: {
		type: String,
		required: true,
		validator: (value) => {
			// Only allow available elements
			return ['TextElement', 'ImageElement'].includes(value);
		},
	},
	value: {
		type: String,
		required: true,
	},
});
</script>
