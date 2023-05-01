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
        <input placeholder="New Password" v-model="password1" type="password"/>
      </div>
      <div class="form-row">
        <input
            placeholder="Repeat New Password"
            v-model="password2"
            type="password"
        />
      </div>
      <button class="mt-1" type="submit">Submit</button>
    </form>
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
      username: "",
      password1: "",
      password2: "",
    };
  },
  created() {
    useMainStore().setTitle('Restore Password');
  },
  methods: {
    submit() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const data = {
        username: this.username,
        password1: this.password1,
        password2: this.password2,
        token: urlParams.get('token'),
      }
      useAuthStore().restorePassword(data).then(() => {
        useRouter().push('/');
      })
    },
  },
})
</script>