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
