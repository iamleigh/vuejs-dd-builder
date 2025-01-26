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
				@add="updateCanvas(elements)"
				@sort="updateCanvas(elements)"
				@change="$emit('change')"
			>
				<template #item="{ element, index }">
					<div
						:key="'element-' + index"
						class="leighton-quito-builder-item leighton-quito-builder-item--with-toolbar"
						tabIndex="0"
						@mouseover="current = index"
						@mouseleave="blurElement"
						@focus="current = index"
						@blur="blurElement"
					>
						<BlockTools
							v-if="current === index"
							class="leighton-quito-builder-item__toolbar"
							:is-first-item="0 === index"
							:is-last-item="elements.length - 1 === index"
							:move-up="() => moveElement(index, 'up')"
							:move-down="() => moveElement(index, 'down')"
							:copy="() => copyElement(element, index)"
							:remove="() => deleteElement(element)"
							:edit="() => editElement(element)"
							:is-editing="editing"
							:settings-title="element.label"
						/>

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
							@update:value="updateElement"
							@update:height="updateElement"
						/>
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
import BlockMain from '../Block/BlockMain.vue';
import BlockTools from '../Block/BlockTools.vue';
import UIDevices from '@admin/UI/UIDevices.vue';

const props = defineProps({
	addedElement: {
		type: Object,
		default: () => ({}),
	},
});

const elements = ref([]);
const device = ref('desktop');
const current = ref(null);
const editing = ref(false);

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

const updateCanvas = async (el) => {
	const baseElements = toRaw(el);
	elements.value = Array.isArray(baseElements) ? baseElements : [baseElements];

	await syncCanvas();
};

const updateElement = ({ id, value }) => {
	const index = elements.value.findIndex((el) => el.id === id);

	if (-1 !== index) {
		elements.value.splice(index, 1, {
			...elements.value[index],
			...{ value: value },
		});
	}

	updateCanvas(elements.value);
};

const copyElement = (element, index) => {
	const clonedElement = {
		...element,
		id: Date.now(),
	};

	elements.value.splice(index + 1, 0, clonedElement);

	updateCanvas(elements.value);
};

const deleteElement = (element) => {
	const index = elements.value.findIndex((el) => el.id === element.id);

	if (-1 !== index) {
		elements.value.splice(index, 1);
	}

	updateCanvas(elements.value);
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

	updateCanvas(elements.value);
};

const editElement = () => (editing.value = !editing.value);

const blurElement = (e) => {
	// Check if focus remains within the current element
	if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
		return;
	}

	// Otherwise, reset the state
	current.value = null;
	editing.value = false;
};

const resizeCanvas = (d) => (device.value = d);

onMounted(fetchCanvasData);

watch(
	() => props.addedElement,
	(el) => {
		if (Object.hasOwn(el, 'id')) {
			elements.value = [...elements.value, el];
			updateCanvas(elements.value);
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
