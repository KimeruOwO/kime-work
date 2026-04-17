import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'https://kimeyu.vercel.app',
    output: 'static',
    scopedStyleStrategy: 'class',
    devToolbar: {
        enabled: false,
    },
    build: {
        inlineStylesheets: 'never'
    },
    vite: {
        build: {
            cssMinify: 'lightningcss',
            sourcemap: false,
        }
    },
    image: {
        domains: ['media.graphassets.com', 'eu-central-1-shared-euc1-02.graphassets.com'],
        remotePatterns: [{ protocol: "https" }]
    }
});