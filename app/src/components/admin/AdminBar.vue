<template>
  <div class="admin-bar">
    <h3>Welcome Admin</h3>
    <vk-navbar>
      <vk-navbar-nav>
        <vk-navbar-nav-item
          @click="editCurrent"
          title="Edit Current Entry"
        ></vk-navbar-nav-item>
        <vk-navbar-item></vk-navbar-item>
      </vk-navbar-nav>
      <DownloadBackup />
      <edit-specific-entry></edit-specific-entry>
      <router-link class="btn" to="/auth">Auth</router-link>
    </vk-navbar>
  </div>
</template>

<script>
import axios from "axios";
import editSpecificEntry from "./EditSpecificEntry.vue";
import DownloadBackup from "./DownloadBackup.vue";

export default {
  name: "AdminBar",
  components: {
    editSpecificEntry,
    DownloadBackup,
  },
  methods: {
    editCurrent() {
      axios
        .get("/api/edit/current?token=" + this.$store.getters.token)
        .then((response) => {
          this.$router.push("/edit?entry=" + response.data.entryId);
        });
    },
  },
};
</script>
