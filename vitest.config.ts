import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    server: {
      deps: {
       
        inline: [/src\/infra\/database\/typeorm\/entities/],
      },
    },
  },
})