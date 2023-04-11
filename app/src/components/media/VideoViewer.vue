<template>
  <video width="1080" height="720" controls>
    <source :src="video">
  </video>
</template>

<script>
export default {
  name: "MediaViewer",
  data() {
    return {
      video: '',
    }
  },
  created() {
    let params = new URL(document.location).searchParams;
    this.video = params.get("video");
  }
}
</script>

<style scoped>

</style>