<template>
    <div class="main-content">
        <div>
            <router-link class="btn" to="/auth">Return</router-link>
        </div>
        <form @submit.prevent="submit">
            <div class="form-row">
                <input placeholder="Username" v-model="form.username" type="text"/>
            </div>
            <div class="form-row">
                <input
                    placeholder="Current Password"
                    v-model="form.currentPassword"
                    type="password"
                />
            </div>
            <div class="form-row">
                <input placeholder="Password" v-model="form.newPassword1" type="password"/>
            </div>
            <div class="form-row">
                <input
                    placeholder="Repeat Password"
                    v-model="form.newPassword2"
                    type="password"
                />
            </div>
            <button class="mt-1" type="submit">Submit</button>
        </form>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useAuthStore} from "@/src/store/auth";
import {useRouter} from "vue-router";

export default defineComponent({
    data: () => {
        return {
            form: {
                username: "",
                currentPassword: "",
                newPassword1: "",
                newPassword2: "",
            },
            router: useRouter(),
        };
    },
    methods: {
        submit() {
            useAuthStore().changePassword(this.form).then(() => {
                this.router.push('/');
            })
        },
    },
})
</script>
