<template>
  <vk-modal :show.sync="show">
    <vk-modal-close @click="hidePopup"></vk-modal-close>
    <vk-modal-title>Preview</vk-modal-title>
    <div>
      <template v-if="mediaType === 'video'">
        <video controls>
          <source :src="mediaSrc">
        </video>
      </template>
      <template v-if="mediaType === 'image'">
        <img :src="mediaSrc">
      </template>
    </div>
    <div slot="footer">
      <div class="uk-text-right">
        <vk-button class="btn btn-primary" @click="hidePopup">Close</vk-button>
      </div>
    </div>
  </vk-modal>
</template>

<script>
export default {
  name: "MediaPreview",
  computed: {
    mediaSrc() {
      return this.$store.getters.mediaPreview.src;
    },
    mediaType() {
      return this.$store.getters.mediaPreview.mediaType;
    },
    show: {
      get() {
        return this.$store.getters.mediaPreview.showing;
      },
      set() {
        this.$store.dispatch("hideMediaPreview");
      },
    },
  },
  methods: {
    hidePopup() {
      this.$store.dispatch("hideMediaPreview");
    },
  },
}
</script>