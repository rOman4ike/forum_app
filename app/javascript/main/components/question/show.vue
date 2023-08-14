<template>
  <div class="question-show">
    <div class="container">
      <div class="question-show-inner">

        <div class="d-flex justify-content-between align-items-center mb-3">
          <h1>{{ question.title }}</h1>
          <div class="btn-group">
            <router-link class="btn btn-secondary"
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
              v-if="questionAbility.destroy"
              @click="destroyQuestion(question.id)"
            >
              Destroy
            </button>
            <router-link class="btn btn-info"
              v-if="questionAbility.update"
              :to="{ name: 'question_edit', params: { id: route.params.id } }"
            >
              Change
            </router-link>
          </div>
        </div>

        <div class="card mb-3">
          <div class="card-header">
            <span v-if="question.user">{{ $t('questions.show.card.created') }}:
              <router-link :to="{ name: 'user_show', params: { id: question.user.id } }">
                {{ question.user.name }}
              </router-link>
            </span>
            <span class="ms-3">{{ $t('questions.show.card.modified') }}: 0</span>
            <span class="ms-3">{{ $t('questions.show.card.rating') }}: 0</span>
            <span class="ms-3">{{ $t('questions.show.card.viewed') }}: {{ question.viewed }}</span>
          </div>
          <div class="card-body">
            <p>
              {{ question.content }}
            </p>
          </div>
        </div>

        <h2>{{ $t('questions.show.comment') }}</h2>
        <div class="card">
          <div class="card-body">
            <p>Lorem, ipsum.</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue2-helpers/vue-router'
import { router } from 'main/routes/index'
import store from 'main/store/base'
import actions from 'main/mixins/actions'
import abilities from 'main/mixins/abilities'

export default defineComponent({
  setup() {
    const question = computed(() => store.state.question.question)
    const questionAbility = ref(store.state.ability.abilities.Question)
    const route = useRoute()
    const { destroyRecord } = actions()
    const { checkAbilities } = abilities()
    console.log(question);


    onBeforeMount(() => {
      checkAbilities(questionAbility.value.read).then(data => {
        const params = { id: route.params.id }
        if (data) {
          store.dispatch('question/getQuestion', params)
        }
      })
    })

    function destroyQuestion(id: number | string): void {
      const params: object = { id }
      destroyRecord('question/destroyQuestion', params).then(data => {
        if (data.ok) {
          router.push({ name: 'question_index' })
        }
      })
    }

    return {
      question,
      questionAbility,
      route,
      destroyQuestion
    }
  }
})
</script>

<style scoped>

</style>