<template>
  <div class="users-list-part">
    <div class="container">
      <div class="users-list-inner">

        <h1 class="mb-3">{{ $t('users.index.title') }}</h1>
        <div class="mb-3">
          <input class="form-control" type="text" placeholder="Input user name">
        </div>
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
              <button class="btn btn-danger"
                v-if="userAbility.destroy"
                @click="destroyUser(user.id, idx)"
              >Destroy</button>
              <router-link class="btn btn-info"
                v-if="userAbility.update"
                :to="{ name: 'user_edit', params: { id: user.id } }"
              >
                Change
              </router-link>
            </div>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, ref, defineComponent, onBeforeMount } from "vue"
import store from 'main/store/base'
import actions from 'main/mixins/actions'
import abilities from 'main/mixins/abilities'

export default defineComponent({
  setup() {
    const users = computed(() => store.state.user.users)
    const userAbility = ref(store.state.ability.abilities.User)
    const { destroyRecord } = actions()
    const { checkAbiltities } = abilities()

    onBeforeMount(() => {
      checkAbiltities(userAbility.value.read).then(data => {
        if (data) {
          store.dispatch('user/getUsers')
        }
      })
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
      userAbility
    }
  },
})
</script>

<style>

</style>