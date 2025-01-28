import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue()],
	optimizeDeps: {
		include: ['quill'],
	},
	test: {
		globals: true,
		environment: 'jsdom',
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@Block': path.resolve(__dirname, './src/components/Block'),
			'@admin': path.resolve(__dirname, './src/components/Admin'),
			'@styles': path.resolve(__dirname, './src/assets/scss'),
			'@images': path.resolve(__dirname, './src/assets/img'),
		},
	},
});
