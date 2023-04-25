<template>
  <div :style="'width: ' + loadingWidth + '%'" class="loader"></div>
</template>

<script>
export default {
  name: "Loading",
  computed: {
    loadingWidth() {
      return this.$store.getters.estimatedProgress;
    },
  }
};
</script>

<style scoped>
.loader {
  display: block;
  position: fixed;
  height: 3px;
  width: 0;
  top: 0;
  background-color: red;
  z-index: 100;
  border-top-right-radius: 1px;
  border-top-left-radius: 1px;
}
</style>
