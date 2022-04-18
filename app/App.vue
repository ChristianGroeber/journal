<template>
  <div>
    <!-- <router-link  to="/login"><button>Login</button></router-link>  -->
    <Loading v-if="isLoading"></Loading>
    <div class="header">
      <h1>2022</h1>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Loading from './src/components/Loading';

export default {
  name: "App",
  components: {
    Loading,
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

<style>
/* :root {
  --box-border-radius: 20px;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0.5rem 0 0.25rem 0;
}
/*


.header h1 {
  z-index: 3;
  display: block;
  font-size: 10rem;
  margin: unset;
  background-size: cover;
  padding: 1rem;
}

aside {
  background-color: white;
  display: block;
  width: 30%;
  padding: 10px;
}

footer {
  font-size: smaller;
  display: block;
  position: relative;
  bottom: 0;
}

footer * {
  -webkit-flex: 1 1 0%;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  flex: 1 1 0%;
}

@media screen and (max-width: 500px) {
  .header h1 {
    font-size: 5rem;
  }
} */
</style>
