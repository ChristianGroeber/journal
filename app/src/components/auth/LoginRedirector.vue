<template>
    <div>
        Redirecting...
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useAuthStore} from "@/src/store/auth";

export default defineComponent({
    created() {
        const token = useAuthStore().getToken;
        if (token === null || token === 'null') {
        } else {
        }
    }
})
</script>