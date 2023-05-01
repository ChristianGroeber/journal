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
      authStore: useAuthStore(),
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
      const token = this.authStore.getToken;
      if (token === null) {
        throw 'Token cannot be null';
      }
      if (editingEntry === null) {
        throw 'Editing Entry cannot be null';
      }
      const filesArray = Array.from(files);
      for (let i = 0; i < filesArray.length; i++) {
        const formData = new FormData();
        formData.append(i.toString(), filesArray[i]);
        formData.append("entry", this.entry);
        formData.append("token", token.toString());
        const request = buildRequest('/api/entry/gallery/upload', formData, 'POST');
        send(request).then(response => {
          const img = response.data.files[0]['scaled']['default'];
          console.log(img);
          editingEntry.raw_content +=
              "![uploaded media](" + encodeURI(img) + ")";
        });
      }
      this.journalStore.updateEntry(editingEntry);
      this.journalStore.loadMediaForEntry({
        entry: editingEntry.id,
        token: token,
      });
    },
  },
})
</script>