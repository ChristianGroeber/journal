<template>
  <div class="mt-3">
    <div class="container h-100">
      <div class="row align-items-center h-100">
        <div class="col-8 mx-auto">
          <div class="jumbotron h-100">
            <h3>Sorry, die Seite wurde nicht gefunden :(</h3>
            <hr />
            <p class="lead">
              Zurück zum <router-link to="/">Shop</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
