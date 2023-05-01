<template>
  <div class="main-content">
    <div>
      <vk-button class="btn btn-primary" @click="auth">Return</vk-button>
    </div>
    <form @submit.prevent="login">
      <fieldset class="uk-fieldset">
        <div class="form-row">
          <input class="uk-input" ref="autofocus" @keyup.enter="login" v-model="username" placeholder="username" />
        </div>
        <div class="form-row">
          <input class="uk-input" @keyup.enter="login" v-model="password" placeholder="password" type="password" />
        </div>
      </fieldset>
      <vk-button class="btn btn-primary" @click="login">Login</vk-button>
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
      password: "",
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
      const data = {
        username: this.username,
        password: this.password,
      };
      this.authStore.login(data).then(() => {
        this.router.push('/');
      });
    },
    auth() {
      this.router.push("/auth");
    }
  },
})
</script>