<template>
  <div>
    <h2>Edit Gallery</h2>
    <router-link :to="'/edit?' + query" class="edit-button"
      >&lt;- Return</router-link
    >
    <div class="images">
      <div
        class="gallery-image"
        v-for="(image, index) in getGallery"
        :key="index"
      >
        <img :src="image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditGallery",
  props: ["entry"],
  created() {
    this.$store.dispatch("getGallery", { entry: this.entry });
  },
  computed: {
    getGallery() {
      return this.$store.getters.gallery;
    },
    query() {
      const q = { entry: this.entry };
      let query = Object.entries(q)
        .map(([key, val]) => `${key}=${val}`)
        .join("&");
      return query;
    },
  },
};
</script>