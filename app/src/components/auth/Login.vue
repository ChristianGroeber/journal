<template>
    <div class="main-content">
        <div>
            <pj-button-link href="/auth" content="Return"></pj-button-link>
        </div>
        <el-form :model="loginForm" @submit.prevent="login">
            <el-form-item label="Username">
                <el-input v-model="loginForm.username"/>
            </el-form-item>
            <el-form-item label="Password">
                <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <pj-button-link :action="login" content="Login"></pj-button-link>
        </el-form>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";
import {useAuthStore} from "@/src/store/auth";
import {useRouter} from "vue-router";

export default defineComponent({
    data: () => {
        return {
            loginForm: {
                username: "",
                password: "",
            },
            authStore: useAuthStore(),
            router: useRouter(),
        };
    },
    created() {
        useMainStore().setTitle('Login');
    },
    mounted() {
        // this.$refs.autofocus.focus();
    },
    methods: {
        login() {
            this.authStore.login(this.loginForm).then(() => {
                this.router.push('/');
            });
        },
    },
})
</script>