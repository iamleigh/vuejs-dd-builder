<template>
	<aside
		class="leighton-quito-builder-toolbox"
		:class="{ 'leighton-quito-builder-toolbox--active': active }"
	>
		<h3>Elements</h3>

		<draggableComponent
			tag="ul"
			class="sidebar__list"
			:list="elements"
			:group="{ name: 'blocks', pull: 'clone', put: false }"
			:clone="$emit('clone')"
			:sort="false"
			item-key="id"
		>
			<template #item="{ element }">
				<li>{{ element.label }}</li>
			</template>
		</draggableComponent>
	</aside>
</template>

<script setup>
import draggableComponent from 'vuedraggable';

defineProps({
	elements: {
		type: Array,
		default: null,
		required: true,
	},
	active: {
		type: Boolean,
		default: false,
	},
});

defineEmits(['clone']);
</script>

<style lang="scss" scope>
@forward '../../assets/scss/builder/builder-toolbox';
</style>
