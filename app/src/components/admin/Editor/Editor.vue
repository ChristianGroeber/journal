<template>
  <div class="main-content">
    <EditEntry :entry="entry"></EditEntry>
    <MediaUploader :entry="entry"></MediaUploader>
    <MediaList :entry="entry"></MediaList>
  </div>
</template>

<script lang="ts">
import EditEntry from "./EditEntry.vue";
import MediaUploader from "./Media/MediaUploader.vue";
import MediaList from "./Media/MediaList.vue";
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";
import {useJournalStore} from "@/src/store/journal";
import {useAuthStore} from "@/src/store/auth";

export default defineComponent({
  props: ["entry"],
  data: function () {
    return {
      title: "Edit " + this.entry,
    }
  },
  created() {
    const data = {
      entry: this.entry,
      token: useAuthStore().getToken,
    }
    useJournalStore().getEntry(data).then(() => {
      useMainStore().setTitle('Edit ' + useJournalStore().getEditingEntry?.meta.title);
      useJournalStore().loadMediaForEntry(data);
    })
  },
  components: {
    EditEntry,
    MediaUploader,
    MediaList,
  },
})
</script>