<template>
  <div>
    <Loading v-if="isLoading"></Loading>
    <div class="header">
      <h1>{{ pageTitle }}</h1>
    </div>
    <router-view></router-view>
    <Footer></Footer>
    <div class="modals">
      <add-race-report></add-race-report>
      <specific-entry-popup></specific-entry-popup>
    </div>
  </div>
</template>

<script>
import Loading from './src/components/Loading';
import AddRaceReport from './src/components/Modals/AddRaceReport'
import SpecificEntryPopup from './src/components/Modals/SpecificEntryPopup'
import {resizeVideos} from "src/helpers/videosizer";
import Footer from "./src/components/home/Footer.vue";

export default {
  name: "App",
  components: {
    Loading,
    AddRaceReport,
    SpecificEntryPopup,
    Footer,
  },
  computed: {
    isLoading: function () {
      return this.$store.getters.loading;
    },
    pageTitle() {
      return this.$store.getters.pageTitle;
    },
  },
  created() {
    this.$store.dispatch("getToken").then((token) => {
      this.$store.dispatch("init", {token: token}).then(() => {
        this.$store.dispatch('setTitle', this.$store.getters.meta.journalYear);
        if (!this.$store.getters.meta.adminCreated) {
          this.$router.push('/auth/create-admin');
        }
      });
    });
    this.$store.dispatch("getEntries").then(() => {
      resizeVideos();
    });
    this.axios.interceptors.request.use(
        (config) => {
          this.$store.commit("LOADING", true);
          return config;
        },
        (error) => {
          this.$store.commit("LOADING", false);
          return Promise.reject(error);
        }
    );
    this.axios.interceptors.response.use(
        (response) => {
          this.$store.commit("LOADING", false);
          return response;
        },
        (error) => {
          this.$store.commit("LOADING", false);
          return Promise.reject(error);
        }
    );
  },
};
</script>
