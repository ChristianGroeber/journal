<template>
  <div class="main-content">
    <EditEntry :entry="entry"></EditEntry>
    <ImageEditor :entry="entry"></ImageEditor>
    <ImageList :entry="entry"></ImageList>
  </div>
</template>

<script>
import EditEntry from "./EditEntry.vue";
import ImageEditor from "./Images/ImageEditor.vue";
import ImageList from "./Images/ImageList.vue";
export default {
  props: ["entry"],
  created() {
    this.$store
      .dispatch("getEntry", {
        entry: this.entry,
        token: this.$store.getters.token,
      })
      .then(() => {
        this.$store.dispatch("loadImagesForEntry", { entry: this.entry });
      });
  },
  components: {
    EditEntry,
    ImageEditor,
    ImageList,
  },
};
</script>