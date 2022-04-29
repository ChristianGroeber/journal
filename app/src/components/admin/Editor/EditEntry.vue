<template>
<div class="main-content">
    <div style="margin: 1rem 0">
      <router-link class="btn" :to="'/'">Return</router-link>
    </div>
    <div class="container">
      <textarea ref="editEntry" class="edit-entry" :value="markdown"></textarea>
      <div class="actions">
        <button @click="save">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["entry"],
  created() {
    this.$store.dispatch("getEntry", {
      entry: this.entry,
      token: this.$store.getters.token,
    });
  },
  computed: {
    markdown() {
      return this.$store.getters.editingEntry.raw_content;
    },
  },
  methods: {
    save() {
      const newContent = this.$refs.editEntry.value;
      const entry = this.$store.getters.editingEntry;
      entry.raw_content = newContent;
      this.$store
        .dispatch("updateEntry", {
          entry: entry,
          token: this.$store.getters.token,
        })
        .then(() => {
          this.$store.dispatch("getEntries");
        });
    },
  },
};
</script>