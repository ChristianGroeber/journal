<template>
  <div class="main-content">
    <vk-button class="btn btn-icon btn-primary" @click="goBack">
      <fa icon="arrow-left"></fa>
    </vk-button>
    <label for="upload_backup">Upload Backup ZIP</label>
    <input @change="uploadBackup" type="file" id="upload_backup">
  </div>
</template>

<script>
import {buildRequest, send} from "@/src/helpers/xhr";
import {defineComponent} from "vue";
import {useAuthStore} from "@/src/store/auth";
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'RestoreBackup',
  methods: {
    uploadBackup(e) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("backup", file);
      formData.append("token", useAuthStore().getToken);

      const request = buildRequest('/api/admin/restore-backup', formData, 'POST');
      send(request).then(response => {
        console.log(response)
      });
    },
    goBack() {
      useRouter().push('/admin/tools');
    },
  }
})
</script>