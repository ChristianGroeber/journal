<template>
  <div class="main-content">
    <div>
      <router-link class="btn btn-primary" :to="'/'"><vk-icons-arrow-left></vk-icons-arrow-left></router-link>
    </div>
    <div class="container">
      <textarea
        @change="updateContent"
        ref="editEntry"
        class="edit-entry"
        :value="markdown"
      ></textarea>
      <div class="actions">
        <vk-button class="btn btn-primary btn-rounded" @click="save"><vk-icons-push></vk-icons-push></vk-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["entry"],
  computed: {
    markdown() {
      return this.$store.getters.editingEntry.raw_content;
    },
  },
  methods: {
    updateContent() {
      const newContent = this.$refs.editEntry.value;
      const entry = this.$store.getters.editingEntry;
      entry.raw_content = newContent;
      this.$store.dispatch("updateEntry", {
        entry: entry,
      });

      this.$store.dispatch("updateEntry", {
        entry: entry,
      });
    },
    save() {
      this.$store.dispatch("saveEntry", this.$store.getters.token).then(() => {
        this.$store.dispatch("getEntries");
      });
    },
  },
};
</script>