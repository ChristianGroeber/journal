<template>
  <div v-if="isShowing" class="image">
    <div class="img-controls">
      <vk-button class="btn btn-rounded btn-icon" @click="copyUrl">
        <fa icon="clipboard"></fa>
      </vk-button>
      <vk-button class="btn btn-rounded btn-danger btn-icon" @click="deleteMedia">
        <fa icon="trash"></fa>
      </vk-button>
    </div>
    <template v-if="amVideo">
      <video :src="media" />
    </template>
    <template v-else-if="amImage">
      <img :src="media" alt="Image" />
    </template>
    <div class="url">![uploaded media]({{ media }})</div>
  </div>
</template>

<script>
import axios from 'axios';
import {getFileExtension} from "../../../../helpers/files";
export default {
  props: ["media", "myId"],
  data: function() {
    return {
      isShowing: true,
    };
  },
  computed: {
    amVideo() {
      return ['webm', 'mp4', 'mov', 'avi', 'mkv'].includes(getFileExtension(this.media).pop());
    },
    amImage() {
      return ['jpg', 'jpeg', 'png', 'webp'].includes(getFileExtension(this.media).pop());
    },
  },
  methods: {
    deleteMedia() {
      if (!confirm('Are you sure you want to delete this Image/ Video?')) {
        return;
      }
      const data = {
        image: this.img,
        token: this.$store.getters.token,
      };
      let query = Object.entries(data)
        .map(([key, val]) => `${key}=${val}`)
        .join("&");

      axios.delete('/api/admin/entry/media/delete?' + query)
        .then((response) => {
          this.isShowing = false;
        });
    },
    copyUrl() {
      const mediaUrl = document.querySelector(
        ".image#img-" + this.myId + " .url"
      );
      const range = document.createRange();
      range.selectNode(mediaUrl);
      window.getSelection().addRange(range);

      document.execCommand("copy");

      window.getSelection().removeAllRanges();
    },
  },
};
</script>

<style lang="scss" scoped>
.image {
  width: 50%;
  position: relative;

  img {
    width: 100%;
  }

  .url {
    font-size: 1px;
  }

  &:hover .img-controls {
    display: flex;
  }
}

.img-controls {
  display: none;
  height: 100%;
  width: 100%;
  background-color: rgba(116, 116, 116, 0.25);
  position: absolute;
  top: 0;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width: 500px) {
  .image {
    width: 25%;
  }
}
</style>