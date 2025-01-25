<script setup>
import { ref, onMounted } from 'vue';
import { asyncLoadComponent } from './utils/asyncLoadComponent';
import { Dialog } from 'primevue';
import 'primeicons/primeicons.css';
import UILoading from '@UI/UILoading.vue';

// Lazy load components
const BuilderHeader = asyncLoadComponent(
	() => import('@Builder/BuilderHeader.vue'),
);
const BuilderSidebar = asyncLoadComponent(
	() => import('@Builder/BuilderSidebar.vue'),
);
const BuilderElements = asyncLoadComponent(
	() => import('@Builder/BuilderElements.vue'),
);
const BuilderToolbox = asyncLoadComponent(
	() => import('@Builder/BuilderToolbox.vue'),
);
const BuilderMain = asyncLoadComponent(
	() => import('@Builder/BuilderMain.vue'),
);

// State variables
const isLoading = ref(true);
const doneLoading = ref(false);
const hideLoadingMask = ref(false);
const openMenubar = ref(false);
const dialogElements = ref(false);
const showToolbox = ref(false);

// List of predefined elements
const elements = ref([]);

const fetchElements = async () => {
	try {
		const response = await fetch('/api/elements');

		if (!response.ok) {
			throw new Error(`Failed to fetch elements: ${response.status}`);
		}

		elements.value = await response.json();
	} catch (error) {
		console.error('Error fetching elements:', error);
	}
};

// Func: Toggle menubar visibility
const toggleSidebar = () => (openMenubar.value = !openMenubar.value);

// Func: Open elements dialog
const openElementsDialog = () => (dialogElements.value = true);

// Func: Open elements sidebar
const openElementsSidebar = () => (showToolbox.value = !showToolbox.value);

// Func: Close toolbox when element is dropped in the canvas
const dropZoneChange = () => (showToolbox.value = false);

// Func: Clone element
const cloneElement = (element) => {
	const clonedElement = {
		id: Date.now(),
		type: element.type,
		label: element.label,
		value: element.value,
		container: JSON.parse(JSON.stringify(element.container)),
	};

	return clonedElement;
};

// Func: Add new element on click
const addElementClick = async (element) => {
	const request = new Request('/api/canvas', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(element),
	});

	await fetch(request)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Failed to fetch elements: ${response.status}`);
			}

			return response.json();
		})
		.then(() => {
			openMenubar.value = false;
			dialogElements.value = false;
		})
		.catch((error) => {
			console.error('Error adding element:', error);
		});
};

// Func: Export elements added to the canvas
const exportElements = () => {
	const request = new Request('/api/canvas', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	fetch(request)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Failed to fetch elements: ${response.status}`);
			}

			return response.json();
		})
		.then((data) => {
			const jsonContent = JSON.stringify(data, null, 2);
			const blob = new Blob([jsonContent], { type: 'application/json' });
			const url = URL.createObjectURL(blob);

			const link = document.createElement('a');
			link.href = url;
			link.download = 'content.json';
			link.click();

			console.log(jsonContent); // Project Requirement: Log the JSON file to the console.
			URL.revokeObjectURL(url); // Project Requirement: Download JSON file.
		})
		.catch((error) => {
			console.log('Error exporting elements:', error);
		});
};

// Func: Simulate loading
const simulateLoadingDelay = (time) => {
	setTimeout(() => (isLoading.value = false), time);
	setTimeout(() => (doneLoading.value = true), time + 500);
	setTimeout(() => (hideLoadingMask.value = true), time + 1000);
};

// Start: Fetch elements and simulate loading
onMounted(async () => {
	await fetchElements();

	// Start: Simulate loading process
	simulateLoadingDelay(1000);
});
</script>

<template>
	<UILoading
		v-if="!hideLoadingMask"
		:loaded="!isLoading"
		title="Preparing"
		message="Setting up the builder"
		:status="doneLoading ? 'complete' : 'loading'"
	/>

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

	<BuilderMain @change="dropZoneChange" />

	<Dialog
		v-model:visible="dialogElements"
		header="Add Elements"
		modal
		:style="{ width: '90vw', maxWidth: '420px' }"
	>
		<BuilderElements :elements="elements" @click="addElementClick" />
	</Dialog>
</template>
