<template>
  <div class="admin-bar">
    <h3>Welcome Admin</h3>
    <div class="actions">
      <button @click="editCurrent">Edit Current Entry</button>
      <edit-specific-entry></edit-specific-entry>
      <router-link class="btn" to="/auth">Auth</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import editSpecificEntry from "./EditSpecificEntry.vue";

export default {
  name: "AdminBar",
  components: {
    editSpecificEntry,
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
