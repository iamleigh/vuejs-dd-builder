<script setup>
import { ref } from 'vue';
import { Dialog } from 'primevue';
import BuilderHeader from './components/Builder/BuilderHeader.vue';
import BuilderElements from './components/Builder/BuilderElements.vue';
import UIContent from './components/UI/UIContent.vue';
import 'primeicons/primeicons.css';

const openMenubar = ref(false);
const dialogElements = ref(false);

// List of elements
const elements = ref([
	{
		type: 'TextElement',
		label: 'Text Element',
		value: 'The quick brown fox jumps over the lazy dog.',
	},
	{ type: 'ImageElement', label: 'Image Element', value: 'noimage.png' },
]);

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
</script>

<template>
	<BuilderHeader
		:open-sidebar="openMenubar"
		@click="toggleSidebar"
		@add-element="openElementsDialog"
	/>

	<!-- <UIContent /> -->

	<Dialog
		header="Add Elements"
		v-model:visible="dialogElements"
		modal
		:style="{ width: '90vw' }"
	>
		<BuilderElements :elements="elements" @click="addElementClick" />
	</Dialog>
</template>
