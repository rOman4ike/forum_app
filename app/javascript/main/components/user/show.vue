<template>
  <div class="user-part">
    <div class="container">
      <div class="user-inner">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h1>
            {{ user.name }} profile
          </h1>
          <div class="actions">
            <button class="btn btn-danger" @click="destroyUser(user.id)">Destroy</button>
            <router-link :to="{ name: 'user_edit', params: { id: user.id } }">
              <button class="btn btn-info">Change</button>
            </router-link>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <p>
              <strong>Email:</strong> {{ user.email }}
            </p>
            <p>
              <strong>Name:</strong> {{ user.name }}
            </p>
            <p>
              <strong>Role:</strong> {{ user.role }}
            </p>
            <p>
              <strong>Created at</strong> {{ user.created_at }}
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue'
import { useRoute } from 'vue2-helpers/vue-router'
import { router } from 'main/routes/index'
import store from 'main/store/base'
import actions from 'main/mixins/actions'

export default defineComponent({
  setup() {
    const user = computed(() => store.state.user.user )
    const route = useRoute()
    const { destroyRecord } = actions()

    onBeforeMount(() => {
      const params = { id: route.params.id }
      store.dispatch('user/getUser', params)
    })

    function destroyUser(id: number | string): void {
      const params: object = { id }
      destroyRecord(params, 'user/destroyUser').then(data => {
        if (data.ok) {
          router.push({ name: 'user_index' })
        }
      })
    }

    return {
      user,
      destroyUser,
    }
  }
})
</script>

<style>

</style>