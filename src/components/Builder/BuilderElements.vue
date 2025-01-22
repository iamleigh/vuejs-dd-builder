<template>
	<ul>
		<li v-for="(element, index) in elements">
			<button :key="index" @click="$emit('click')">
				{{ element.label }}
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
});
defineEmits(['click']);
</script>

<style lang="scss" scoped>
// TBD: Create styles
// Not styling at this moment since it is necessary the canvas functionality enabled as well to preview
</style>
