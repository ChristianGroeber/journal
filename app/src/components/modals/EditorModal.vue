<template>
    <pj-dialog :title="'Edit ' + entry" :fullscreen="true" @close="closeEditor" :route="route">
        <Editor :entry="entry"></Editor>
    </pj-dialog>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useDialogStore} from "@/src/store/dialog";
import Editor from "@/src/components/admin/Editor/Editor.vue";
import {useJournalStore} from "@/src/store/journal";

export const route = "/editor";

export default defineComponent({
    name: 'EditorModal',
    components: {
        Editor,
    },
    data() {
        return {
            dialogStore: useDialogStore(),
            journalStore: useJournalStore(),
            route: route,
        }
    },
    created() {
        this.journalStore.editingEntry = this.dialogStore.getDialogData(route);
        window.addEventListener('beforeunload', this.alertReload);
    },
    methods: {
        alertReload(event: BeforeUnloadEvent) {
            event.returnValue = confirm();
        },
        closeEditor() {
            window.removeEventListener('beforeunload', this.alertReload);
            this.journalStore.loadEntries();
        },
    },
    computed: {
        entry() {
            return this.dialogStore.getDialogData(route);
        },
    },
});
</script>
