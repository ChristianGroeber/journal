<template>
    <el-dialog title="Login" v-model="isShowing">
        <el-form :model="loginForm">
            <el-form-item label="Username">
                <el-input v-model="loginForm.username"/>
            </el-form-item>
            <el-form-item label="Password">
                <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <pj-button-link :action="submitLoginForm" content="Login"></pj-button-link>
      </span>
        </template>
    </el-dialog>
</template>

<script>
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";
import {useAuthStore} from "@/src/store/auth";
import {useDialogStore} from "@/src/store/dialog";

const route = "/auth/login";

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
    computed: {
        isShowing: {
            get() {
                return this.dialogStore.isDialogShowing(route);
            },
            set() {
                this.dialogStore.hideDialog(route);
            }
        },
    },
})
</script>