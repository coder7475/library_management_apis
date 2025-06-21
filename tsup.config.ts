import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  dts: true,
  esbuildOptions(options) {
    options.alias = {
      '@': './src'
    };
  }
});
