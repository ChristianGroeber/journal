import {defineStore} from 'pinia'
import {Gallery} from "@/src/contracts/JournalTypes";
import {PixlEntry, buildRequest, send} from "pixlcms-wrapper";


interface State {
    entries: PixlEntry[],
    editingEntry: PixlEntry | null,
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
        safeCurrentEntry: state => {
            if (!state.editingEntry) {
                throw "not editing any entry";
            }

            return state.editingEntry;
        },
    },
    actions: {
        async saveEntry() {
            const data = {
                meta: this.editingEntry?.meta,
                content: this.editingEntry?.raw_content,
                entry: this.editingEntry?.id,
                lastUpdate: this.editingEntry?.meta.dateUpdated,
            }
            const request = buildRequest('/api/admin/entry/edit', data, 'PUT');

            return send(request).then(response => {
                this.safeCurrentEntry.meta.dateUpdated = response.data.lastUpdate;
                return response;
            });
        },
        updateEntry(entry: PixlEntry) {
            this.editingEntry = entry;
        },
        async loadEntries() {
            const request = buildRequest('/api/entries');
            return send(request).then((response) => {
                this.entries = response.data;
            });
        },
        async getEntry(entry: string) {
            const request = buildRequest('/api/entry/view', {p: entry});
            return send(request).then((response) => {
                this.editingEntry = response.data;
            });
        },
        deleteEntry(data: object) {
            const request = buildRequest('/api/admin/entry/delete', data, 'DELETE');
            return send(request);
        },
        async loadMediaForEntry(entry: string) {
            const request = buildRequest('/api/admin/gallery/load', {gallery: entry});
            return send(request).then((response) => {
                this.gallery = response.data.media;
            });
        },
        uploadMedia(data: FormData) {
            const request = buildRequest('/api/admin/gallery/upload', data, 'POST');
            return send(request)
        },
        deleteMedia(mediaString: string) {
            const request = buildRequest('/api/admin/gallery/delete', {media: mediaString}, 'DELETE');
            return send(request);
        },
        uploadRaceReport(data: object) {
            const request = buildRequest('/api/admin/entry/race-report', data, 'POST');
            return send(request);
        },
    }
})
