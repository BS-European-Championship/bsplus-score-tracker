import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import darkClass from 'postcss-dark-theme-class'
import nesting from 'postcss-nesting'

export default defineConfig({
  plugins: [solid()],
  css: {
    postcss: {
      plugins: [
        darkClass,
        nesting
      ]
    }
  }
})
