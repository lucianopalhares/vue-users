export default {
    buildModules: [
        // Simple usage
        '@nuxtjs/vuetify',
    
        // With options
        ['@nuxtjs/vuetify', { /* module options */ }]
    ],
    modules: ['@nuxtjs/axios'],
    plugins: [
        { src: '@/plugins/axios.js' }
    ],
    axios: {
       
    }
  }