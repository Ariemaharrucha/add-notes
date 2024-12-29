import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
    globalCss: {
      html: {
        background: ""
      },
    },
  })
  
  export const system = createSystem(defaultConfig, config)