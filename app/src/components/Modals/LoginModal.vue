<template>
  <vk-modal :show.sync="show">
    <vk-modal-close @click="hidePopup"></vk-modal-close>
    <vk-modal-title>Login</vk-modal-title>
    <div>
      <form>
        <div>
          <input class="uk-input" v-model="username" type="text" placeholder="Username">
        </div>
        <div>
          <input class="uk-input" v-model="password" type="password" placeholder="Password">
        </div>
      </form>
    </div>
    <div slot="footer">
      <div class="uk-text-right">
        <vk-button class="btn btn-primary" @click="submitLoginForm">Login</vk-button>
      </div>
    </div>
  </vk-modal>
</template>

<script>
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";
import {useAuthStore} from "@/src/store/auth";

export default defineComponent({
  name: "LoginModal",
  data() {
    return {
      username: '',
      password: '',
      authStore: useAuthStore(),
      mainStore: useMainStore(),
    }
  },
  methods: {
    hidePopup() {
      this.mainStore.setShowLoginPopup(false);
    },
    submitLoginForm() {
      this.authStore.login({
        username: this.username,
        password: this.password,
      }).then(() => {
        this.hidePopup();
      })
    },
  },
  computed: {
    show: {
      get() {
        return this.mainStore.getShowLoginPopup;
      },
      set(newValue) {
        this.mainStore.setShowLoginPopup(newValue);
      },
    },
  },
})
</script>