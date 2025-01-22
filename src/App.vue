<script setup>
import { ref } from 'vue';
import { Dialog } from 'primevue';
import BuilderHeader from './components/Builder/BuilderHeader.vue';
import BuilderSidebar from './components/Builder/BuilderSidebar.vue';
import BuilderElements from './components/Builder/BuilderElements.vue';
import BuilderToolbox from './components/Builder/BuilderToolbox.vue';
import BuilderMain from './components/Builder/BuilderMain.vue';
import UIContent from './components/UI/UIContent.vue';
import 'primeicons/primeicons.css';

const openMenubar = ref(false);
const dialogElements = ref(false);
const showToolbox = ref(false);

// List of elements
const elements = ref([
	{
		type: 'TextElement',
		label: 'Text Element',
		value: 'The quick brown fox jumps over the lazy dog.',
		container: {
			vPadding: 30,
			hPadding: 30,
			background: '#fff',
		},
	},
	{
		type: 'ImageElement',
		label: 'Image Element',
		value: 'noimage.png',
		container: {
			vPadding: 30,
			hPadding: 30,
			background: '#fff',
		},
	},
]);

// List of elements added to the canvas (drop-zone)
const droppedElements = ref([]);

// Func: Toggle menubar visibility
const toggleSidebar = () => {
	openMenubar.value = !openMenubar.value;
};

// Func: Open elements dialog
const openElementsDialog = () => {
	dialogElements.value = true;
};

// Func: Add new element on click
const addElementClick = () => {
	// TBD: Add element on click
	console.log('Element added');

	// Close dialog and menubar
	openMenubar.value = false;
	dialogElements.value = false;
};

// Func: Open elements sidebar
const openElementsSidebar = () => {
	showToolbox.value = !showToolbox.value;
};

// Func: Close toolbox when element is dropped in the canvas
const dropZoneChange = () => {
	showToolbox.value = false;
};

// Func: Clone element
const cloneElement = (element) => {
	const clonedElement = {
		id: Date.now(),
		type: element.type,
		label: element.label,
		value: element.value,
		container: element.container,
	};

	return clonedElement;
};

// Func: Export elements added to the canvas
const exportElements = () => {
	const jsonContent = JSON.stringify(droppedElements.value, null, 2);
	console.log(jsonContent);

	const blob = new Blob([jsonContent], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = 'content.json';
	link.click();
	URL.revokeObjectURL(url);
};
</script>

<template>
	<BuilderHeader
		:open-sidebar="openMenubar"
		@click="toggleSidebar"
		@add-element="openElementsDialog"
		@download="exportElements"
	/>

	<BuilderSidebar
		:open-toolbox="showToolbox"
		@add-element="openElementsSidebar"
		@download="exportElements"
	/>

	<BuilderToolbox
		:elements="elements"
		:active="showToolbox"
		:clone="cloneElement"
	/>

	<BuilderMain :elements="droppedElements" @change="dropZoneChange" />

	<Dialog
		header="Add Elements"
		v-model:visible="dialogElements"
		modal
		:style="{ width: '90vw', maxWidth: '420px' }"
	>
		<BuilderElements :elements="elements" @click="addElementClick" />
	</Dialog>
</template>
