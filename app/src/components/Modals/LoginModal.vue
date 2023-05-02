<template>
  <el-dialog :before-close="hidePopup" title="Login" v-model="isShowing">
    <el-form :model="loginForm" @submit.prevent="login">
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
    }
  },
  methods: {
    hidePopup() {
      this.mainStore.setShowLoginPopup(false);
    },
    submitLoginForm() {
      this.authStore.login(this.loginForm).then(() => {
        this.mainStore.setShowLoginPopup(false);
      })
    },
  },
  computed: {
    isShowing() {
      return this.mainStore.getShowLoginPopup;
    },
    open() {
      this.mainStore.setShowLoginPopup(true);
    },
    close() {
      this.mainStore.setShowLoginPopup(false);
    },
  },
})
</script>