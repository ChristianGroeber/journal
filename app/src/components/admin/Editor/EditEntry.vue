<template>
    <div class="main-content">
        <div class="d-flex js_end">
            <pj-button-link :action="addRaceReport" content="Race Report"></pj-button-link>
        </div>
        <div class="container">
            <div class="textarea-wrapper">
        <textarea @change="updateContent" id="edit-entry" ref="editEntry" class="edit-entry"
                  :value="markdown"></textarea>
            </div>
            <div class="actions">
                <pj-button-link :loading="isLoading" :action="save" content="Save"></pj-button-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useJournalStore} from "@/src/store/journal";
import {JournalEntry} from "@/src/contracts/JournalTypes";
import {useDialogStore} from "pixlcms-wrapper";

export default defineComponent({
    props: ["entry"],
    data: function () {
        return {
            unsavedChanges: false,
            isLoading: false,
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
            const entry = <JournalEntry | null>useJournalStore().getEditingEntry;
            if (entry === null) {
                throw 'Editing Entry is null';
            }
            entry.raw_content = newContent;
            useJournalStore().updateEntry(entry);
        },
        save(): void {
            this.isLoading = true;
            this.unsavedChanges = false;
            useJournalStore().saveEntry().then(() => {
                this.isLoading = false;
            });
        },
        checkGoHome() {
        },
        addRaceReport() {
            useDialogStore().showDialog('/edit/race-report');
        },
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
