<template>
	<FieldGroup title="Container">
		<FieldItem v-if="showHeight" title="Height">
			<InputGroup>
				<InputNumber v-model="properties.height" :min="0" />
				<InputGroupAddon>px</InputGroupAddon>
			</InputGroup>
		</FieldItem>

		<FieldItem v-if="showPadding" title="Vertical Padding">
			<InputGroup>
				<InputNumber v-model="properties.vPadding" />
				<InputGroupAddon>px</InputGroupAddon>
			</InputGroup>
		</FieldItem>

		<FieldItem v-if="showPadding" title="Horizontal Padding">
			<InputGroup>
				<InputNumber v-model="properties.hPadding" />
				<InputGroupAddon>px</InputGroupAddon>
			</InputGroup>
		</FieldItem>
	</FieldGroup>
</template>

<script setup>
import { InputGroup, InputGroupAddon, InputNumber } from 'primevue';
import FieldGroup from '../../Field/FieldGroup.vue';
import FieldItem from '../../Field/FieldItem.vue';

defineProps({
	properties: {
		type: Object,
		default: () => ({}),
	},
	showHeight: {
		type: Boolean,
		default: false,
	},
	showPadding: {
		type: Boolean,
		default: false,
	},
});
</script>

<style lang="scss" scoped></style>
