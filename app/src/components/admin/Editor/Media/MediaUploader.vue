<template>
    <div>
        <input
            :accept="mimeTypes"
            @change="uploadMedia"
            type="file"
            multiple
        />
    </div>
</template>

<script lang="ts">
import {buildRequest, send} from "@/src/helpers/xhr";
import {defineComponent} from "vue";
import {useJournalStore} from "@/src/store/journal";
import {useMainStore} from "@/src/store/main";
import {useAuthStore} from "@/src/store/auth";
import {FileUploadEvent} from "@/src/Contracts/FormTypes";

export default defineComponent({
    props: ["entry"],
    data() {
        return {
            journalStore: useJournalStore(),
            mainStore: useMainStore(),
            mediaTypes: useMainStore().getMediaTypes,
        }
    },
    computed: {
        mimeTypes() {
            return this.mediaTypes.map(media => media.mime);
        }
    },
    methods: {
        uploadMedia(e: FileUploadEvent) {
            const files = e.target.files;
            const editingEntry = this.journalStore.getEditingEntry;
            if (editingEntry === null) {
                throw 'Editing Entry cannot be null';
            }
            const filesArray = Array.from(files);
            filesArray.forEach(img => {
                const formData = new FormData();
                formData.append(filesArray.indexOf(img).toString(), img);
                formData.append("entry", this.entry);
                // TODO: fix media uploads ?
                this.journalStore.uploadMedia(formData).then(response => {
                    const img = response.data.files[0]['scaled']['default'];
                    console.log(img);
                    editingEntry.raw_content +=
                        "![uploaded media](" + encodeURI(img) + ")";
                });
            })
            this.journalStore.updateEntry(editingEntry);
            this.journalStore.loadMediaForEntry(editingEntry.id);
        },
    },
})
</script>