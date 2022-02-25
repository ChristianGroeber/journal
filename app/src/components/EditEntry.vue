<template>
  <div>
    Edit an entry
    <div class="container">
      <!-- <markdown-editor :value="markdown"></markdown-editor> -->
      <textarea :value="markdown"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditEntry",
  props: ["entry"],
  created() {
    this.$store.dispatch("getEntry", {entry: this.entry, token: this.$store.getters.token});
  },
  computed: {
    markdown() {
      console.log(this.$store.getters.editingEntry.raw_content);
      return this.$store.getters.editingEntry.raw_content;
    },
  },
};
</script>
