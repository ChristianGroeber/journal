<template>
  <footer>
    <span>
      PixlJournal Version {{ version }}
    </span>
    |
    <span>
      <a href="/auth/login">Login</a>
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