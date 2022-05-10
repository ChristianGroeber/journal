<template>
  <div>
    <!-- <router-link  to="/login"><button>Login</button></router-link>  -->
    <Loading v-if="isLoading"></Loading>
    <div class="header">
      <h1>2022</h1>
    </div>
    <router-view></router-view>
    <specific-entry-popup></specific-entry-popup>
  </div>
</template>

<script>
import Loading from './src/components/Loading';
import SpecificEntryPopup from './src/components/Modals/SpecificEntryPopup';

export default {
  name: "App",
  components: {
    Loading,
    SpecificEntryPopup,
  },
  computed: {
    isLoading: function() {
      return this.$store.getters.loading;
    }
  },
  created() {
    this.$store.dispatch("getToken");
    this.$store.dispatch("getEntries");
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
