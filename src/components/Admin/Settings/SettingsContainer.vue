<template>
	<FieldGroup title="Container">
		<FieldItem v-if="showHeight" title="Height">
			<InputGroup>
				<InputNumber v-model="localProperties.height" :min="0" />
				<InputGroupAddon>px</InputGroupAddon>
			</InputGroup>
		</FieldItem>

		<FieldItem v-if="showPadding" title="Vertical Padding">
			<InputGroup>
				<InputNumber v-model="localProperties.vPadding" />
				<InputGroupAddon>px</InputGroupAddon>
			</InputGroup>
		</FieldItem>

		<FieldItem v-if="showPadding" title="Horizontal Padding">
			<InputGroup>
				<InputNumber v-model="localProperties.hPadding" />
				<InputGroupAddon>px</InputGroupAddon>
			</InputGroup>
		</FieldItem>
	</FieldGroup>
</template>

<script setup>
import { reactive, watch } from 'vue';
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

const localProperties = reactive({ ...props.properties });

watch(localProperties, (value) => {
	emit('update:properties', { id: props.id, properties: value });
});
</script>

<style lang="scss" scoped></style>
