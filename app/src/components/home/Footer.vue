<template>
  <footer>
    <span>
      PixlJournal Version {{ version }}
    </span>
    |
    <span>
      <a @click="showLoginForm">Login</a>
    </span>
    |
    <span>
      <a href="https://github.com/ChristianGroeber/journal">GitHub</a>
    </span>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    showLoginForm() {
      this.$store.commit('SHOW_LOGIN_POPUP', true);
    },
  },
  computed: {
    version() {
      return this.$store.getters.meta.version;
    },
  },
}
</script>


<style scoped>
footer {
  text-align: center;
  font-size: 0.8rem;
  margin: 1rem auto;
}
</style>