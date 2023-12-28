<template>
    <pj-dialog title="Restore Backup">
        <el-form>
            <el-form-item label="Upload Backup ZIP">
                <input type="file" @change="uploadBackup"/>
            </el-form-item>
        </el-form>
    </pj-dialog>
</template>

<script lang="ts">
import {buildRequest, send} from "@/src/helpers/xhr";
import {defineComponent} from "vue";

export const route = "/admin/restore-backup";

export default defineComponent({
    name: 'RestoreBackup',
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
    }
})
</script>