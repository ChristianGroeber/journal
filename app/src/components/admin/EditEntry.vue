<template>
<div class="main-content">
    <div style="margin: 1rem 0">
      <router-link class="btn" :to="'/'">Return</router-link>
    </div>
    <div class="container">
      <!-- <markdown-editor :value="markdown"></markdown-editor> -->
      <textarea ref="editEntry" class="edit-entry" :value="markdown"></textarea>
      <div class="actions">
        <input
          accept="image/*"
          @change="uploadImages"
          type="file"
          label="Upload Images"
          multiple
        />
        <button @click="save">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["entry"],
  created() {
    this.$store.dispatch("getEntry", {
      entry: this.entry,
      token: this.$store.getters.token,
    });
  },
  computed: {
    markdown() {
      return this.$store.getters.editingEntry.raw_content;
    },
  },
  methods: {
    save() {
      const newContent = this.$refs.editEntry.value;
      const entry = this.$store.getters.editingEntry;
      entry.raw_content = newContent;
      this.$store
        .dispatch("updateEntry", {
          entry: entry,
          token: this.$store.getters.token,
        })
        .then(() => {
          this.$store.dispatch("getEntries");
        });
    },
    uploadImages(e) {
      console.log(e.target.files);
      const formData = new FormData();
      Array.from(e.target.files).forEach((img) => {
        console.log(img);
        formData.append(Array.from(e.target.files).indexOf(img), img);
      });
      formData.append("entry", this.entry);
      formData.append("token", this.$store.getters.token);
      console.log(formData);
      axios.post("/api/entry/gallery/upload", formData).then((response) => {
        const images = response.data.files;
        images.forEach((img) => {
          this.$refs.editEntry.value +=
            "![uploaded image](" + encodeURI(img) + ")";
        });
      });
    },
  },
};
</script>