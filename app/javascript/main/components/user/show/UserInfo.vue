<template>
  <div>
    <p>
      <strong>{{ $t('users.show.info.email') }}:</strong> {{ user.email }}
    </p>
    <p>
      <strong>{{ $t('users.show.info.name') }}:</strong> {{ user.name }}
    </p>
    <p>
      <strong>{{ $t('users.show.info.role') }}:</strong> {{ user.role }}
    </p>
    <p>
      <strong>{{ $t('users.show.info.created_at') }}</strong> {{ user.created_at }}
    </p>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent } from "vue"
import store from 'main/store/base'

export default defineComponent({
  setup() {
    const user = computed(() => store.state.user.user)

    return {
      user
    }
  }
})
</script>

<style>

</style>