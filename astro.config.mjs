import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    root: './client',
    srcDir: './client/src',
    publicDir: './client/public',
    outDir: './client/dist',
    integrations: [
        react(),
        tailwind()
    ]
});
