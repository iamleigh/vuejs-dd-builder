<template>
	<button
		class="leighton-quito-button"
		:class="buttonClasses"
		:aria-label="icon && !position ? label : null"
		@click="$emit('click')"
	>
		<template v-if="!icon">
			{{ label }}
		</template>

		<template v-else>
			<span v-if="'right' === position">{{ label }}</span>

			<font-awesome-icon v-if="'gear' === icon" :icon="faGear" />
			<font-awesome-icon v-else-if="'bars' === icon" :icon="faBars" />
			<font-awesome-icon v-else-if="'plus' === icon" :icon="faPlus" />
			<font-awesome-icon v-else-if="'download' === icon" :icon="faDownload" />
			<font-awesome-icon v-else-if="'desktop' === icon" :icon="faDesktop" />
			<font-awesome-icon v-else-if="'tablet' === icon" :icon="faTablet" />
			<font-awesome-icon v-else-if="'mobile' === icon" :icon="faMobile" />
			<font-awesome-icon v-else-if="'up' === icon" :icon="faAngleUp" />
			<font-awesome-icon v-else-if="'down' === icon" :icon="faAngleDown" />
			<font-awesome-icon v-else-if="'edit' === icon" :icon="faPencil" />
			<font-awesome-icon v-else-if="'copy' === icon" :icon="faCopy" />
			<font-awesome-icon v-else-if="'trash' === icon" :icon="faTrash" />
			<font-awesome-icon
				v-else-if="'move' === icon"
				:icon="faUpDownLeftRight"
			/>

			<span v-if="'left' === position">{{ label }}</span>
		</template>
	</button>
</template>

<script setup>
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
	faGear,
	faBars,
	faPlus,
	faDownload,
	faDesktop,
	faTablet,
	faMobile,
	faAngleUp,
	faAngleDown,
	faPencil,
	faCopy,
	faTrash,
	faUpDownLeftRight,
} from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
	label: {
		type: String,
		default: 'Empty Label',
		required: true,
	},
	icon: {
		type: String,
		default: null,
		validator: (value) => {
			return [
				'gear',
				'bars',
				'plus',
				'download',
				'up',
				'down',
				'move',
				'edit',
				'copy',
				'trash',
				'desktop',
				'tablet',
				'mobile',
			].includes(value);
		},
	},
	position: {
		type: String,
		default: null,
		validator: (value) => {
			return ['left', 'right'].includes(value);
		},
	},
	design: {
		type: String,
		default: 'primary',
		validator: (value) => {
			return ['primary'].includes(value);
		},
	},
});

defineEmits(['click']);

const buttonClasses = computed(() => {
	let classes = [];
	const prefix = 'leighton-quito-button';

	if (props.icon && !props.position) {
		classes.push(`${prefix}--icon`);
	}

	classes.push(`${prefix}--${props.design}`);

	return classes;
});
</script>

<style lang="scss">
@forward '../../assets/scss/components/ui-button';
</style>
