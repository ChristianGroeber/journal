<template>
    <div>
        <Loading></Loading>
        <div class="header">
            <div class="header-sticky-content">
                <h1>{{ pageTitle }}</h1>
                <AdminBar v-if="canEdit"/>
            </div>
        </div>
        <router-view></router-view>
        <Footer></Footer>
        <Modals></Modals>
    </div>
</template>

<script lang="ts">
import Loading from './src/components/Loading.vue';
import Footer from "./src/components/home/Footer.vue";
import {defineComponent} from "vue";
import {useAuthStore} from "@/src/store/auth";
import {useMainStore} from "@/src/store/main";
import {useJournalStore} from "@/src/store/journal";
import {useRouter} from "vue-router";
import {resizeVideos} from "./src/helpers/videosizer";
import {ElNotification} from "element-plus";
import {configureStores} from "@/src/helpers/xhr";
import {useLoadingStore} from "@/src/store/loading";
import AdminBar from "@/src/components/admin/AdminBar.vue";
import {useDialogStore} from "@/src/store/dialog";
import Modals from "@/src/components/modals/Modals.vue";

const contentWidthStyles = {
    small: 400,
    medium: 400,
    large: 650,
}

const breakpointStyles = {
    small: 500,
    medium: 750,
    large: 900,
}

const contentGap = 50;

export default defineComponent({
    name: "App",
    components: {
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
            router: useRouter(),
            dialogStore: useDialogStore(),
        }
    },
    computed: {
        pageTitle() {
            return this.mainStore.getPageTitle;
        },
        canEdit() {
            return this.authStore.getToken !== null;
        },
    },
    created() {
        for (const [key, value] of Object.entries(breakpointStyles)) {
            document.documentElement.style.setProperty(`--content-width-${key}`, `${value}px`);
        }
        window.addEventListener('resize', this.recalculateStyleVariables);
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
            this.mainStore.setTitle(this.mainStore.getMeta.journalYear.toString());
            if (!this.mainStore.meta.adminCreated) {
                setTimeout(() => {
                    this.dialogStore.showDialog('/auth/create-admin');
                }, 500);
            }
        })
        this.journalStore.loadEntries().then(() => {
            resizeVideos();
            this.recalculateStyleVariables();
        });
    },
    methods: {
        recalculateStyleVariables() {
            const currentSize = window.innerWidth;
            const currentBreakpointArr = Object.entries(breakpointStyles).find(value => {
                return currentSize <= value[1];
            });
            const currentBreakpoint = currentBreakpointArr ? currentBreakpointArr[0] : 'large';
            const entriesCount = Object.keys(this.journalStore.getEntries).length;
            let newContentWidth = contentWidthStyles[currentBreakpoint];
            if (newContentWidth > currentSize) {
                newContentWidth = currentSize;
            }
            const htmlWidth = entriesCount * newContentWidth + contentGap * entriesCount;
            document.documentElement.style.setProperty('--total-width', `${htmlWidth}px`);
            document.documentElement.style.setProperty('--content-gap', `${contentGap}px`);
            document.documentElement.style.setProperty('--content-width', `${newContentWidth}px`);
        },
    },
})
</script>

<style lang="scss">
@import './style/main.scss';
</style>
