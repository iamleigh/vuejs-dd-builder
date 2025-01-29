<template>
	<BlockText
		v-if="'TextElement' === element"
		:id="id"
		:value="value"
		@update:value="handleUpdate"
	/>
	<BlockImage
		v-else-if="'ImageElement' === element"
		:value="value"
		:height="height"
		@update:value="handleUpdate"
		@update:height="handleUpdate"
	/>
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
	height: {
		type: Number,
		default: null,
	},
});

const emit = defineEmits(['update:value']);

// Propagate the update:value event to the parent
const handleUpdate = (payload) => {
	emit('update:value', payload);
};
</script>
