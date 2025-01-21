<template>
	<div class="ui-content">
		<!-- Left Sidebar -->
		<UISidebar>
			<UIMenu>
				<UIButton label="Elements" @click="openSidebar" />
				<UIButton label="Export" @click="exportElements" />

				<h3>Page Size</h3>
				<p>Resize canvas (content area) to preview elements in desired size</p>
				<UIButton
					label="Desktop View"
					@click="resizeCanvas('desktop')"
				/><!-- Full Width -->
				<UIButton
					label="Tablet View"
					@click="resizeCanvas('tablet')"
				/><!-- Breakpoint: 768px -->
				<UIButton
					label="Mobile View"
					@click="resizeCanvas('mobile')"
				/><!-- Breakpoint: 460px -->
			</UIMenu>

			<UISidebar v-if="isSidebarOpen" title="Elements" :float="true">
				<draggableComponent
					tag="ul"
					class="sidebar__list"
					:list="elements"
					:group="{ name: 'blocks', pull: 'clone', put: false }"
					:clone="cloneElement"
					:sort="false"
					item-key="id"
				>
					<template #item="{ element }">
						<li>{{ element.label }}</li>
					</template>
				</draggableComponent>
			</UISidebar>
		</UISidebar>

		<!-- Content Area -->
		<main class="content-area">
			<!-- Drop Zone -->
			<div class="drop-zone-wrapper" :style="{ maxWidth: canvasWidth }">
				<draggableComponent
					class="drop-zone"
					:list="droppedElements"
					group="blocks"
					handle=".handle"
					@change="dropZoneChange"
					item-key="id"
				>
					<template #item="{ element, index }">
						<div :key="index" class="drop-item toolbar-wrapper">
							<div class="toolbar">
								<div class="handle" />
								<UIButton label="Up" @click="moveElement(index, 'up')" />
								<UIButton label="Down" @click="moveElement(index, 'down')" />
								<UIButton label="Remove" @click="deleteElement(index)" />
							</div>

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
		</main>

		<!-- Right Sidebar -->
		<UISidebar title="Settings" />
	</div>
</template>

<script setup>
import { ref } from 'vue';
import UIButton from './UIButton.vue';
import UIMenu from './UIMenu.vue';
import UISidebar from './UISidebar.vue';
import draggableComponent from 'vuedraggable';
import BlockMain from './Block/BlockMain.vue';

const isSidebarOpen = ref(false);
const elements = ref([
	{
		type: 'TextElement',
		label: 'Text Element',
		value: 'The quick brown fox jumps over the lazy dog.',
	},
	{ type: 'ImageElement', label: 'Image Element', value: '' },
]);
const droppedElements = ref([]);
const canvasWidth = ref('100%');

const openSidebar = () => {
	isSidebarOpen.value = !isSidebarOpen.value;
};

const dropZoneChange = () => {
	isSidebarOpen.value = false;
};

const cloneElement = (element) => {
	const clonedElement = {
		id: Date.now(),
		type: element.type,
		label: element.label,
		value: element.value,
	};

	return clonedElement;
};

const updateBlockValue = ({ id, value }) => {
	const index = droppedElements.value.findIndex((el) => el.id === id);

	if (-1 !== index) {
		// Use splice to ensure Vue's reactivity picks up the change
		droppedElements.value.splice(index, 1, {
			...droppedElements.value[index],
			value,
		});
	}
};

const moveElement = (index, position) => {
	if ('up' !== position && 'down' !== position) {
		throw new Error('The position variable must be "up" or "down".');
	}

	const totalElements = droppedElements.value.length;

	if (1 < totalElements) {
		if (0 < index && 'up' === position) {
			const [item] = droppedElements.value.splice(index, 1);
			droppedElements.value.splice(index - 1, 0, item);
		} else if (totalElements - 1 > index && 'down' === position) {
			const [item] = droppedElements.value.splice(index, 1);
			droppedElements.value.splice(index + 1, 0, item);
		}
	}
};

const deleteElement = (index) => {
	droppedElements.value.splice(index, 1);
};

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

const resizeCanvas = (device) => {
	if ('desktop' === device) {
		canvasWidth.value = '100%';
	} else if ('tablet' === device) {
		canvasWidth.value = '768px';
	} else if ('mobile' === device) {
		canvasWidth.value = '460px';
	}
};
</script>

<style lang="scss">
.ui-content {
	flex: 1;
	display: flex;
	overflow-y: auto;
}

.content-area {
	flex: 1;
	padding: 24px;
	background: #f5f5f5;
}

.drop-zone-wrapper {
	width: 100%;
	max-width: 620px;
	position: relative;
	margin: 0 auto;
	background: #fff;

	p {
		color: #888;
		font-style: italic;
	}
}

.drop-zone {
	border: 2px dashed transparent;

	// STATUS: When dropzone is empty
	&:empty {
		min-height: 120px;
		padding: 16px;
		border-color: #ccc;
		text-align: center;

		&:before {
			content: '';
			width: 100%;
			height: 56px;
			display: block;
			margin-bottom: 16px;
			background-image: url('../../assets/placeholder-image.svg');
			background-repeat: no-repeat;
			background-size: contain;
			background-position: center;
		}

		&:after {
			content: 'Drop content blocks from the sidebar here';
			display: block;
		}
	}

	// ELEMENT: Ghost elements
	li.sortable-ghost {
		width: 100%;
		height: 20px;
		background: blue;
		list-style: none;
		font-size: 0;
	}
}

.drop-item {
	user-select: none;
	padding: 16px;
	border: 1px solid transparent;

	&:hover {
		border-color: #000;
	}

	// STATUS: When being dragged around
	&.sortable-ghost {
		opacity: 0.5;
	}
}

.ghost-placeholder {
	background: #f0f0f0;
	opacity: 0.5;
	border: 2px dashed #ccc;
}

.toolbar-wrapper {
	position: relative;
}

.toolbar {
	width: 100%;
	position: absolute;
	bottom: 100%;
	left: 0;
	display: flex;
	background: #888;

	> * {
		margin: 0 8px;

		&:first-child {
			margin-left: 0;
		}

		&:last-child {
			margin-right: 0;
		}
	}
}

.handle {
	cursor: move;
	width: 24px;
	height: 24px;
	display: block;
	background: cyan;
}
</style>
