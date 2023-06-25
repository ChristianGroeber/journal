<template>
  <div class="main-content">
    <div class="d-flex jc_space-between">
      <pj-button-link :action="checkGoHome" content="Home"></pj-button-link>
      <pj-button-link :action="addRaceReport" content="Race Report"></pj-button-link>
    </div>
    <div class="container">
      <div class="textarea-wrapper">
        <textarea @change="updateContent" id="edit-entry" ref="editEntry" class="edit-entry"
                  :value="markdown"></textarea>
      </div>
      <div class="actions">
        <pj-button-link :action="save" content="Save"></pj-button-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useJournalStore} from "@/src/store/journal";
import {useAuthStore} from "@/src/store/auth";
import {useRouter} from "vue-router";
import {JournalEntry} from "@/src/Contracts/JournalTypes";
import {AxiosPromise} from "axios";
import {useMainStore} from "@/src/store/main";

export default defineComponent({
  props: ["entry"],
  data: function () {
    return {
      unsavedChanges: false,
      router: useRouter(),
    }
  },
  computed: {
    markdown() {
      return useJournalStore().editingEntry?.raw_content;
    },
  },
  methods: {
    updateContent() {
      this.unsavedChanges = true;
      const newContentField = <HTMLTextAreaElement>document.getElementById('edit-entry');

      let newContent = newContentField.value;
      newContent = newContent.replace(/…/g, '...');
      newContent = newContent.replace(/’/g, '\'');
      newContent = newContent.replace(/“/g, '"');
      newContent = newContent.replace(/”/g, '"');
      newContent = newContent.replace(/„/g, '"');
      newContentField.value = newContent;
      console.log(newContent);
      const entry = <JournalEntry | null>useJournalStore().getEditingEntry;
      if (entry === null) {
        throw 'Editing Entry is null';
      }
      entry.raw_content = newContent;
      useJournalStore().updateEntry(entry);
    },
    save(): AxiosPromise {
      this.unsavedChanges = false;
      return useJournalStore().saveEntry();
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
      useMainStore().setShowRaceReportPopup(true);
    },
    doGoHome() {
      useJournalStore().loadEntries();
      this.router.push('/');
    }
  },
})
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