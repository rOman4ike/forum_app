<template>
  <div class="user-part">
    <div class="container">
      <div class="user-inner">

        <div class="d-flex justify-content-between align-items-center mb-3">
          <h1>
            {{ $t('users.show.title', { name: user.name }) }}
          </h1>
          <div class="btn-group">
            <button class="btn btn-danger"
              v-if="userAbility.destroy"
              @click="destroyUser(user.id)"
            >
              Destroy
            </button>
            <router-link class="btn btn-info"
              :to="{ name: 'user_edit', params: { id: user.id } }"
              v-if="userAbility.update"
            >
              Change
            </router-link>
          </div>
        </div>

        <div class="card mb-3">
          <div class="card-header">
            <a href="#">Viewed questions</a>
            <a class="ms-3" href="#">Subscribed questions</a>
            <a class="ms-3" href="#">Subscriptions</a>
          </div>
          <div class="card-body">
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
        </div>

        <h2>User Questions</h2>
        <div class="card mb-3">
          <div class="card-body">
            <p>asdf</p>
          </div>
        </div>

        <h2>User Answers</h2>
        <div class="card">
          <div class="card-body">
            <p>asdf</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, defineComponent, onBeforeMount } from 'vue'
import { useRoute } from 'vue2-helpers/vue-router'
import { router } from 'main/routes/index'
import store from 'main/store/base'
import actions from 'main/mixins/actions'
import abilities from 'main/mixins/abilities'

export default defineComponent({
  setup() {
    const user = computed(() => store.state.user.user )
    const userAbility = ref(store.state.ability.abilities.User)
    const route = useRoute()
    const { destroyRecord } = actions()
    const { checkAbilities } = abilities()

    onBeforeMount(() => {
      checkAbilities(userAbility.value.read).then(data => {
        if (data) {
          const params = { id: route.params.id }
          store.dispatch('user/getUser', params)
        }
      })
    })

    function destroyUser(id: number | string): void {
      const params: object = { id }
      destroyRecord('user/destroyUser', params).then(data => {
        if (data.ok) {
          router.push({ name: 'user_index' })
        }
      })
    }

    return {
      user,
      destroyUser,
      userAbility,
    }
  }
})
</script>

<style>

</style>