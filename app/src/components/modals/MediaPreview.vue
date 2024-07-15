<template>
    <pm-dialog title="Preview">
        <div>
            <template v-if="mediaType === 'video'">
                <video controls>
                    <source :src="mediaSrc">
                </video>
            </template>
            <template v-if="mediaType === 'image'">
                <img :src="mediaSrc">
            </template>
        </div>
    </pm-dialog>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";
import {useDialogStore} from "pixlcms-wrapper";

export const route = "/media/preview";

export default defineComponent({
    name: "MediaPreview",
    data() {
        return {
            mainStore: useMainStore(),
            dialogStore: useDialogStore(),
        }
    },
    computed: {
        mediaSrc() {
            return this.mainStore.getMediaPreview.src;
        },
        mediaType() {
            return this.mainStore.getMediaPreview.mediaType;
        },
    },
})
</script>

<style lang="scss" scoped>
img {
    width: 100%;
}
</style>
