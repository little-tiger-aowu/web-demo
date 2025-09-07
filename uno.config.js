import { defineConfig,presetUno,presetIcons  } from 'unocss'

export default defineConfig({
    // ...UnoCSS options
    presets:[
        presetUno(),
        presetIcons({
            warn: true,
            prefix: ['uil-'],
            extraProperties: {
                display: 'inline-block',
            },
        })
    ]
})