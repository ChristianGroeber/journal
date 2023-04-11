<template>
  <footer>
    PixlJournal Version {{ version }}
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
}
</style>