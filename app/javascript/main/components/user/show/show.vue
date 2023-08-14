<template>
  <div class="user-part">
    <div class="container">
      <div class="user-inner">

        <div class="d-flex justify-content-between align-items-center mb-3">
          <h1>
            {{ $t('users.show.title', { name: user.name }) }}
          </h1>
          <div class="btn-group">
            <router-link class="btn btn-primary"
              :to="{ name: 'main' }"
            >
              Subscribe
            </router-link>
            <router-link class="btn btn-warning"
              :to="{ name: 'main' }"
            >
              Report
            </router-link>
            <button class="btn btn-danger"
              v-if="userAbility.destroy"
              @click="destroyUser(user.id)"
            >
              Destroy
            </button>
            <router-link class="btn btn-info"
              v-if="userAbility.update"
              :to="{ name: 'user_edit', params: { id: user.id } }"
            >
              Change
            </router-link>
          </div>
        </div>

        <div class="card mb-3">
          <div class="card-header">
            <a class="link"
              :class="{ 'link-success': activeComponent == 'UserInfo' }"
              @click.prevent="activeComponent = 'UserInfo'"
            >
              User info
            </a>
            <a class="link ms-3"
              :class="{ 'link-success': activeComponent == 'ViewedQuestions' }"
              @click.prevent="activeComponent = 'ViewedQuestions'"
            >
              Viewed questions
            </a>
            <a class="link ms-3" href="#">Subscribed questions</a>
            <a class="link ms-3" href="#">Subscriptions</a>
          </div>
          <div class="card-body">
            <component :is="activeComponent"/>
          </div>
        </div>

        <h2>User Questions</h2>
        <div class="card mb-3">
          <div class="card-body">
            <div class="list-group" v-if="user.questions && user.questions.length">
              <router-link class="list-group-item list-group-item-action"
                v-for="question in user.questions"
                :key="question.id"
                :to="{ name: 'question_show', params: { id: question.id } }"
              >
                {{ question.title }}
              </router-link>
            </div>
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
import UserInfo from './UserInfo.vue'
import ViewedQuestions from './ViewedQuestions.vue'

export default defineComponent({
  components: {
    UserInfo,
    ViewedQuestions
  },
  setup() {
    const user = computed(() => store.state.user.user )
    const userAbility = ref(store.state.ability.abilities.User)
    const activeComponent = ref('UserInfo')
    const route = useRoute()
    const { destroyRecord } = actions()
    const { checkAbilities } = abilities()

    onBeforeMount(() => {
      checkAbilities(userAbility.value.read).then(data => {
        if (data) {
          const params = { id: route.params.id }
          store.dispatch('user/getUser', params)
          store.dispatch('viewedQuestion/getViewedQuestions', params)
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
      activeComponent,
    }
  }
})
</script>

<style>

</style>