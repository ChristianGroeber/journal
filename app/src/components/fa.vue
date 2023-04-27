<template functional>
  <FontAwesomeIcon :icon="`fa-solid fa-${icon}`"/>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft, faFloppyDisk, faDownload, faFileWaveform, faEllipsisV, faEdit, faTrash, faSignal, faClipboard, faExternalLink, faHeartPulse, faClock, faGauge, faFire, faPersonRunning, faEye } from '@fortawesome/free-solid-svg-icons'


library.add(faArrowLeft, faDownload, faFloppyDisk, faFileWaveform, faEllipsisV, faEdit, faTrash, faSignal, faClipboard, faExternalLink, faHeartPulse, faClock, faGauge, faFire, faPersonRunning, faEye);

export default({
  name: 'fa',
  props: {
    icon: '',
  },
  components: {
    FontAwesomeIcon,
  }
})
</script>
