export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  components: true,
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'To-Do List\'s Pierrick',
      meta: [
        { name: 'description', content: 'To-Do List' },
        { name: 'keywords', content: 'tâches, todo list, vuejs, nuxtjs' },
        { name: 'author', content: 'Pierrick TAÏLY' },
      ],
    },
  },
})