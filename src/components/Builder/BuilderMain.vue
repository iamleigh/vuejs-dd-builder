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
				@change="$emit('change')"
				item-key="id"
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
							:isFirstItem="0 === index"
							:isLastItem="elements.length - 1 === index"
							:isEditing="editPopup"
							:move-up="() => moveElement(index, 'up')"
							:move-down="() => moveElement(index, 'down')"
							:edit="() => editElement(element)"
							:copy="() => copyElement(element, index)"
							:remove="() => deleteElement(element)"
							:settingsTitle="element.label"
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
											/>
											<InputGroupAddon>px</InputGroupAddon>
										</InputGroup>
									</FieldItem>

									<FieldItem title="Vertical Padding">
										<InputGroup>
											<InputNumber v-model="element.container.vPadding" />
											<InputGroupAddon>px</InputGroupAddon>
										</InputGroup>
									</FieldItem>

									<FieldItem title="Horizontal Padding">
										<InputGroup>
											<InputNumber v-model="element.container.hPadding" />
											<InputGroupAddon>px</InputGroupAddon>
										</InputGroup>
									</FieldItem>
								</FieldGroup>

								<FieldGroup
									title="Default Image"
									v-if="'ImageElement' === element.type"
								>
									<UIRadioImageGroup
										:group="element.id"
										:options="imageOptions"
										:defaultOption="element.value"
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
								height: element.container.height + 'px',
								padding:
									element.container.vPadding +
									'px ' +
									element.container.hPadding +
									'px',
								background: element.container.background,
							}"
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
import { Button, InputGroup, InputGroupAddon, InputNumber } from 'primevue';
import BlockMain from '../Block/BlockMain.vue';
import draggableComponent from 'vuedraggable';
import BlockTools from '../Block/BlockTools.vue';
import UIRadioImageGroup from '../UI/UIRadioImageGroup.vue';
import FieldGroup from '../Field/FieldGroup.vue';
import FieldItem from '../Field/FieldItem.vue';

const props = defineProps({
	elements: {
		type: Array,
		default: null,
		required: true,
	},
});

const canvasWidth = ref(null);
const currentItem = ref(null);
const editPopup = ref(false);

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

const updateElementValue = (index, newValue) => {
	props.elements.splice(index, 1, {
		...props.elements[index],
		value: newValue,
	});
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

const editElement = () => {
	editPopup.value = !editPopup.value;
};

const copyElement = (element, index) => {
	const clonedElement = {
		id: Date.now(),
		type: element.type,
		label: element.label,
		value: element.value,
		container: element.container,
	};

	props.elements.splice(index + 1, 0, clonedElement);
};

const deleteElement = (index) => {
	props.elements.splice(index, 1);
};

const blurElement = () => {
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
