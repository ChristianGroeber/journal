<template>
  <div>
    <input
      accept="image/*"
      @change="uploadImages"
      type="file"
      label="Upload Images"
      multiple
    />
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ["entry"],
  methods: {
    uploadImages(e) {
      const files = e.target.files;
      console.log(files);
      Array.from(files).forEach((img) => {
        const formData = new FormData();
        formData.append(Array.from(files).indexOf(img), img);
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
      });
    },
  },
};
</script>