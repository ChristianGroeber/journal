<template>
  <div>
    <vk-modal :show.sync="show">
      <vk-modal-close @click="hidePopup"></vk-modal-close>
      <vk-modal-title>Edit Specific Entry</vk-modal-title>
      <div>
        <input type="date" v-model="dateEntry" />
      </div>
      <div slot="footer">
        <div class="uk-text-right">
          <vk-button class="btn btn-primary" @click="editSpecificEntry">Submit</vk-button>
        </div>
      </div>
    </vk-modal>
  </div>
</template>

<script>
import moment from "moment";
import {buildRequest, send} from "@/src/helpers/xhr";
import {useMainStore} from "@/src/store/main";
import {useAuthStore} from "@/src/store/auth";
import {useRouter} from "vue-router";

export default {
  data: function () {
    return {
      dateEntry: moment().format("yyyy-MM-DD"),
      mainStore: useMainStore(),
    };
  },
  computed: {
    show: {
      get() {
        return this.mainStore.getShowEditSpecificPopup
      },
      set(newValue) {
        this.mainStore.setShowEditSpecificPopup(newValue);
      },
    },
  },
  methods: {
    hidePopup() {
      this.mainStore.setShowEditSpecificPopup(false);
    },
    editSpecificEntry() {
      const token = useAuthStore().getToken;
      const data = {token: token, entry: this.dateEntry};
      const request = buildRequest('/api/admin/entry/create', data);
      send(request).then(response => {
        this.mainStore.setShowEditSpecificPopup(false);
        useRouter().push("/edit?entry=" + response.data.entryId);
      })
    },
  },
};
</script>