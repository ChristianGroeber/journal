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
export default {
  name: "LoginModal",
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    hidePopup() {
      this.$store.commit("SHOW_LOGIN_POPUP", false);
    },
    submitLoginForm() {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password,
      }).then(() => {
        this.hidePopup();
      });
    }
  },
  computed: {
    show: {
      get() {
        return this.$store.getters.showLoginPopup;
      },
      set(newValue) {
        this.$store.commit("SHOW_LOGIN_POPUP", newValue);
      },
    },
  },
}
</script>