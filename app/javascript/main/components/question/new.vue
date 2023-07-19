<template>
  <div class="question-new">
    <div class="container">
      <div class="question-new-inner">

        <h1 class="mb-3">New question</h1>
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="sendQuestionForm()">
              <div class="mb-3">
                <label for="title">Title</label>
                <input class="form-control"
                  v-model="question.title"
                  type="text"
                >
              </div>
              <div class="mb-3">
                <label for="title">Content</label>
                <input class="form-control"
                  v-model="question.content"
                  type="text"
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
import { computed, defineComponent, ref, onBeforeMount } from 'vue'
import { router } from 'main/routes/index'
import store from 'main/store/base'
import abilities from 'main/mixins/abilities'

export default defineComponent({
  setup() {
    const question = computed(() => store.state.question.question)
    const questionAbilities = ref(store.state.ability.abilities.Question)
    const { checkAbilities } = abilities()

    onBeforeMount(() => {
      checkAbilities(questionAbilities.value.create)
    })

    function sendQuestionForm() {
      const params = { question: question.value }
      store.dispatch('question/createQuestion', params).then(data => {
        if (data.ok) {
          store.commit('notice/setNotice', {
            title: "Success",
            text: 'asdfdsf',
            type: 'success'
          })
          router.push({ name: 'question_index' })
        }
      })
    }

    return {
      question,
      sendQuestionForm
    }
  }
})
</script>

<style scoped>

</style>