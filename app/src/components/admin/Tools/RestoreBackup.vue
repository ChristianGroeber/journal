<template>
  <div class="main-content">
    <vk-button class="btn btn-icon btn-primary" @click="goBack"><fa icon="arrow-left"></fa></vk-button>
    <label for="upload_backup">Upload Backup ZIP</label>
    <input @change="uploadBackup" type="file" id="upload_backup">
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RestoreBackup',
  methods: {
    uploadBackup(e) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("backup", file);
      formData.append("token", this.$store.getters.token);
      console.log(formData);
      axios.post("/api/admin/restore-backup", formData).then((response) => {
        console.log(response);
      });
    },
    goBack() {
      this.$router.push('/admin/tools');
    },
  }
}
</script>