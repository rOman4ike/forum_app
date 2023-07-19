<template>
  <div class="question-index">
    <div class="container">
      <div class="question-index-inner">

        <div class="d-flex justify-content-between align-items-center mb-3">
          <h1>Questions list <span class="badge bg-secondary">New</span> <span class='badge bg-danger'>Related</span> </h1>
          <div class="btn-group">
            <router-link :to="{ name: 'question_new' }"
              v-if="questionAbilities.create"
            >
              <a class="btn btn-success">Create</a>
            </router-link>
          </div>
        </div>
        <div class="mb-3">
          <input class="form-control" type="text" placeholder="Input question title">
        </div>

        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center"
            v-for="(question, idx) in questions"
            :key="question.id"
          >
            <router-link :to="{ name: 'question_show', params: { id: question.id } }">
              {{ question.title }}
            </router-link>
            <div class="btn-group">
              <router-link class="btn btn-info"
                v-if="questionAbilities.update"
                :to="{ name: 'question_edit', params: { id: question.id } }"
              >
                Change
              </router-link>
              <button class="btn btn-danger"
                v-if="questionAbilities.destroy"
                @click='destroyQuestion(question.id, idx)'
              >
                Destroy
              </button>
            </div>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, defineComponent, onBeforeMount } from "vue"
import store from 'main/store/base'
import actions from 'main/mixins/actions'
import abilities from 'main/mixins/abilities'

export default defineComponent({
  setup() {
    const questions = computed(() => store.state.question.questions)
    const questionAbilities = ref(store.state.ability.abilities.Question)
    const { destroyRecord } = actions()
    const { checkAbilities } = abilities()

    onBeforeMount(() => {
      checkAbilities(questionAbilities.value.read).then(data => {
        if (data) {
          store.dispatch('question/getQuestions')
        }
      })
    })

    function destroyQuestion(id: number | string, idx: number) {
      const params = { id }
      destroyRecord('question/destroyQuestion', params).then(data => {
        if (data.ok) {
          questions.value.splice(idx, 1)
        }
      })
    }

    return {
      questions,
      questionAbilities,
      destroyQuestion
    }
  }
})
</script>

<style scoped>

</style>