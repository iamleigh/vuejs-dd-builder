<template>
	<FieldGroup title="Default Image">
		<UIRadioImageGroup
			:group="id"
			:options="defaultOptions"
			:default-option="value"
		/>
	</FieldGroup>
</template>

<script setup>
import FieldGroup from '@admin/Field/FieldGroup.vue';
import UIRadioImageGroup from '@admin/UI/UIRadioImageGroup.vue';

defineProps({
	id: {
		type: Number,
		default: 0,
	},
	default: {
		type: String,
		default: '',
	},
	properties: {
		type: Object,
		default: () => ({}),
	},
});

const defaultOptions = ref([
	{
		label: 'Food',
		value: '/assets/banner-food.webp',
	},
	{
		label: 'Tourism',
		value: '/assets/banner-tourism.webp',
	},
	{
		label: 'Medicine',
		value: '/assets/banner-medicine.webp',
	},
	{
		label: 'Architecture',
		value: '/assets/banner-architecture.webp',
	},
]);
</script>

<style lang="scss" scoped></style>
