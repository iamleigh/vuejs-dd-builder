<template>
	<div role="toolbar" class="leighton-quito-block-tools">
		<div class="leighton-quito-block-tools__inner">
			<div
				class="handle p-button p-component p-button-icon-only p-button-sm p-button-secondary leighton-quito-block-tools__move leighton-quito-hide-md"
				aria-hidden="true"
			>
				<span class="p-button-icon pi pi-arrows-alt" />
			</div>
			<Button
				v-if="moveUp"
				icon="pi pi-angle-up"
				aria-label="Up"
				v-bind="buttonProps"
				:disabled="isFirstItem ? true : false"
				@click="moveUp"
			/>
			<Button
				v-if="moveDown"
				icon="pi pi-angle-down"
				aria-label="Down"
				v-bind="buttonProps"
				:disabled="isLastItem ? true : false"
				@click="moveDown"
			/>
		</div>

		<div class="leighton-quito-block-tools__inner">
			<Button
				v-if="edit"
				icon="pi pi-pencil"
				class="leighton-quito-hide-md"
				aria-label="Edit Element"
				v-bind="buttonProps"
				:severity="isEditing ? 'primary' : 'secondary'"
				@click="edit"
			/>
			<BlockSettings v-if="isEditing" :title="settingsTitle">
				<slot name="settings"></slot>
			</BlockSettings>
			<Button
				v-if="copy"
				icon="pi pi-clone"
				aria-label="Duplicate Element"
				v-bind="buttonProps"
				@click="copy"
			/>
			<Button
				v-if="remove"
				icon="pi pi-trash"
				aria-label="Remove Element"
				v-bind="buttonProps"
				@click="remove"
			/>
		</div>
	</div>
</template>

<script setup>
import { reactive } from 'vue';
import { Button } from 'primevue';
import BlockSettings from './BlockSettings.vue';

defineProps({
	active: {
		type: Boolean,
		default: false,
	},
	moveUp: {
		type: Function,
	},
	moveDown: {
		type: Function,
	},
	edit: {
		type: Function,
	},
	copy: {
		type: Function,
	},
	remove: {
		type: Function,
	},
	isFirstItem: {
		type: Boolean,
		default: false,
	},
	isLastItem: {
		type: Boolean,
		default: false,
	},
	isEditing: {
		type: Boolean,
		default: false,
	},
	settingsTitle: {
		type: String,
	},
});

const buttonProps = reactive({
	size: 'small',
	severity: 'secondary',
});
</script>

<style lang="scss" scoped>
@forward '../../assets/scss/block/block-tools';
</style>
