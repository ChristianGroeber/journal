<template>
  <div>
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
    this.$store.dispatch("getEntries");
  },
};
</script>

<style>
:root {
  --box-border-radius: 20px;
  --primary: #00bb2f;
}

*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  overflow-x: hidden;
}

body {
  margin: 0;
  font-family: "Roboto";
  min-height: 100vh;
  width: 100vw;
  background-color: rgb(243, 243, 243);
}

.header {
  background-color: white;
  padding: 0 1rem;
  position: relative;
}

.header h1 {
  z-index: 3;
  position: relative;
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

img {
  max-width: 100%;
}

@media screen and (max-width: 500px) {
  .header h1 {
    font-size: 5rem;
  }
}
</style>
