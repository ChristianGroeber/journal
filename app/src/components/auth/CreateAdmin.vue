<template>
    <div class="main-content">
        <el-form>
            <el-form-item label="Admin Username">
                <el-input v-model="adminForm.username"></el-input>
            </el-form-item>
            <el-form-item label="Admin Password">
                <el-input v-model="adminForm.password"></el-input>
            </el-form-item>
            <el-button @click="submit">Submit</el-button>
        </el-form>
    </div>
</template>

<script lang="ts">
import {buildRequest, send} from "@/src/helpers/xhr";
import {useRouter} from "vue-router";
import {defineComponent} from "vue";

export default defineComponent({
    data: function () {
        return {
            adminForm: {
                username: '',
                password: '',
            },
            router: useRouter(),
        }
    },
    created: function () {
        const request = buildRequest('/api/auth/create-admin');
        send(request).catch(reason => {
            if (reason.response.status === 400) {
                alert(reason.response.data.message);
            }
        });
    },
    methods: {
        submit() {
            const data = this.adminForm
            const request = buildRequest('/api/auth/create-admin', data, 'POST');
            send(request)
                .then(response => {
                    if (response.data.adminCreated) {
                        this.router.push('/auth/login');
                    }
                })
                .catch((reason) => {
                    if (reason.response.status === 400) {
                        alert(reason.response.data.message);
                    }
                });
        }
    }
})
</script>