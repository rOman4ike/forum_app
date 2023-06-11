<template>
  <div class="alert-part mt-4 mb-4">
    <div class="container">
      <div class="alert-inner">

        <div class="alert alert-dismissible fade show"
          v-if="noticeExists"
          @click="clearNotice()"
          :class="'alert-' + noticeInfo.type"
          role="alert"
        >
          <h4 class="alert-heading">
            {{ noticeInfo.title }}
          </h4>
          <p>
            {{ noticeInfo.text }}
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import store from 'main/store/base'
import Notice from 'main/types/notice'

export default defineComponent({
  setup() {
    const noticeStore = store.state.notice
    const noticeInfo = computed<Notice>(() => noticeStore.notice)
    const noticeExists = computed<boolean>(() => {
      return !!(noticeStore.notice.title?.trim().length && noticeStore.notice.text?.trim().length)
    })

    function clearNotice(): void {
      store.commit('notice/clearNotice')
    }

    return {
      noticeInfo,
      noticeExists,
      clearNotice
    }
  }
})
</script>