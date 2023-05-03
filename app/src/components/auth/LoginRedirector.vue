<template>
  <div>
    Redirecting...
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useAuthStore} from "@/src/store/auth";
import {useRouter} from "vue-router";

export default defineComponent({
  created() {
    const router = useRouter();
    const token = useAuthStore().getToken;
    if (token === null || token === 'null') {
      router.push('/auth/login');
    } else {
      router.push('/');
    }
  }
})
</script>