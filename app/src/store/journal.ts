import {defineStore} from 'pinia'
import {buildRequest, send} from "../helpers/xhr";
import {JournalEntry, JournalMonth, Gallery} from "@/src/Contracts/JournalTypes";


interface State {
    entries: JournalMonth[],
    editingEntry: JournalEntry | null,
    gallery: Gallery | null,
    months: string[],
}

export const useJournalStore = defineStore('journalStore', {
    state: (): State => ({
        entries: [],
        editingEntry: null,
        gallery: null,
        months: [],
    }),
    getters: {
        getEntries: (state) => state.entries,
        getEditingEntry: (state) => state.editingEntry,
        getGallery: (state) => state.gallery,
        getMonths: state => state.months,
    },
    actions: {
        saveEntry() {
            const data = {
                content: this.editingEntry?.raw_content,
                entry: this.editingEntry?.id,
            }
            const request = buildRequest('/api/admin/entry/edit', data, 'PUT');

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
        listMonths() {
            const request = buildRequest('/api/journal/list-months');
            return send(request).then((response) => {
                this.months = response.data;
            });
        },
        isMonthLoaded(month: string) {
            let monthExists = false;
            this.getEntries.forEach(monthObj => {
                if (monthObj.name === month) {
                    monthExists = true;
                }
            })

            return monthExists;
        },
        loadMonth(month: string) {
            const request = buildRequest('/api/journal/month', {month: month});
            return send(request).then((response) => {
                if (!this.isMonthLoaded(month)) {
                    this.entries.push(response.data);
                }
            });
        },
        getEntry(entry: string) {
            const request = buildRequest('/api/admin/entry/edit', {entry: entry});
            return send(request).then((response) => {
                this.editingEntry = response.data;
            });
        },
        deleteEntry(data: object) {
            const request = buildRequest('/api/admin/entry/delete', data, 'DELETE');
            return send(request);
        },
        loadMediaForEntry(entry: string) {
            const request = buildRequest('/api/admin/entry/media/load', {entry: entry});
            return send(request).then((response) => {
                this.gallery = response.data.media;
            });
        },
        uploadMedia(data: FormData) {
            const request = buildRequest('/api/admin/entry/gallery/upload', data, 'POST');
            return send(request)
        },
        deleteMedia(mediaString: string) {
            const request = buildRequest('/api/admin/entry/media/delete', {media: mediaString}, 'DELETE');
            return send(request);
        },
        uploadRaceReport(data: object) {
            const request = buildRequest('/api/admin/entry/race-report', data, 'POST');
            return send(request);
        },
    }
})