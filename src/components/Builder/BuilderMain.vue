<template>
	<main class="leighton-quito-builder-main">
		<div
			class="leighton-quito-builder-main__canvas"
			:class="{
				'leighton-quito-builder-main__canvas--tablet': 'tablet' === device,
				'leighton-quito-builder-main__canvas--mobile': 'mobile' === device,
			}"
		>
			<draggable-component
				class="leighton-quito-builder-area lq-front-page"
				:list="elements"
				group="blocks"
				handle=".handle"
				item-key="id"
				@add="addElement(elements)"
				@change="$emit('change')"
			>
				<template #item="{ element, index }">
					<div
						:key="'element-' + index"
						class="leighton-quito-builder-item leighton-quito-builder-item--with-toolbar"
						tabIndex="0"
					>
						<div v-if="'TextElement' === element.type">
							<p>I am a TEXT element</p>
						</div>

						<div v-else-if="'ImageElement' === element.type">
							<p>I am an IMAGE element</p>
						</div>
					</div>
				</template>
			</draggable-component>
		</div>

		<UIDevices
			:selected="device"
			@resize-desktop="resizeCanvas('desktop')"
			@resize-tablet="resizeCanvas('tablet')"
			@resize-mobile="resizeCanvas('mobile')"
		/>
	</main>
</template>

<script setup>
import { onMounted, ref, toRaw, watch } from 'vue';
import axios from 'axios';
import draggableComponent from 'vuedraggable';
import UIDevices from '@admin/UI/UIDevices.vue';

const props = defineProps({
	addedElement: {
		type: Object,
		default: () => ({}),
	},
});

const elements = ref([]);
const device = ref('desktop');

const fetchCanvasData = async () => {
	try {
		const response = await axios.get('/api/canvas');
		elements.value = response.data;
	} catch (error) {
		console.log('Failed to fetch canvas data:', error);
	}
};

const syncCanvas = async () => {
	try {
		const response = await axios.put('/api/canvas', toRaw(elements.value));
		elements.value = response.data;
	} catch (error) {
		console.log('Failed to sync canvas data:', error);
	}
};

const addElement = async (el) => {
	const baseElements = toRaw(el);
	elements.value = Array.isArray(baseElements) ? baseElements : [baseElements];

	await syncCanvas();
};

const resizeCanvas = (d) => (device.value = d);

onMounted(fetchCanvasData);

watch(
	() => props.addedElement,
	(el) => {
		if (Object.hasOwn(el, 'id')) {
			elements.value = [...elements.value, el];
			addElement(elements.value);
		}
	},
	{ deep: true },
);
</script>

<style lang="scss" scope>
@forward '../../assets/scss/builder/builder-main';
@forward '../../assets/scss/builder/builder-item';
@forward '../../assets/scss/builder/builder-area';
</style>
