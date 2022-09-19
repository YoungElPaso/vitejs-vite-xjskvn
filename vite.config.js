import { defineConfig } from 'vite';

import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Single entry point for lib - all exports (i.e. all components imported/exported there.)
      entry: 'src/mds-web-components.ts',
      formats: ['es'],
      // Global namespace for the library.
      name: 'mdsWebComponents',
      // Output filename of libary.
      fileName: 'mds-wcs',
    },
    rollupOptions: {
      // Lit marked as external - i.e. a peer dependency. Reduces bundle size if external by 22Kb but adds complexity - required to be loaded separately. TODO: Consider benefits of NOT bundling Lit directly later.
      // external: /^lit/,
    },
    outDir: 'dist',
  },
  plugins: [
    viteStaticCopy({
      targets: [{ src: 'src/wc-common.css', dest: './' }],
    }),
  ],
});
