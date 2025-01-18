<template>
	<div class="ui-content">
		<!-- Left Sidebar -->
		<aside class="sidebar">
			<button @click="toggleSecondarySidebar">Elements</button>
			<button>Export</button>
		</aside>

		<!-- Secondary Sidebar -->
		<aside v-if="isSecondarySidebarVisible" class="secondary-sidebar">
			<h3>Elements</h3>
			<ul>
				<li
					v-for="element in elements"
					:key="element.type"
					draggable="true"
					@dragstart="onDragStart(element)"
				>
					{{ element.label }}
				</li>
			</ul>
		</aside>

		<!-- Content Area -->
		<main class="content-area">
			<!-- Drop Zone -->
			<div
				class="drop-zone"
				:class="droppedElements.length ? ' full' : ''"
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
					@dragover.prevent="onDragOver(index)"
					@dragleave="onDragLeave"
				>
					<div v-if="el.type === 'TextElement'">
						<p>The quick brown fox jumps over the lazy dog.</p>
					</div>

					<div v-else-if="el.type === 'ImageElement'">
						<img
							src="https://www.gynprog.com.br/wp-content/uploads/2017/06/wood-blog-placeholder.jpg"
							alt=""
							width="300"
							height="auto"
						/>
					</div>
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
		<aside class="sidebar">
			<h3>Settings</h3>
		</aside>
	</div>
</template>

<script>
export default {
	name: 'UIContent',
	props: {},
	data() {
		return {
			isSecondarySidebarVisible: false,
			isDragging: false,
			ghostIndex: null,
			elements: [
				{ type: 'TextElement', label: 'Text Element' },
				{ type: 'ImageElement', label: 'Image Element' },
			],
			droppedElements: [],
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
	methods: {
		toggleSecondarySidebar() {
			this.isSecondarySidebarVisible = !this.isSecondarySidebarVisible;
		},
		onDragStart(element) {
			this.isDragging = true;
			event.dataTransfer.setData('element', JSON.stringify(element));
		},
		onDragOver(index) {
			this.ghostIndex =
				index !== undefined ? index : this.droppedElements.length;
		},
		onDragLeave() {
			this.ghostIndex = null;
		},
		onDrop(event) {
			const element = JSON.parse(event.dataTransfer.getData('element'));
			if (this.ghostIndex !== null) {
				this.droppedElements.splice(this.ghostIndex, 0, element);
			} else {
				this.droppedElements.push(element);
			}
			this.isSecondarySidebarVisible = false;
			this.isDragging = false;
			this.ghostIndex = null;
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

.sidebar {
	width: 200px;
	background: #919191;
	padding: 10px;
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
	padding: 16px;
}

.ghost-placeholder {
	width: 100%;
	height: 140px;
	border: 2px dashed #ccc;
}
</style>
