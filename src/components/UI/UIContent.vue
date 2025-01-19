<template>
	<div class="ui-content">
		<!-- Left Sidebar -->
		<UISidebar>
			<menu>
				<UIButton label="Elements" @click="toggleSecondarySidebar" />
				<UIButton label="Export" @click="exportContent" />
			</menu>

			<UISidebar
				v-if="isSecondarySidebarVisible"
				title="Elements"
				:float="true"
			>
				<ul>
					<li
						v-for="element in elements"
						:key="element.type"
						draggable="true"
						@dragstart="onDragStart($event, element)"
					>
						{{ element.label }}
					</li>
				</ul>
			</UISidebar>
		</UISidebar>

		<!-- Content Area -->
		<main class="content-area">
			<!-- Drop Zone -->
			<div
				class="drop-zone"
				:class="{ full: droppedElements.length }"
				@dragover.prevent="onDragOver"
				@dragleave="onDragLeave"
				@drop="onDrop"
			>
				<!-- Placeholder -->
				<div
					v-if="!droppedElements.length && ghostIndex === null"
					class="placeholder"
				>
					<img
						src="../../assets/placeholder-image.svg"
						alt="Image of an element being dragged"
					/>
					<p>Drop content blocks from the sidebar here</p>
				</div>

				<!-- Dropped Elements -->
				<div
					v-for="(el, index) in droppedElements"
					:key="index"
					class="drop-item"
					@dragstart="onDragStartReorder($event, index)"
					@dragover.prevent="onDragOver(index)"
					@dragleave="onDragLeave"
					@dragend="onDragEnd"
				>
					<div v-if="el.type === 'TextElement'" draggable="true">
						<p>The quick brown fox jumps over the lazy dog.</p>
					</div>

					<div v-else-if="el.type === 'ImageElement'" draggable="true">
						<img
							src="https://www.gynprog.com.br/wp-content/uploads/2017/06/wood-blog-placeholder.jpg"
							alt=""
							width="300"
							height="auto"
						/>
					</div>

					<!-- Remove Element -->
					<button @click="deleteElement(index)">Remove</button>
				</div>

				<!-- Ghost Placeholder -->
				<div
					v-if="ghostIndex !== null"
					:style="ghostStyle"
					class="ghost-placeholder"
				></div>
			</div>
		</main>

		<!-- Right Sidebar -->
		<UISidebar title="Settings" />
	</div>
</template>

<script>
import { ref } from 'vue';
import UIButton from './UIButton.vue';
import UISidebar from './UISidebar.vue';

export default {
	name: 'UIContent',
	components: {
		UIButton,
		UISidebar,
	},
	setup() {
		const isSecondarySidebarVisible = ref(false);
		const elements = ref([
			{ type: 'TextElement', label: 'Text Element' },
			{ type: 'ImageElement', label: 'Image Element' },
		]);
		const droppedElements = ref([]);
		const ghostIndex = ref(null);
		const isDragging = ref(false);
		let dragSourceIndex = ref(null);

		const toggleSecondarySidebar = () => {
			isSecondarySidebarVisible.value = !isSecondarySidebarVisible.value;
		};

		const onDragStart = (event, element) => {
			isDragging.value = true;
			event.dataTransfer.setData('element', JSON.stringify(element));
		};

		const onDragStartReorder = (event, index) => {
			isDragging.value = true;
			dragSourceIndex.value = index;
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.setData('reorder', true);
		};

		const onDragOver = (index) => {
			ghostIndex.value =
				index !== undefined ? index : droppedElements.value.length;
		};

		const onDragLeave = () => {
			ghostIndex.value = null;
		};

		const onDrop = (event) => {
			if (event.dataTransfer.getData('reorder')) {
				const draggedElement = droppedElements.value.splice(
					dragSourceIndex.value,
					1,
				)[0];

				if (null !== ghostIndex.value) {
					droppedElements.value.splice(ghostIndex.value, 0, draggedElement);
				} else {
					droppedElements.value.push(draggedElement);
				}
			} else {
				const element = JSON.parse(event.dataTransfer.getData('element'));

				if (ghostIndex.value !== null) {
					droppedElements.value.splice(ghostIndex.value, 0, element);
				} else {
					droppedElements.value.push(element);
				}
			}

			// Reset variables after drop
			isSecondarySidebarVisible.value = false;
			isDragging.value = false;
			ghostIndex.value = null;
			dragSourceIndex.value = null;
		};

		const onDragEnd = () => {
			isDragging.value = false;
			ghostIndex.value = null;
		};

		const deleteElement = (index) => {
			droppedElements.value.splice(index, 1);
		};

		const exportContent = () => {
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

		return {
			isSecondarySidebarVisible,
			elements,
			droppedElements,
			ghostIndex,
			isDragging,
			toggleSecondarySidebar,
			onDragStart,
			onDragStartReorder,
			onDragOver,
			onDragLeave,
			onDrop,
			onDragEnd,
			deleteElement,
			exportContent,
		};
	},
	computed: {
		ghostStyle() {
			return {
				width: '100%',
				height: '140px',
				border: '2px dashed #ccc',
			};
		},
	},
};
</script>

<style scoped>
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

.secondary-sidebar {
	width: 200px;
	background: #eaeaea;
	padding: 10px;
}

.drop-zone {
	width: 100%;
	max-width: 620px;
	margin: 0 auto;
	background: #fff;
}

.placeholder {
	width: 100%;
	text-align: center;
	padding: 24px;
	border: 2px dashed #ccc;
}

.placeholder img {
	display: block;
	margin: 0 auto;
}

.placeholder p {
	text-align: center;
}

.drop-zone p {
	color: #888;
	font-style: italic;
}

.drop-item {
	cursor: move;
	user-select: none;
	padding: 16px;
}

.ghost-placeholder {
	width: 100%;
	height: 140px;
	border: 2px dashed #ccc;
}
</style>
