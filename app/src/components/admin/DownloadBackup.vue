<template>
  <div>
    <button @click="generateBackup()">Backup</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    generateBackup: function () {
      axios
        .get("/api/admin/generate-backup?token=" + this.$store.getters.token)
        .then((response) => {
          location.href = response.data.file;
        });
    },
  },
};
</script>