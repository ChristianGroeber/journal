<template>
  <div class="main-content">
    <div>
      <router-link class="btn" to="/auth">Return</router-link>
    </div>
    <form @submit.prevent="submit">
      <div class="form-row">
        <input placeholder="Username" v-model="username" type="text"/>
      </div>
      <div class="form-row">
        <input
            placeholder="Current Password"
            v-model="currentPassword"
            type="password"
        />
      </div>
      <div class="form-row">
        <input placeholder="Password" v-model="newPassword1" type="password"/>
      </div>
      <div class="form-row">
        <input
            placeholder="Repeat Password"
            v-model="newPassword2"
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
      username: "",
      currentPassword: "",
      newPassword1: "",
      newPassword2: "",
    };
  },
  methods: {
    submit() {
      const data = {
        username: this.username,
        currentPassword: this.currentPassword,
        newPassword1: this.newPassword1,
        newPassword2: this.newPassword2,
      }
      useAuthStore().changePassword(data).then(() => {
        useRouter().push('/');
      })
    },
  },
})
</script>
