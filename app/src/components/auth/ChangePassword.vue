<template>
  <div class="main-content">
    <div>
      <router-link class="btn" to="/auth">Return</router-link>
    </div>
    <form @submit.prevent="submit">
      <div class="form-row">
        <input placeholder="Username" v-model="username" type="text" />
      </div>
      <div class="form-row">
        <input
          placeholder="Current Password"
          v-model="currentPassword"
          type="password"
        />
      </div>
      <div class="form-row">
        <input placeholder="Password" v-model="newPassword1" type="password" />
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

<script>
export default {
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
      this.$store.dispatch("changePassword", {
        username: this.username,
        currentPassword: this.currentPassword,
        newPassword1: this.newPassword1,
        newPassword2: this.newPassword2,
      }).then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>
