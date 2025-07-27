import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
    site: 'https://mishakolesnikov.com',
    output: "server",
    adapter: node({ mode: "standalone" }),
    vite: {
        server: {
            allowedHosts: ['mishakolesnikov.com', 'localhost', '127.0.0.1'],
        },
    },
});
