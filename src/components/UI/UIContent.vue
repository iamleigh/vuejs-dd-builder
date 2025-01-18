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
				<li>Text Element</li>
				<li>Image Element</li>
			</ul>
		</aside>

		<!-- Content Area -->
		<main class="content-area">
			<div class="drop-zone">
				<div class="placeholder">
					<img
						src="../../assets/placeholder-image.svg"
						alt="Image of an element being dragged"
					/>
					<p>Drop content blocks from the sidebar here</p>
				</div>
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
		};
	},
	methods: {
		toggleSecondarySidebar() {
			this.isSecondarySidebarVisible = !this.isSecondarySidebarVisible;
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
</style>
