<template>
    <pm-dialog title="Login">
        <el-form :model="loginForm">
            <el-form-item label="Username">
                <el-input v-model="loginForm.username"/>
            </el-form-item>
            <el-form-item label="Password">
                <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
        </el-form>
      <pj-button-link :action="submitLoginForm" content="Login"></pj-button-link>
    </pm-dialog>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";
import {useDialogStore, useAuthStore} from "pixlcms-wrapper";

export const route = "/auth/login";

export default defineComponent({
    name: "LoginModal",
    data() {
        return {
            loginForm: {
                username: '',
                password: '',
            },
            authStore: useAuthStore(),
            mainStore: useMainStore(),
            dialogStore: useDialogStore(),
        }
    },
    methods: {
        submitLoginForm() {
            this.authStore.login(this.loginForm).then(() => {
                this.dialogStore.hideDialog(route);
            })
        },
    },
})
</script>
