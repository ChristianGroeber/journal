<template>
  <div>
    <div class="d-flex gap-1 ai_center">
      <h3>Media</h3>
      <div>
        <pj-button-link :action="getGallery" icon="download"></pj-button-link>
      </div>
    </div>
    <div v-for="(mediaList, i) in media" :key="i">
      <h4>{{ mediaList.name }}</h4>
      <div class="d-flex">
        <Media v-for="(med, y) in mediaList.media" :slug="mediaList.slug" :key="y" :id="mediaList.slug + '-' + y" :myId="y"
               :media="med.default" :src-media="med.source"></Media>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Media from "./Media.vue"
import {defineComponent} from "vue";
import {useJournalStore} from "@/src/store/journal";
import {useAuthStore} from "@/src/store/auth";

export default defineComponent({
  props: ["entry"],
  components: {
    Media,
  },
  data: function () {
    return {
      journalStore: useJournalStore(),
      authStore: useAuthStore(),
      media: useJournalStore().getGallery,
    };
  },
  methods: {
    getGallery() {
      const data = {
        entry: this.entry,
        token: this.authStore.getToken,
      }
      this.journalStore.loadMediaForEntry(data).then(() => {
        this.media = this.journalStore.getGallery;
      });
    },
  },
})
</script>
