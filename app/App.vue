<template>
  <div>
    <Loading></Loading>
    <div class="header">
      <h1>{{ pageTitle }}</h1>
    </div>
    <router-view></router-view>
    <Footer></Footer>
    <div class="modals">
      <add-race-report></add-race-report>
      <specific-entry-popup></specific-entry-popup>
      <LoginModal></LoginModal>
      <MediaPreview></MediaPreview>
    </div>
  </div>
</template>

<script lang="ts">
import Loading from './src/components/Loading.vue';
import AddRaceReport from './src/components/Modals/AddRaceReport.vue'
import SpecificEntryPopup from './src/components/Modals/SpecificEntryPopup.vue'
import Footer from "./src/components/home/Footer.vue";
import LoginModal from "./src/components/Modals/LoginModal.vue";
import MediaPreview from "./src/components/Modals/MediaPreview.vue";
import {defineComponent} from "vue";
import {useAuthStore} from "@/src/store/auth";
import {useMainStore} from "@/src/store/main";
import {useJournalStore} from "@/src/store/journal";
import {useRouter} from 'vue-router';
import {resizeVideos} from "./src/helpers/videosizer";

export default defineComponent({
  name: "App",
  components: {
    Loading,
    AddRaceReport,
    SpecificEntryPopup,
    Footer,
    LoginModal,
    MediaPreview,
  },
  data() {
    return {
      authStore: useAuthStore(),
      mainStore: useMainStore(),
      journalStore: useJournalStore(),
    }
  },
  computed: {
    pageTitle() {
      return this.mainStore.getPageTitle;
    },
  },
  created() {
    const token = this.authStore.loadToken();
    this.mainStore.init(token).then(response => {
      if (response.data.is_token_valid === 'token_invalid') {
        this.mainStore.setShowLoginPopup(true);
        alert('Your token is invalid, please login again');
      }
      this.mainStore.setTitle(this.mainStore.getMeta.journalYear.toString());
      if (!this.mainStore.meta.adminCreated) {
        useRouter().push('/auth/create-admin');
      }
    })
    this.journalStore.loadEntries().then(() => {
      resizeVideos();
    });
  },
})
</script>

<style lang="scss">
@import './style/main.scss';
</style>
