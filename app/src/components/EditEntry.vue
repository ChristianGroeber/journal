<template>
  <div>
    Edit an entry
    <div class="container">
      <markdown-editor :value="markdown"></markdown-editor>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditEntry",
  props: ["entry"],
  created() {
    this.$store.dispatch("getEntry", this.entry);
  },
  computed: {
    markdown() {
      console.log(this.$store.getters.editingEntry.raw_content);
      return this.$store.getters.editingEntry.raw_content;
    },
  },
};
</script>
