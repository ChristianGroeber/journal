<template>
    <div class="article">
        <div class="article-head">
            <h3>{{ formattedDate }}</h3>
            <el-dropdown v-if="canEdit">
                <el-button circle icon="Plus">
                </el-button>
                <template #dropdown>
                    <el-dropdown-item @click="editEntry">Edit</el-dropdown-item>
                    <el-dropdown-item @click="deleteEntry">Delete</el-dropdown-item>
                </template>
            </el-dropdown>
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
import {useRouter} from 'vue-router'
import {useAuthStore} from "@/src/store/auth";
import {useJournalStore} from "@/src/store/journal";

export default defineComponent({
    name: "Day",
    props: ["day"],
    components: {
        RaceReport,
    },
    data() {
        return {
            journalStore: useJournalStore(),
            authStore: useAuthStore(),
            router: useRouter(),
        }
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
            const doDelete = confirm("Are you sure you want to delete this entry");
            if (doDelete) {
                const data = {
                    entry: this.day.id,
                    token: this.authStore.getToken,
                }
                this.journalStore.deleteEntry(data).then(() => {
                    this.journalStore.loadEntries();
                })
            }
        },
        editEntry() {
            this.router.push('/edit?' + this.query);
        },
    },
})
</script>

<style scoped>
h3 {
    margin: 0;
}

.article-head {
    margin: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-right: 1rem;
}

p {
    margin: 0 0 25px 0;
}
</style>