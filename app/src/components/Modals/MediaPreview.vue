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

<script lang="ts">
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";

export default defineComponent({
  name: "MediaPreview",
  data() {
    return {
      mainStore: useMainStore(),
    }
  },
  computed: {
    mediaSrc() {
      return this.mainStore.getMediaPreview.src;
    },
    mediaType() {
      return this.mainStore.getMediaPreview.mediaType;
    },
    show: {
      get() {
        return this.mainStore.getMediaPreview.showing;
      },
      set() {
        this.mainStore.hideMediaPreview();
      },
    },
  },
  methods: {
    hidePopup() {
      this.mainStore.hideMediaPreview();
    },
  },
})
</script>