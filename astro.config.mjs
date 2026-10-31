import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'https://kimeyu.vercel.app',
    output: 'static',
    scopedStyleStrategy: 'class',
    devToolbar: {
        enabled: false,
    },
    prefetch: {
        prefetchAll: true,
        defaultStrategy: 'viewport'
    },
    build: {
        inlineStylesheets: 'never'
    },
    vite: {
        server: {
            allowedHosts: true
        },
        build: {
            cssMinify: 'lightningcss',
            sourcemap: false,
        }
    },
    image: {
        domains: ['media.graphassets.com', 'eu-central-1-shared-euc1-02.graphassets.com', 'us-west-2.graphassets.com'],
        remotePatterns: [{ protocol: "https" }]
    }
});
