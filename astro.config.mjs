import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://mikhailkolesnikov.ru',
    output: "static",
    trailingSlash: "never",
    outDir: './out',
    build: {
        format: "file",
        assets: 'assets',
        inlineStylesheets: 'always',
    },
    vite: {
        build: {
            rollupOptions: {
                output: {
                    entryFileNames: 'js/main.js',
                    chunkFileNames: 'js/[name].js',
                    assetFileNames: (assetInfo) => {
                        const name = assetInfo.name || '';
                        if (/\.(png|jpe?g|svg|gif|webp|ico)$/i.test(name)) {
                            return 'images/[name][extname]';
                        }
                        if (/\.css$/i.test(name)) {
                            return 'css/[name][extname]';
                        }
                        if (/\.(woff2?|ttf|eot)$/i.test(name)) {
                            return 'fonts/[name][extname]';
                        }
                        return 'assets/[name][extname]';
                    }
                }
            }
        },
        esbuild: {
            target: 'esnext'
        }
    }
});
