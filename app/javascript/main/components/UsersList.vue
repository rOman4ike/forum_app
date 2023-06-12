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
              <router-link :to="'/user/' + user.id">
                {{ user.name }}: {{ user.role }}
              </router-link>
            </div>
            <div class="actions">
              <button class="btn btn-danger" @click="destroyUser({id: user.id}, idx)">Destroy</button>
              <button class="btn btn-info" @click="changeUser(user.id)">Change</button>
            </div>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, ref } from "vue"
import store from 'main/store/base'
import { router } from 'main/routes/index'

export default defineComponent({
  setup() {
    const users = ref([])

    onBeforeMount(() => {
      store.dispatch('user/getUsers').then(data => {
        users.value = data.body
      })
    })

    // Придумать как проинициализировать этот метод (один раз) и использовать его везде
    function destroyUser(params, idx) {
      if (confirm("Are you sure?")) {
        store.dispatch('user/destroyUser', params).then(data => {
          console.log(data);
          if (data.ok) {
            store.commit('notice/setNotice', {
              title: "Success",
              text: 'asdfdsf',
              type: 'success'
            })
            users.value.splice(idx, 1)
          }
        })
      }
    }

    function changeUser(id) {
      router.push({ path: `/user/${id}/edit` })
    }

    return {
      users,
      destroyUser,
      changeUser,
    }
  },
})
</script>

<style>

</style>