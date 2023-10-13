<template>
    <div class="main-content">
        <pj-button-link content="Return" :action="goBack"></pj-button-link>
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
    data() {
        return {
            router: useRouter(),
        }
    },
    methods: {
        uploadBackup(e) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("backup", file);

            const request = buildRequest('/api/admin/restore-backup', formData, 'POST');
            send(request).then(response => {
                console.log(response)
            });
        },
        goBack() {
            this.router.push('/admin/tools');
        },
    }
})
</script>