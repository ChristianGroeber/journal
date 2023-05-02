<template>
  <div v-if="isShowing" class="media">
    <div class="media-meta-controls">
      <pj-button-link :action="copyUrl" icon="clipboard"></pj-button-link>
      <pj-button-link :action="deleteMedia" icon="trash"></pj-button-link>
      <pj-button-link :action="previewMedia" icon="eye"></pj-button-link>
    </div>
    <template v-if="amVideo">
      <img src="/public/assets/video-thumbnail.png" alt="Thumbnail">
    </template>
    <template v-else-if="amImage">
      <img :src="media" alt="Image"/>
    </template>
    <div class="url">![uploaded media]({{ media }})</div>
  </div>
</template>

<script lang="ts">
import {getFileExtension} from "../../../../helpers/files";
import {buildRequest, send} from "@/src/helpers/xhr";
import {defineComponent} from "vue";
import {useJournalStore} from "@/src/store/journal";
import {useAuthStore} from "@/src/store/auth";
import {useMainStore} from "@/src/store/main";

export default defineComponent({
  props: ["media", "myId", "slug", "srcMedia"],
  data: function () {
    return {
      isShowing: true,
      authStore: useAuthStore(),
      journalStore: useJournalStore(),
      mainStore: useMainStore(),
    };
  },
  computed: {
    amVideo() {
      return ['webm', 'mp4', 'mov', 'avi', 'mkv'].includes(getFileExtension(this.media).pop());
    },
    amImage() {
      return ['jpg', 'jpeg', 'png', 'webp'].includes(getFileExtension(this.media).pop());
    },
    mediaType() {
      if (this.amImage) {
        return 'image';
      }
      if (this.amVideo) {
        return 'video';
      }
    },
  },
  methods: {
    previewMedia() {
      this.mainStore.setShowMediaPreview({
        showing: true,
        src: this.srcMedia,
        mediaType: <string>this.mediaType,
      });
    },
    deleteMedia() {
      if (!confirm('Are you sure you want to delete this Image/ Video?')) {
        return;
      }
      const data = {
        media: this.srcMedia,
        token: this.authStore.getToken,
      };

      const request = buildRequest('/api/admin/entry/media/delete', data, 'DELETE');
      send(request).then(response => {
        this.isShowing = false;
      });
    },
    copyUrl() {
      const mediaUrl = <Node>document.querySelector(
          ".media#" + this.slug + "-" + this.myId + " .url"
      );
      const range = document.createRange();
      range.selectNode(mediaUrl);
      window.getSelection()?.addRange(range);

      document.execCommand("copy");

      window.getSelection()?.removeAllRanges();
    },
  },
})
</script>

<style lang="scss" scoped>
.media {
  width: 50%;
  position: relative;

  img {
    width: 100%;
  }

  .url {
    font-size: 1px;
  }
}

.media-meta-controls {
  display: flex;
  height: 100%;
  width: 100%;
  background-color: rgba(116, 116, 116, 0.25);
  position: absolute;
  top: 0;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width: 500px) {
  .media {
    width: 25%;

    .media-meta-controls {
      display: none;
    }

    &:hover .media-meta-controls {
      display: flex;
    }
  }
}
</style>