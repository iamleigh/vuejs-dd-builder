<template>
	<aside
		class="leighton-quito-builder-toolbox"
		:class="{ 'leighton-quito-builder-toolbox--active': active }"
	>
		<h3 class="leighton-quito-builder-toolbox__title">Elements</h3>

		<draggableComponent
			tag="ul"
			class="leighton-quito-builder-toolbox__list"
			:list="elements"
			:group="{ name: 'blocks', pull: 'clone', put: false }"
			:clone="$emit('clone')"
			:sort="false"
			item-key="id"
		>
			<template #item="{ element }">
				<li>
					<span class="title">{{ element.label }}</span>
					<span class="content">
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
					</span>
				</li>
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
