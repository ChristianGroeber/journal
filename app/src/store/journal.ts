import {defineStore} from 'pinia'
import xhr from '../helpers/xhr';

interface JournalEntry {
    raw_content: string,
    content: string,
    id: string,
    url: string,
    hidden: boolean,
    meta: EntryMeta,
    file: string,
}

interface EntryMeta {
    title: string,
    date: string,
    time: number,
    date_formatted: string,
    description: string | null,
    author: string | null,
}

interface WikiEntryList extends Array<JournalEntry> {
}

interface Gallery {
    // TODO
}

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
            const request = xhr.buildRequest('/api/admin/entry/edit', data, 'POST');

            return xhr.send(request);
        },
        updateEntry(entry: JournalEntry) {
            this.editingEntry = entry;
        },
        loadEntries() {
            const request = xhr.buildRequest('/api/entries');
            return xhr.send(request).then((response) => {
                this.entries = response.data;
            });
        },
        getEntry(data: object) {
            const request = xhr.buildRequest('/api/admin/entry/edit', data);
            return xhr.send(request).then((response) => {
                this.editingEntry = response.data;
            });
        },
        deleteEntry(data: object) {
            const request = xhr.buildRequest('/api/admin/entry/delete', data, 'DELETE');
            return xhr.send(request);
        },
        loadMediaForEntry(data: object) {
            const request = xhr.buildRequest('/api/admin/entry/media/load', data);
            return xhr.send(request).then((response) => {
                this.gallery = response.data.media;
            });
        },
        uploadRaceReport(data: object) {
            const request = xhr.buildRequest('/api/admin/entry/race-report', data, 'POST');
            return xhr.send(request);
        },
    }
})