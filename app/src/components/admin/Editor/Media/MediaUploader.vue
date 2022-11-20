<template>
  <div>
    <input
      :accept="mimeTypes"
      @change="uploadMedia"
      type="file"
      multiple
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["entry"],
  data() {
    return {
      mediaTypes: this.$store.getters.mediaTypes,
    }
  },
  computed: {
    mimeTypes() {
      return this.mediaTypes.map(media => media.mime);
    }
  },
  methods: {
    uploadMedia(e) {
      const files = e.target.files;
      const editingEntry = this.$store.getters.editingEntry;
      Array.from(files).forEach((img) => {
        const formData = new FormData();
        formData.append(Array.from(files).indexOf(img), img);
        formData.append("entry", this.entry);
        formData.append("token", this.$store.getters.token);
        axios.post("/api/entry/gallery/upload", formData).then((response) => {
          const img = response.data.files[0][1080];
          console.log(img);
          editingEntry.raw_content +=
            "![uploaded image](" + encodeURI(img) + ")";
        });
      });
      this.$store.dispatch("updateEntry", { entry: editingEntry });
      this.$store.dispatch("loadMediaForEntry", { entry: editingEntry.id, token: this.$store.getters.token});
    },
  },
};
</script>