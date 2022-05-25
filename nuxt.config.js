import colors from 'vuetify/es5/util/colors'

let description = "「ボイコンブ」NTTソルマーレの提供する「ボイコネ」の\"シナリオ\"を\"小説\"へ変換する「非公式」サービスです";
let title = "ボイコンブ";
let path = "boiconv";
export default {
  ssr: false,
  
  target: 'static',
  
  head: {
    titleTemplate: title,//%s -
    title: title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { name: 'format-detection', content: 'telephone=no' },
      {httpEquiv: 'content-language', content: 'ja'},
      
      { hid: 'og:site_name', property: 'og:site_name', content: title },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: `https://service.nexsjp.com/${path}/` },
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'og:description', property: 'og:description', content: description },
      { hid: 'og:image', property: 'og:image', content: `https://service.nexsjp.com/${path}/icon.png` },
      { name: 'twitter:card', content: 'summary' },　//twitterの画像表示タイプ
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `/${path}/favicon.ico` },
    ]
  },
  
  css: [],
  
  plugins: [
    "@/plugins/myPlugins.js",
    '@/plugins/constants.js',
    '@/plugins/vue-papa-parse.js',
  ],
  
  components: true,
  
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
    '@nuxtjs/pwa',
  ],
  moment: {
    locales: ['ja']
  },
  
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    'vue-sweetalert2/nuxt',
    'nuxt-clipboard2',
  ],
  axios: {},
  
  pwa: {
    manifest: {
      lang: 'ja',
      name: title,
      short_name: title,
      title: title,
      description: description,
      theme_color: '#25475e',//#ff005a
      background_color: '#EEEEEE',
    },
    // icon: {
    //   source: `${path}/favicons/icon.png`,
    //   sizes: [16, 24, 32, 36, 48, 72, 96, 128, 144, 152, 160, 192, 196, 384, 512],
    // },
  },
  
  content: {},
  
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          // primary: colors.blue.darken3,
          primary: colors.purple.darken3,
          secondary: colors.pink.darken4,
          // secondary: "#8f7a5e",
          accent: "#e91e63",
          error: "#f44336",
          warning: "#ffc107",
          info: "#2196f3",
          success: "#4caf50"
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  router: {
    base: process.env.NODE_ENV === 'production' ? `/${path}/` : "/"
  },
  build: {
  }
}
