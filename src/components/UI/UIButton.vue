<script setup>
defineProps({
	label: {
		type: String,
		default: 'Empty Label',
	},
});

defineEmits(['click']);
</script>

<template>
	<button @click="$emit('click')">
		{{ label }}
	</button>
</template>
