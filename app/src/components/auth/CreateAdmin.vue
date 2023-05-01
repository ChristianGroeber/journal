<template>
  <div class="main-content">
    <form>
      <input class="uk-input" type="text" v-model="username" placeholder="Admin Username">
      <input class="uk-input" type="text" v-model="password" placeholder="Admin Password">
      <vk-button class="btn btn-primary" @click="submit">Submit</vk-button>
    </form>
  </div>
</template>

<script lang="ts">
import xhr from "../../helpers/xhr";
import {useRouter} from "vue-router";
import {defineComponent} from "vue";

export default defineComponent({
  data: function () {
    return {
      username: '',
      password: '',
    }
  },
  created: function () {
    const request = xhr.buildRequest('/api/auth/create-admin');
    xhr.send(request).catch(reason => {
      if (reason.response.status === 400) {
        alert(reason.response.data.message);
      }
    });
  },
  methods: {
    submit() {
      const data = {
        username: this.username,
        password: this.password,
      }
      const request = xhr.buildRequest('/api/auth/create-admin', data, 'POST');
      xhr.send(request)
          .then(response => {
            if (response.data.adminCreated) {
              useRouter().push('/auth/login');
            }
          })
          .catch((reason) => {
            if (reason.response.status === 400) {
              alert(reason.response.data.message);
            }
          });
    }
  }
})
</script>