import {defineStore} from 'pinia'
import {buildRequest, send} from "../helpers/xhr";
import {JournalEntry, WikiEntryList, Gallery} from "@/src/Contracts/JournalTypes";


interface State {
    entries: WikiEntryList,
    editingEntry: JournalEntry | null,
    gallery: Gallery | null,
}

export const useJournalStore = defineStore('journalStore', {
    state: (): State => ({
        entries: [],
        editingEntry: null,
        gallery: null,
    }),
    getters: {
        getEntries: (state) => state.entries,
        getEditingEntry: (state) => state.editingEntry,
        getGallery: (state) => state.gallery,
    },
    actions: {
        saveEntry(token: string) {
            const data = {
                token: token,
                content: this.editingEntry?.raw_content,
                entry: this.editingEntry?.id,
            }
            const request = buildRequest('/api/admin/entry/edit', data, 'POST');

            return send(request);
        },
        updateEntry(entry: JournalEntry) {
            this.editingEntry = entry;
        },
        loadEntries() {
            const request = buildRequest('/api/entries');
            return send(request).then((response) => {
                this.entries = response.data;
            });
        },
        getEntry(data: object) {
            const request = buildRequest('/api/admin/entry/edit', data);
            return send(request).then((response) => {
                this.editingEntry = response.data;
            });
        },
        deleteEntry(data: object) {
            const request = buildRequest('/api/admin/entry/delete', data, 'DELETE');
            return send(request);
        },
        loadMediaForEntry(data: object) {
            const request = buildRequest('/api/admin/entry/media/load', data);
            return send(request).then((response) => {
                this.gallery = response.data.media;
            });
        },
        uploadRaceReport(data: object) {
            const request = buildRequest('/api/admin/entry/race-report', data, 'POST');
            return send(request);
        },
    }
})