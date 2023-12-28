<template>
    <div class="main-content">
        <pj-navbar :nav="nav"></pj-navbar>
    </div>
</template>

<script lang="ts">
import {buildRequest, send} from "@/src/helpers/xhr";
import {useAuthStore} from "@/src/store/auth";
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";

export default defineComponent({
    data() {
        return {
            nav: [
                {
                    label: 'Home',
                    page: '/',
                },
                {
                    label: 'Generate Backup',
                    func: this.generateBackup,
                },
                {
                    label: 'Restore Backup',
                    func: this.restoreBackup,
                },
                {
                    label: 'Rebuild Cache',
                    func: this.rebuildCache,
                },
            ],
            authStore: useAuthStore(),
        }
    },
    methods: {
        generateBackup: function () {
            const request = buildRequest('/api/admin/generate-backup')
            send(request).then(response => {
                location.href = response.data.file;
            });
        },
        rebuildCache() {
            useMainStore().buildCache();
        },
        restoreBackup() {
        },
        goHome() {
        },
    }
})
</script>