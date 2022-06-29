export default {
    buildModules: [
        '@nuxtjs/vuetify',
    ],
    modules: ['@nuxtjs/axios'],
    plugins: [
        { src: '@/plugins/axios.js' },
        { src: '@/plugins/vuetify.js' },
    ],
    axios: {
       
    }
  }