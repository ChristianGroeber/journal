<template>
  <div>
    <button @click="generateBackup()">Backup</button>
    <a :href="downloadLink">Download</a>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: {
    downloadLink: "",
  },
  methods: {
    generateBackup: function () {
      axios
        .get("/api/admin/generate-backup?token=" + this.$store.getters.token)
        .then((response) => {
          console.log(response.data);
          this.downloadLink = response.data.file;
        });
    },
  },
};
</script>