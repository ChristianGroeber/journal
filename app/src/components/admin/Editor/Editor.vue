<template>
  <div class="main-content">
    <EditEntry :entry="entry"></EditEntry>
    <ImageEditor :entry="entry"></ImageEditor>
  </div>
</template>

<script>
import EditEntry from "./EditEntry.vue";
import ImageEditor from "./Images/ImageEditor.vue";
export default {
  props: ["entry"],
  components: {
    EditEntry,
    ImageEditor,
  },
};
</script>