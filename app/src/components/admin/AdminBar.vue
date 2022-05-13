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
          func: this.toggleEditSpecificPopup,
        },
        {
          label: "Auth",
          page: "/auth",
        },
        {
          label: "Rebuild Cache",
          func: this.rebuildCache,
        },
      ],
    };
  },
  methods: {
    handleClick(itemId) {
      const item = this.nav[itemId];
      if ("func" in item) {
        item.func();
      } else if ("page" in item) {
        this.$router.push(item.page);
      } else {
        console.error('I don\'t know what to do with item #' + itemId);
      }
    },
    toggleEditSpecificPopup() {
      this.$store.commit('EDIT_SPECIFIC_POPUP', true);
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
        .get("/api/admin/entry/edit/current?token=" + this.$store.getters.token)
        .then((response) => {
          this.$router.push("/edit?entry=" + response.data.entryId);
        });
    },
    rebuildCache() {
      this.$store.dispatch('buildCache', this.$store.getters.token);
    }
  },
};
</script>
