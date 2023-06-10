<template>
  <div class="users-list-part">
    <div class="container">
      <div class="users-list-inner">

        <ul class="list-group">
          <li class="list-group-item" v-for="user in users" :key="user.id">
            <div>
              <router-link :to="'/user/' + user.id">
                {{ user.name }}
              </router-link>
            </div>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, ref } from "vue"
import Vue from 'vue'

export default defineComponent({
  setup() {
    const users = ref([])
    onBeforeMount(() => {
      Vue.http.get('/api/v1/users/search').then(data => {
        users.value = data.body
      })
    })

    return {
      users
    }
  },
})
</script>

<style>

</style>