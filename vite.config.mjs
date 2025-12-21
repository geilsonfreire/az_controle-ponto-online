import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist',
    },
    server: {
        host: true, // equivale a 0.0.0.0 — expõe rederamente local na rede
        port: 5173,
        strictPort: false,
    },
});