<template>
  <div class="users-list-part">
    <div class="container">
      <div class="users-list-inner">

        <h1 class="mb-3">Users List</h1>
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center"
            v-for="(user, idx) in users"
            :key="user.id"
          >
            <div>
              <router-link :to="{ name: 'user_show', params: { id: user.id } }">
                {{ user.name }}: {{ user.role }}
              </router-link>
            </div>
            <div class="actions">
              <button class="btn btn-danger" @click="destroyUser(user.id, idx)">Destroy</button>
              <router-link :to="{ name: 'user_edit', params: { id: user.id } }">
                <button class="btn btn-info">Change</button>
              </router-link>
            </div>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, onBeforeMount } from "vue"
import store from 'main/store/base'
import actions from 'main/mixins/actions'

export default defineComponent({
  setup() {
    const users = computed(() => store.state.user.users)
    const { destroyRecord } = actions()

    onBeforeMount(() => {
      store.dispatch('user/getUsers')
    })

    function destroyUser(id: number | string, idx: number): void {
      const params = { id }
      destroyRecord(params, 'user/destroyUser').then(data => {
        if (data.ok) {
          users.value.splice(idx, 1)
        }
      })
    }

    return {
      users,
      destroyUser,
    }
  },
})
</script>

<style>

</style>