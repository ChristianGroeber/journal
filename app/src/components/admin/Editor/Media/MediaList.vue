<template>
  <div>
    <div class="d-flex gap-1 ai_center">
      <h3>Media</h3>
      <div>
        <vk-button class="btn btn-primary btn-icon btn-rounded" @click="getGallery"><fa icon="download"></fa></vk-button>
      </div>
    </div>
    <div class="images-list d-flex">
      <Media class="image" v-for="(img, index) in images" :key="index" :id="'img-' + index" :myId="index" :img="img"></Media>
    </div>
  </div>
</template>

<script>
import Media from "./Media.vue"
export default {
  props: ["entry"],
  components: {
    Media,
  },
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
