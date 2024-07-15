<template>
    <div class="article">
        <div class="article-head">
            <div class="d-flex jc_space-between">
                <el-button v-if="canEdit" @click="deleteEntry">
                    <el-icon>
                        <Delete/>
                    </el-icon>
                </el-button>
                <h3>{{ formattedDate }}</h3>
                <el-button v-if="canEdit" @click="editEntry">
                    <el-icon>
                        <Edit/>
                    </el-icon>
                </el-button>
            </div>
        </div>
        <RaceReport v-if="hasRaceReport" :entry="day"></RaceReport>
        <div class="article-body">
            <p v-html="content"></p>
        </div>
    </div>
</template>

<script lang="ts">
import RaceReport from './RaceReport.vue';
import {defineComponent} from "vue";
import {useJournalStore} from "@/src/store/journal";
import {Edit, Delete} from "@element-plus/icons-vue";
import {ElMessageBox} from "element-plus";
import {useDialogStore, useAuthStore} from "pixlcms-wrapper";

export default defineComponent({
    name: "Day",
    props: ["day"],
    components: {
        RaceReport, Edit, Delete
    },
    data() {
        return {
            journalStore: useJournalStore(),
            authStore: useAuthStore(),
            dialogStore: useDialogStore() 
        }
    },
    created() {

    },
    computed: {
        formattedDate() {
            return this.day.meta.title;
        },
        content() {
            return this.day.content;
        },
        canEdit() {
            return this.authStore.getToken !== null;
        },
        query() {
            const q = {entry: this.day.id};
            return Object.entries(q)
                .map(([key, val]) => `${key}=${val}`)
                .join("&");
        },
        hasRaceReport() {
            return 'raceReport' in this.day.meta;
        },
    },
    methods: {
        deleteEntry() {
            ElMessageBox.confirm(
                "Are you sure you want to delete this entry",
                "Warning",
                {
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    type: "warning",
                }
            ).then(() => {
                this.journalStore.deleteEntry({entry: this.day.id}).then(() => {
                    this.journalStore.loadEntries();
                });
            });
        },
        editEntry() {
            this.dialogStore.showDialog({route: '/editor', data: this.day.id});
        },
    },
})
</script>

<style scoped lang="scss">
p, h2, h3, h4, h5 {
    text-align: center;
}
</style>
