import { defineConfig } from 'vite';

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
      // Lit marked as external - i.e. a peer dependency.
      external: /^lit/,
    },
    outDir: 'dist',
  },
  // TODO: could just import CSS modules and then '.toString' but that's inefficient - will work but every instance will have copy of CSS as string. better to try and use https://lit.dev/docs/api/styles/#adoptStyles.
  // TODO: is there a way to import CSS Modules just as is, as a string? 'Native' or Chrome CSS modules would require a polyfill and happen at run time, and I wanna actually do it at build-time to make sure the components are self-contained. So is there a way to import and use as a string but without the hashing? CSS MOdules has an option for this perhaps? Or do I want to do it at runtime???
  // TODO: work on this stuff more as intended - got distracted by AC search talk all day. Ok, but a major distraction - glad to have helped sort it tho!
});
