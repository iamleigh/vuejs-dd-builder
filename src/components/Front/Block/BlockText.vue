<template>
	<div class="block">
		<QuillyEditor
			ref="editor"
			v-model="msg"
			:options="editorOptions"
			@update:model-value="updateContent"
		/>
	</div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { QuillyEditor } from 'vue-quilly';
import Quill from 'quill';

const props = defineProps({
	id: {
		type: Number,
		required: true,
	},
	value: {
		type: String,
		required: true,
	},
});

const emit = defineEmits(['update:value']);

const msg = ref(props.value);
const editor = ref(null);
const editorOptions = {
	theme: 'snow',
	modules: {
		toolbar: false,
	},
	placeholder: 'Compose something epic',
	readOnly: false,
};

let quill = null;

onMounted(() => {
	if (editor.value) {
		quill = editor.value.initialize(Quill);
	}
});

// Sync prop changes to local content
watch(
	() => props.value,
	(newValue) => {
		msg.value = newValue;
	},
);

// Emit changes to parent block
const updateContent = (newValue) => {
	emit('update:value', { id: props.id, value: newValue });
};
</script>

<style lang="scss" scoped>
.block {
	display: block;
}
</style>
