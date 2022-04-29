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
export default {
  methods: {
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