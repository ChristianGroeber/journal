<template>
  <div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout: function () {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};
</script>