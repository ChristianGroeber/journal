<template>
    <div>
        <Loading></Loading>
        <div class="header">
            <div class="header-sticky-content">
                <h1>{{ journalYear }}</h1>
                <AdminBar v-if="canEdit"/>
            </div>
        </div>
        <MonthList></MonthList>
        <Footer></Footer>
        <Modals :dialog-components="dialogs"></Modals>
    </div>
</template>

<script lang="ts">
import {useDialogStore, useAuthStore, useLoadingStore, Loading, configureStores, Modals} from "pixlcms-wrapper";
import Footer from "./src/components/home/Footer.vue";
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";
import {useJournalStore} from "@/src/store/journal";
import {resizeVideos} from "./src/helpers/videosizer";
import {ElNotification} from "element-plus";
import AdminBar from "@/src/components/admin/AdminBar.vue";
import MonthList from "@/src/components/home/MonthList.vue";
import {dialogs} from "@/src/dialogs";

const breakpointStyles = {
    small: 500,
    medium: 750,
    large: 900,
}

export default defineComponent({
    name: "App",
    components: {
        MonthList,
        AdminBar,
        Loading,
        Footer,
        Modals,
    },
    data() {
        return {
            authStore: useAuthStore(),
            mainStore: useMainStore(),
            journalStore: useJournalStore(),
            dialogStore: useDialogStore(),
            dialogs: dialogs(),
        }
    },
    computed: {
        canEdit() {
            return this.authStore.getToken !== null;
        },
        journalYear() {
            return this.mainStore.meta.feYear;
        },
    },
    created() {
        for (const [key, value] of Object.entries(breakpointStyles)) {
            document.documentElement.style.setProperty(`--content-width-${key}`, `${value}px`);
        }
        // window.addEventListener('resize', this.recalculateStyleVariables);
        const token = this.authStore.loadToken();
        configureStores(this.authStore, useLoadingStore());
        this.mainStore.init(token).then(response => {
            if (response.data.is_token_valid === 'token_invalid') {
                this.dialogStore.showDialog('/auth/login');
                ElNotification({
                    title: 'Error',
                    message: 'Your token is invalid, please login again',
                    type: 'warning',
                });
            }
            this.mainStore.setTitle(this.mainStore.getMeta.feYear.toString());
            if (!this.mainStore.meta.adminCreated) {
                setTimeout(() => {
                    this.dialogStore.showDialog('/auth/create-admin');
                }, 500);
            }
        })
        this.journalStore.loadEntries().then(() => {
            resizeVideos();
        });
    },
})
</script>

<style lang="scss">
    svg {
        display: none;
    }
</style>

