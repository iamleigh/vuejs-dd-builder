<template>
	<main class="leighton-quito-builder-main">
		<div
			class="leighton-quito-builder-main__canvas"
			:class="'leighton-quito-builder-main__canvas--' + canvasWidth"
		>
			<draggableComponent
				class="leighton-quito-builder-area"
				:list="elements"
				group="blocks"
				handle=".handle"
				@change="$emit('change')"
				item-key="id"
			>
				<template #item="{ element, index }">
					<div
						:key="index"
						class="leighton-quito-builder-item leighton-quito-builder-item--with-toolbar"
						tabIndex="0"
						@mouseover="currentItem = index"
						@mouseleave="currentItem = null"
					>
						<BlockTools
							v-if="currentItem === index"
							class="leighton-quito-builder-item__toolbar"
							:isFirstItem="0 === index"
							:isLastItem="elements.length - 1 === index"
							:move-up="() => moveElement(index, 'up')"
							:move-down="() => moveElement(index, 'down')"
							:copy="() => copyElement(element, index)"
							:remove="() => deleteElement(element)"
						/>

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
import BlockTools from '../UI/Block/BlockTools.vue';

const props = defineProps({
	elements: {
		type: Array,
		default: null,
		required: true,
	},
});

const canvasWidth = ref(null);
const currentItem = ref(null);

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

const moveElement = (index, position) => {
	if ('up' !== position && 'down' !== position) {
		throw new Error('The position variable must be "up" or "down".');
	}

	const totalElements = props.elements.length;

	if (1 < totalElements) {
		if (0 < index && 'up' === position) {
			const [item] = props.elements.splice(index, 1);
			props.elements.splice(index - 1, 0, item);
		} else if (totalElements - 1 > index && 'down' === position) {
			const [item] = props.elements.splice(index, 1);
			props.elements.splice(index + 1, 0, item);
		}
	}
};

const copyElement = (element, index) => {
	const clonedElement = {
		id: Date.now(),
		type: element.type,
		label: element.label,
		value: element.value,
	};

	props.elements.splice(index + 1, 0, clonedElement);
};

const deleteElement = (index) => {
	props.elements.splice(index, 1);
};
</script>

<style lang="scss" scope>
@forward '../../assets/scss/builder/builder-main';
@forward '../../assets/scss/builder/builder-item';
@forward '../../assets/scss/builder/builder-area';
@forward '../../assets/scss/builder/builder-devices';
</style>
