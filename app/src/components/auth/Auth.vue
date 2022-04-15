<template>
  <div class="main-content">
    <div class="d-flex gap-1">
      <router-link class="btn" to="/">Home</router-link>
      <router-link class="btn" to="/auth/login">Login</router-link>
      <router-link class="btn" to="/auth/restore-password"
        >Restore Password</router-link
      >
      <!-- <router-link class="btn" to="/auth/register">Register</router-link> -->
      <router-link class="btn" to="/auth/change-password"
        >Change Password</router-link
      >
      <router-link class="btn" to="/auth/generate-new-token"
        >Generate New Token</router-link
      >
      <router-link class="btn" to="/auth/request-new-password"
        >Request New Password</router-link
      >
    </div>
  </div>
</template>