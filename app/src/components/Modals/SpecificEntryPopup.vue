<template>
  <el-dialog v-model="isShowing" title="Edit Specific">
    <div>
      <el-form>
        <el-form-item label="Date">
          <el-input v-model="dateEntry" type="date"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <pj-button-link :action="editSpecificEntry" content="Submit"></pj-button-link>
    </template>
  </el-dialog>
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
    isShowing() {
      return this.mainStore.getShowEditSpecificPopup;
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