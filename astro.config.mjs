import { defineConfig } from 'astro/config';

export default defineConfig({
    root: './client',
    srcDir: './client/src',
    publicDir: './client/public',
    outDir: './client/dist'
});
