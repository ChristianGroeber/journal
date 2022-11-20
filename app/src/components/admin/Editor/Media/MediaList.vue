<template>
  <div>
    <div class="d-flex gap-1 ai_center">
      <h3>Media</h3>
      <div>
        <vk-button class="btn btn-primary btn-icon btn-rounded" @click="getGallery">
          <fa icon="download"></fa>
        </vk-button>
      </div>
    </div>
    <div class="images-list" v-for="(mediaList, i) in media" :key="i">
      <h4>{{ mediaList.name }}</h4>
      <div class="d-flex">
        <Media v-for="(med, y) in mediaList.media" :key="y" :id="'med-' + y" :myId="y"
               :media="med"></Media>
      </div>
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
      media: this.$store.getters.gallery,
    };
  },
  methods: {
    getGallery() {
      this.$store
          .dispatch("loadMediaForEntry", {entry: this.entry, token: this.$store.getters.token})
          .then(() => {
            this.media = this.$store.getters.gallery;
          });
    },
  },
};
</script>
