<script setup>
import { ref } from 'vue';
import BuilderHeader from './components/Builder/BuilderHeader.vue';
import UIContent from './components/UI/UIContent.vue';
import 'primeicons/primeicons.css';

const openSidebar = ref(false);

const toggleSidebar = () => {
	openSidebar.value = !openSidebar.value;
};
</script>

<template>
	<BuilderHeader @click="toggleSidebar" :open-sidebar="openSidebar" />
	<UIContent />
</template>
