<template>
  <div class="image">
    <div class="img-controls"></div>
    <img @click="copyUrl" :src="img" alt="Image" />
    <div class="url">![uploaded image]({{ img }})</div>
  </div>
</template>

<script>
export default {
  props: ["img", "myId"],
  methods: {
    copyUrl() {
      const imgUrl = document.querySelector(
        ".image#img-" + this.myId + " .url"
      );
      const range = document.createRange();
      range.selectNode(imgUrl);
      window.getSelection().addRange(range);

      console.log(document.execCommand("copy"));

      window.getSelection().removeAllRanges();
    },
  },
};
</script>

<style scoped>
.image {
  width: 50%;
}

.image img {
  width: 100%;
}

.image .url {
  font-size: 1px;
}

@media screen and (min-width: 500px) {
  .image {
    width: 25%;
  }
}
</style>