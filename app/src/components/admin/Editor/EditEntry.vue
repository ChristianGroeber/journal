<template>
  <div class="main-content">
    <div class="d-flex jc_space-between">
      <vk-button class="btn btn-icon btn-primary" @click="checkGoHome">
        <fa icon="arrow-left"></fa>
      </vk-button>
      <vk-button class="btn btn-icon btn-primary" @click="addRaceReport">
        <fa icon="file-waveform"/>
      </vk-button>
    </div>
    <div class="container">
      <div class="textarea-wrapper">
        <textarea @change="updateContent" id="edit-entry" ref="editEntry" class="edit-entry" :value="markdown"></textarea>
      </div>
      <div class="actions">
        <vk-button class="btn btn-icon btn-primary" @click="save">
          <fa icon="floppy-disk"></fa>
        </vk-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["entry"],
  data: function () {
    return {
      unsavedChanges: false,
    }
  },
  computed: {
    markdown() {
      return this.$store.getters.editingEntry.raw_content;
    },
  },
  methods: {
    updateContent() {
      this.unsavedChanges = true;
      const newContentField = document.getElementById('edit-entry');
      let newContent = newContentField.value;
      newContent = newContent.replace(/…/g, '...');
      newContent = newContent.replace(/’/g, '\'');
      newContent = newContent.replace(/“/g, '"');
      newContent = newContent.replace(/”/g, '"');
      newContent = newContent.replace(/„/g, '"');
      newContentField.value = newContent;
      console.log(newContent);
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
      this.unsavedChanges = false;
      return this.$store.dispatch("saveEntry", this.$store.getters.token);
    },
    checkGoHome() {
      if (this.unsavedChanges && confirm('You\'ve go unsaved changes. Save first?')) {
        this.save().then(() => {
          this.doGoHome();
        });
      } else {
        this.doGoHome();
      }
    },
    addRaceReport() {
      this.$store.commit('EDIT_RACE_REPORT_POPUP', true);
    },
    doGoHome() {
      this.$store.dispatch("getEntries");
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
.textarea-wrapper {
  width: 95%;
  margin: 1rem auto;
}

textarea {
  border-radius: .5rem;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  width: 100%;
  padding: 0;
}
</style>