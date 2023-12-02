<template>
    <el-dialog :before-close="close" title="Preview" v-model="isShowing">
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
    </el-dialog>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";
import {useDialogStore} from "@/src/store/dialog";

const route = "/media/preview";

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
        isShowing: {
            get() {
                return this.dialogStore.isDialogShowing(route);
            },
            set() {
                this.dialogStore.hideDialog(route);
            }
        },
    },
    methods: {
        close() {
            this.dialogStore.hideDialog(route);
        },
    },
})
</script>

<style lang="scss" scoped>
img {
    width: 100%;
}
</style>