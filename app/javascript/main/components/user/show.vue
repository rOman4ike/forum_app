<template>
  <div class="user-part">
    <div class="container">
      <div class="user-inner">

        <div class="d-flex justify-content-between align-items-center mb-3">
          <h1>
            {{ name }} profile
          </h1>
          <div class="actions">
            <button class="btn btn-danger" @click="destroyUser(id)">Destroy</button>
            <router-link :to="{ name: 'user_edit', params: { id } }">
              <button class="btn btn-info">Change</button>
            </router-link>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <p>
              <strong>Email:</strong> {{ email }}
            </p>
            <p>
              <strong>Name:</strong> {{ name }}
            </p>
            <p>
              <strong>Role:</strong> {{ role }}
            </p>
            <p>
              <strong>Created at</strong> {{ created_at }}
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, toRefs } from 'vue'
import { useRoute } from 'vue2-helpers/vue-router'
import { router } from 'main/routes/index'
import store from 'main/store/base'
import { UserShow } from 'main/types/user'
import actions from 'main/mixins/actions'

export default defineComponent({
  setup() {
    const user = reactive<UserShow>({
      id: '',
      name: '',
      email: '',
      role: '',
      created_at: '',
    })
    const route = useRoute()
    const { destroyRecord } = actions()

    // Избавиться от этого - написать мутации и через getters брать данные, которые нужны
    onBeforeMount(() => {
      const params = { id: route.params.id }
      store.dispatch('user/getUser', params).then(data => {
        for (const item in data.body) {
          user[item] = data.body[item]
        }
      })
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
      ...toRefs(user),
      destroyUser,
    }
  }
})
</script>

<style>

</style>