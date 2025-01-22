<template>
	<main class="leighton-quito-builder-main">
		<div
			class="leighton-quito-builder-main__canvas"
			:class="'leighton-quito-builder-main__canvas--' + canvasWidth"
		>
			<draggableComponent
				class="drop-zone"
				:list="elements"
				group="blocks"
				handle=".handle"
				@change="$emit('change')"
				item-key="id"
			>
				<template #item="{ element, index }">
					<div :key="index" class="drop-item toolbar-wrapper">
						<!-- <div class="toolbar">
							<div class="handle" />
							<UIButton label="Up" @click="moveElement(index, 'up')" />
							<UIButton label="Down" @click="moveElement(index, 'down')" />
							<UIButton label="Remove" @click="deleteElement(index)" />
						</div> -->

						<BlockMain
							:id="element.id"
							:element="element.type"
							:value="element.value"
							@update:value="updateBlockValue"
						/>
					</div>
				</template>
			</draggableComponent>
		</div>

		<aside class="leighton-quito-builder-devices" aria-label="Device Selection">
			<Button
				aria-label="Desktop View"
				icon="pi pi-desktop"
				class="leighton-quito-builder-devices__item"
				:disabled="!canvasWidth ? true : false"
				@click="resizeCanvas('desktop')"
			/>

			<Button
				aria-label="Tablet View"
				icon="pi pi-tablet"
				class="leighton-quito-builder-devices__item"
				:disabled="'tablet' === canvasWidth ? true : false"
				@click="resizeCanvas('tablet')"
			/>

			<Button
				aria-label="Mobile View"
				icon="pi pi-mobile"
				class="leighton-quito-builder-devices__item"
				:disabled="'mobile' === canvasWidth ? true : false"
				@click="resizeCanvas('mobile')"
			/>
		</aside>
	</main>
</template>

<script setup>
import { ref } from 'vue';
import { Button } from 'primevue';
import BlockMain from '../UI/Block/BlockMain.vue';
import draggableComponent from 'vuedraggable';

const props = defineProps({
	elements: {
		type: Array,
		default: null,
		required: true,
	},
});

const canvasWidth = ref(null);

const resizeCanvas = (device) => {
	if ('desktop' === device) {
		canvasWidth.value = null;
	} else {
		canvasWidth.value = device;
	}
};

const updateBlockValue = ({ id, value }) => {
	const index = props.elements.findIndex((el) => el.id === id);

	if (-1 !== index) {
		// Use splice to ensure Vue's reactivity picks up the change
		props.elements.splice(index, 1, {
			...props.elements[index],
			value,
		});
	}
};
</script>

<style lang="scss" scope>
@forward '../../assets/scss/builder/builder-main';
@forward '../../assets/scss/builder/builder-devices';
</style>
