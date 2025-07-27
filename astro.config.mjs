import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
    site: 'https://mikhailkolesnikov.com',
    output: "server",
    adapter: node({ mode: "standalone" }),
});
