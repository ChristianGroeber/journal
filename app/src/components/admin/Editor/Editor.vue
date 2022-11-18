<template>
  <div class="main-content">
    <EditEntry :entry="entry"></EditEntry>
    <MediaUploader :entry="entry"></MediaUploader>
    <MediaList :entry="entry"></MediaList>
  </div>
</template>

<script>
import EditEntry from "./EditEntry.vue";
import MediaUploader from "./Media/MediaUploader.vue";
import MediaList from "./Media/MediaList.vue";

export default {
  props: ["entry"],
  data: function () {
    return {
      title: "Edit " + this.entry,
    }
  },
  created() {
    this.$store
      .dispatch("getEntry", {
        entry: this.entry,
        token: this.$store.getters.token,
      })
      .then(() => {
        this.$store.dispatch('setTitle', "Edit " + this.$store.getters.editingEntry.meta.title);
        this.$store.dispatch("loadImagesForEntry", { entry: this.entry });
      });
  },
  components: {
    EditEntry,
    MediaUploader,
    MediaList,
  },
};
</script>