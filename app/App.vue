<template>
  <div>
    <!-- <router-link  to="/login"><button>Login</button></router-link>  -->
    <div class="header">
      <h1>2022</h1>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch("getToken");
    this.$store.dispatch("getEntries");
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
