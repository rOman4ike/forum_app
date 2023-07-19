<template>
  <div class="useredit">
    <div class="container">
      <div class="useredit-inner">

        <div class="d-flex justify-content-between align-items-center mb-3">
          <h1>
            {{ $t('users.edit.title') }}
          </h1>
          <div class="actions">
            <button class="btn btn-danger" @click="destroyUser(user.id)">Destroy</button>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="sendEditForm({
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            })">
              <div class="mb-3">
                <label for="email">{{ $t('users.edit.form.email') }}</label>
                <input class="form-control"
                  v-model="user.email"
                  type="email"
                  id="email"
                >
              </div>
              <div class="mb-3">
                <label for="name">{{ $t('users.edit.form.name') }}</label>
                <input class="form-control"
                  v-model="user.name"
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
import { computed, ref, defineComponent, onBeforeMount } from 'vue'
import { useRoute } from 'vue2-helpers/vue-router'
import store from 'main/store/base'
import { router } from 'main/routes/index'
import { UserEdit } from 'main/types/user'
import actions from 'main/mixins/actions'
import abilities from 'main/mixins/abilities'

export default defineComponent({
  setup() {
    const user = computed(() => store.state.user.user)
    const userAbility = ref(store.state.ability.abilities.User)
    const route = useRoute()
    const { destroyRecord } = actions()
    const { checkAbiltities } = abilities()

    onBeforeMount(() => {
      checkAbiltities(userAbility.value.update).then(data => {
        if (data) {
          const params = { id: route.params.id }
          store.dispatch('user/getUserForEdit', params)
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

    function sendEditForm(params: { user: UserEdit }): void {
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
      user,
      destroyUser,
      sendEditForm
    }
  },
})
</script>
