<template>
  <div>
    <router-link :to="'/'">Return</router-link>
    <div class="container">
      <!-- <markdown-editor :value="markdown"></markdown-editor> -->
      <textarea ref="editEntry" class="edit-entry" :value="markdown"></textarea>
      <button @click="save">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditEntry",
  props: ["entry"],
  created() {
    this.$store.dispatch("getEntry", {
      entry: this.entry,
      token: this.$store.getters.token,
    });
  },
  computed: {
    markdown() {
      console.log(this.$store.getters.editingEntry.raw_content);
      return this.$store.getters.editingEntry.raw_content;
    },
  },
  methods: {
    save() {
      const newContent = this.$refs.editEntry.value;
      const entry = this.$store.getters.editingEntry;
      entry.raw_content = newContent;
      this.$store.dispatch('updateEntry', {entry: entry, token: this.$store.getters.token}).then(() => {
        this.$store.dispatch('getEntries');
      });
    },
  },
};
</script>

<style scoped>
.edit-entry {
  width: 80%;
  min-height: 200px;
}
</style>
