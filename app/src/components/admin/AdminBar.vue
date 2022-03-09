<template>
  <div>
    <h3>Welcome Admin</h3>
    <button @click="editCurrent">Edit Current Entry</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminBar",
  methods: {
    editCurrent() {
      axios
        .get("/api/edit/current?token=" + this.$store.getters.token)
        .then((response) => {
          this.$router.push('/edit?entry=' + response.data.entryId);
        });
    },
  },
};
</script>
