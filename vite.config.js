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
			'@UI': path.resolve(__dirname, './src/components/UI'),
			'@Builder': path.resolve(__dirname, './src/components/Builder'),
			'@Block': path.resolve(__dirname, './src/components/Block'),
			'@Field': path.resolve(__dirname, './src/components/Field'),
			'@element': path.resolve(__dirname, './src/components/Admin/Element'),
			'@styles': path.resolve(__dirname, './src/assets/scss'),
			'@images': path.resolve(__dirname, './src/assets/img'),
		},
	},
});
