const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "NoteApp",
    themeColor: "#ffc300",
    appleMobileWebAppCapable: 'yes',
    iconPaths: {
      faviconSVG: 'img/icons/note.svg',
      favicon32: 'img/icons/note-32x32.png',
      favicon16: 'img/icons/note-16x16.png',
      appleTouchIcon: 'img/icons/note-152x152.png',
      maskIcon: 'img/icons/note.svg',
      msTileImage: 'img/icons/note-144x144.png'
    },
    manifestOptions: {
      start_url: '/'
    }
  }
})
