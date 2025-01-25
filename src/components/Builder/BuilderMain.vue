<template>
	<main class="leighton-quito-builder-main">
		<div
			class="leighton-quito-builder-main__canvas"
			:class="'leighton-quito-builder-main__canvas--' + canvasWidth"
		>
			<draggableComponent
				class="leighton-quito-builder-area lq-front-page"
				:list="elements"
				group="blocks"
				handle=".handle"
				item-key="id"
				@change="$emit('change')"
			>
				<template #item="{ element, index }">
					<div
						:key="index"
						class="leighton-quito-builder-item leighton-quito-builder-item--with-toolbar"
						tabIndex="0"
						@mouseover="currentItem = index"
						@mouseleave="blurElement"
						@focus="currentItem = index"
						@blur="blurElement"
					>
						<BlockTools
							v-if="currentItem === index"
							class="leighton-quito-builder-item__toolbar"
							:is-first-item="0 === index"
							:is-last-item="elements.length - 1 === index"
							:is-editing="editPopup"
							:move-up="() => moveElement(index, 'up')"
							:move-down="() => moveElement(index, 'down')"
							:edit="() => editElement(element)"
							:copy="() => copyElement(element, index)"
							:remove="() => deleteElement(element)"
							:settings-title="element.label"
						>
							<template #settings>
								<FieldGroup title="Container">
									<FieldItem
										v-if="'ImageElement' === element.type"
										title="Height"
									>
										<InputGroup>
											<InputNumber
												v-model="element.container.height"
												:min="0"
												@change="
													updateContainer(
														index,
														'height',
														element.container.height,
													)
												"
											/>
											<InputGroupAddon>px</InputGroupAddon>
										</InputGroup>
									</FieldItem>

									<FieldItem title="Vertical Padding">
										<InputGroup>
											<InputNumber
												v-model="element.container.vPadding"
												@change="
													updateContainer(
														index,
														'vPadding',
														element.container.vPadding,
													)
												"
											/>
											<InputGroupAddon>px</InputGroupAddon>
										</InputGroup>
									</FieldItem>

									<FieldItem title="Horizontal Padding">
										<InputGroup>
											<InputNumber
												v-model="element.container.hPadding"
												@change="
													updateContainer(
														index,
														'hPadding',
														element.container.hPadding,
													)
												"
											/>
											<InputGroupAddon>px</InputGroupAddon>
										</InputGroup>
									</FieldItem>
								</FieldGroup>

								<FieldGroup
									v-if="'ImageElement' === element.type"
									title="Default Image"
								>
									<UIRadioImageGroup
										:group="element.id"
										:options="imageOptions"
										:default-option="element.value"
										@update="(value) => updateElementValue(index, value)"
									/>
								</FieldGroup>
							</template>
						</BlockTools>

						<BlockMain
							:id="element.id"
							:element="element.type"
							:value="element.value"
							:style="{
								padding:
									element.container.vPadding +
									'px ' +
									element.container.hPadding +
									'px',
								background: element.container.background,
							}"
							:height="element.container.height"
							@update:value="updateBlockValue"
							@update:height="updateBlockValue"
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
import { ref, watch } from 'vue';
import { Button, InputGroup, InputGroupAddon, InputNumber } from 'primevue';
import BlockMain from '../Block/BlockMain.vue';
import draggableComponent from 'vuedraggable';
import BlockTools from '../Block/BlockTools.vue';
import UIRadioImageGroup from '../UI/UIRadioImageGroup.vue';
import FieldGroup from '../Field/FieldGroup.vue';
import FieldItem from '../Field/FieldItem.vue';

const emit = defineEmits(['change']);

const canvasWidth = ref(null);
const currentItem = ref(null);
const editPopup = ref(false);

const resizeCanvas = (device) => {
	canvasWidth.value = 'desktop' === device ? null : device;
};

// Create a reactive reference for the API/canvas data
const apiCanvasData = ref([]);
const elements = ref(apiCanvasData.value);

const updateApiCanvasData = async () => {
	const request = new Request('/api/canvas', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(apiCanvasData.value),
	});

	await fetch(request)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Failed to fetch elements: ${response.status}`);
			}

			return response.json();
		})
		.then((data) => {
			console.log('Updated canvas:', data); // DEBUG
		})
		.catch((error) => {
			console.error('Error updating canvas data:', error);
		});
};

// Watch changes on the API/canvas data and update the API
watch(apiCanvasData, updateApiCanvasData, { deep: true });

const updateElement = (index, newProperties) => {
	elements.value.splice(index, 1, {
		...elements.value[index],
		...newProperties,
	});

	updateApiCanvasData();
};

const updateBlockValue = ({ id, value }) => {
	const index = elements.value.findIndex((el) => el.id === id);

	if (-1 !== index) {
		updateElement(index, { value });
	}
};

const updateElementValue = (index, newValue) => {
	updateElement(index, { value: newValue });
};

const updateContainer = (index, property, newValue) => {
	const newContainer = {
		...elements.value[index].container,
		[property]: newValue,
	};

	updateElement(index, { container: newContainer });
};

const moveElement = (index, position) => {
	if ('up' !== position && 'down' !== position) {
		throw new Error('The position variable must be "up" or "down".');
	}

	const totalElements = elements.value.length;

	if (1 < totalElements) {
		const newIndex = 'up' === position ? index - 1 : index + 1;

		if (0 <= newIndex && newIndex < totalElements) {
			const temp = elements.value[newIndex];
			elements.value[newIndex] = elements.value[index];
			elements.value[index] = temp;
		}
	}
};

const editElement = () => (editPopup.value = !editPopup.value);

const copyElement = (element, index) => {
	const clonedElement = {
		...element,
		id: Date.now(),
	};

	elements.value.splice(index + 1, 0, clonedElement);
};

const deleteElement = (element) => {
	const index = elements.value.findIndex((el) => el.id === element.id);

	if (-1 !== index) {
		elements.value.splice(index, 1);
	}
};

const blurElement = (event) => {
	// Check if focus remains within the current element
	if (
		event.relatedTarget &&
		event.currentTarget.contains(event.relatedTarget)
	) {
		return;
	}

	// Otherwise, reset the state
	currentItem.value = null;
	editPopup.value = false;
};

const imageOptions = ref([
	{
		label: 'Food',
		value: '/assets/banner-food.webp',
	},
	{
		label: 'Tourism',
		value: '/assets/banner-tourism.webp',
	},
	{
		label: 'Medicine',
		value: '/assets/banner-medicine.webp',
	},
	{
		label: 'Architecture',
		value: '/assets/banner-architecture.webp',
	},
]);
</script>

<style lang="scss" scope>
@forward '../../assets/scss/builder/builder-main';
@forward '../../assets/scss/builder/builder-item';
@forward '../../assets/scss/builder/builder-area';
@forward '../../assets/scss/builder/builder-devices';
</style>
