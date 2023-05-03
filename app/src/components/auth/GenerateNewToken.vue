<template>
  <div class="main-content">
    <div>
      <router-link class="btn" to="/auth">Return</router-link>
    </div>
    <form @submit.prevent="submit">
      <div>
        <input placeholder="Username" v-model="username" type="text" />
        <br />
      </div>
      <button class="mt-1" type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useAuthStore} from "@/src/store/auth";

export default defineComponent({
  data: () => {
    return {
      username: "",
    };
  },
  methods: {
    submit() {
      const data = {
        username: this.username,
        token: useAuthStore().getToken,
      }
      useAuthStore().generateNewToken(data)
    },
  },
})
</script>
