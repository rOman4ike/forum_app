<template>
  <div class="useredit">
    <div class="container">
      <div class="useredit-inner">

        <div class="d-flex justify-content-between align-items-center mb-3">
          <h1>{{ name }} edit</h1>
          <div class="actions">
            <button class="btn btn-danger" @click="destroyUser(id)">Destroy</button>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="sendEditForm({
              user: {
                id,
                name,
                email
              },
              id
            })">
              <div class="mb-3">
                <label for="email">Email</label>
                <input class="form-control"
                  v-model="email"
                  type="email"
                  id="email"
                >
              </div>
              <div class="mb-3">
                <label for="name">Name</label>
                <input class="form-control"
                  v-model="name"
                  type="text"
                  id="name"
                >
              </div>
              <button class="btn btn-primary" type="submit">Submit</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, toRefs } from 'vue'
import { useRoute } from 'vue2-helpers/vue-router'
import store from 'main/store/base'
import { router } from 'main/routes/index'
import { UserEdit } from 'main/types/user'
import actions from 'main/mixins/actions'

export default defineComponent({
  setup() {
    const userData = reactive<UserEdit>({
      id: '',
      name: '',
      email: '',
    })
    const route = useRoute()
    const { destroyRecord } = actions()

    // Придумать как можно обойтись без этого
    onBeforeMount(() => {
      const params = { id: route.params.id }
      store.dispatch('user/getUserForEdit', params).then(data => {
        for (const item in data.body) {
          userData[item] = data.body[item]
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

    function sendEditForm(params: { user: UserEdit, id: number | string }) {
      store.dispatch('user/updateUser', params).then(data => {
        if (data.ok) {
          store.commit('notice/setNotice', {
            title: "Success",
            text: 'asdfdsf',
            type: 'success'
          })
          router.push({ name: 'user_index' })
        }
      })
    }

    return {
      ...toRefs(userData),
      destroyUser,
      sendEditForm
    }
  },
})
</script>
