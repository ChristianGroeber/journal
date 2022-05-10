<template>
  <div class="admin-bar">
    <h3>Welcome Admin</h3>
    <vk-navbar>
      <vk-navbar-nav>
        <vk-navbar-nav-item
          v-for="(item, index) in nav"
          :key="index"
          @click="handleClick(index)"
          :title="item.label"
        ></vk-navbar-nav-item>
        <vk-navbar-item></vk-navbar-item>
      </vk-navbar-nav>
    </vk-navbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminBar",
  data: function () {
    return {
      nav: [
        {
          label: "Edit Current Entry",
          func: this.editCurrent,
        },
        {
          label: "Backup",
          func: this.generateBackup,
        },
        {
          label: "Edit Specific Entry",
          func: this.editSpecificEntry,
        },
        {
          label: "Auth",
          page: "/auth",
        },
      ],
    };
  },
  methods: {
    handleClick(action) {
      const item = this.nav[action];
      console.log(item);
      if ("func" in item) {
        item.func();
      }
    },
    editSpecificEntry() {
      axios
        .get(
          "/api/create?token=" +
            this.$store.getters.token +
            "&entry=" +
            this.dateEntry
        )
        .then((response) => {
          this.$router.push("/edit?entry=" + response.data.entryId);
        });
    },
    generateBackup: function () {
      axios
        .get("/api/admin/generate-backup?token=" + this.$store.getters.token)
        .then((response) => {
          location.href = response.data.file;
        });
    },
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
