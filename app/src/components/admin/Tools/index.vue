<template>
  <div class="main-content">
    <div class="d-flex gap-1">
      <vk-button class="btn btn-icon btn-primary" @click="goHome">
        <fa icon="arrow-left"></fa>
      </vk-button>
      <vk-button class="btn btn-primary" @click="generateBackup">Generate Backup</vk-button>
      <vk-button class="btn btn-primary" @click="restoreBackup">Restore Backup</vk-button>
      <vk-button class="btn btn-primary" @click="rebuildCache">Rebuild Cache</vk-button>
    </div>
  </div>
</template>

<script lang="ts">
import {buildRequest, send} from "@/src/helpers/xhr";
import {useAuthStore} from "@/src/store/auth";
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";
import {useRouter} from "vue-router";

export default defineComponent({
  data() {
    return {
      authStore: useAuthStore(),
      router: useRouter(),
    }
  },
  methods: {
    generateBackup: function () {
      const request = buildRequest('/api/admin/generate-backup', {token: this.authStore.getToken})
      send(request).then(response => {
        location.href = response.data.file;
      });
    },
    rebuildCache() {
      const token = this.authStore.getToken;
      if (token === null) {
        throw 'Token is null';
      }
      useMainStore().buildCache(token);
    },
    restoreBackup() {
      this.router.push('/admin/tools/restore-backup');
    },
    goHome() {
      this.router.push('/');
    },
  }
})
</script>