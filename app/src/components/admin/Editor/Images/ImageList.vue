<template>
  <div>
    <div class="d-flex gap-1 ai_center">
      <h3>Images</h3>
      <div>
        <button @click="getGallery">reload</button>
      </div>
    </div>
    <div class="images-list d-flex">
      <div class="image" v-for="(img, index) in images" :key="index">
        <img :src="img" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["entry"],
  data: function () {
    return {
      images: this.$store.getters.gallery,
    };
  },
  methods: {
    getGallery() {
      this.$store
        .dispatch("loadImagesForEntry", { entry: this.entry })
        .then(() => {
          this.images = this.$store.getters.gallery;
        });
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

  @media screen and (min-width: 500px) {
    .image {
      width: 25%;
    }
  }
</style>