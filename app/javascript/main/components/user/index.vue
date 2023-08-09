<template>
  <div class="users-list-part">
    <div class="container">
      <div class="users-list-inner">

        <h1 class="mb-3">{{ $t('users.index.title') }}</h1>

        <div class="position-relative mb-3">
          <vue-search
            :storeName="'user'"
            :placeholderValue="'Input user name'"
          />
        </div>

        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between align-items-center"
            v-for="(user, idx) in users.users"
            :key="user.id"
          >
            <div>
              <router-link :to="{ name: 'user_show', params: { id: user.id } }">
                {{ user.name }}: {{ user.role }}
              </router-link>
            </div>
            <div class="btn-group">
              <button class="btn btn-dark"
                v-if="userAbility.manage"
              >
                Login as
              </button>
              <router-link class="btn btn-info"
                v-if="userAbility.update"
                :to="{ name: 'user_edit', params: { id: user.id } }"
              >
                Change
              </router-link>
              <button class="btn btn-danger"
                v-if="userAbility.destroy"
                @click="destroyUser(user.id, idx)"
              >
                Destroy
              </button>
            </div>
          </li>
        </ul>

        <vue-pagination
          :storeName="'user'"
        ></vue-pagination>

      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, ref, defineComponent, onBeforeMount } from "vue"
import { useRoute } from 'vue2-helpers/vue-router'
import VueSearch from 'common/components/VueSearch.vue'
import VuePagination from "common/components/VuePagination"
import store from 'main/store/base'
import actions from 'main/mixins/actions'
import abilities from 'main/mixins/abilities'

export default defineComponent({
  components: { VueSearch, VuePagination },
  setup() {
    const users = computed(() => store.state.user.users)
    const userAbility = ref(store.state.ability.abilities.User)
    const route = useRoute()
    const { destroyRecord } = actions()
    const { checkAbilities } = abilities()

    onBeforeMount(() => {
      checkAbilities(userAbility.value.read).then(data => {
        const params = { page: route.query.page || 1 }
        if (data) {
          store.dispatch('user/getUsers', params)
        }
      })
    })

    function destroyUser(id: number | string, idx: number): void {
      const params = { id }
      destroyRecord('user/destroyUser', params).then(data => {
        const params = { page: route.query.page || 1 }
        if (data) {
          store.dispatch('user/getUsers', params)
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