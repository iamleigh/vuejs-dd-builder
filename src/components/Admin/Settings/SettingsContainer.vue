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
import { watch } from 'vue';
import { InputGroup, InputGroupAddon, InputNumber } from 'primevue';
import FieldGroup from '@admin/Field/FieldGroup.vue';
import FieldItem from '@admin/Field/FieldItem.vue';

const props = defineProps({
	id: {
		type: Number,
		default: 0,
		required: true,
	},
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

const emit = defineEmits(['update:properties']);

watch(
	props.properties,
	(value) => {
		emit('update:properties', { id: props.id, properties: value });
	},
	{ deep: true },
);
</script>

<style lang="scss" scoped></style>
