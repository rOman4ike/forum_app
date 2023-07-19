<template>
  <div class="question-edit">
    <div class="container">
      <div class="question-edit-inner">

        <div class="d-flex justify-content-between align-items-center mb-3">
          <h1>
            Edit question
          </h1>
          <div class="btn-group">
            <button class="btn btn-danger" @click="destroyQuestion(question.id)">Destroy</button>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="sendEditForm()">
              <div class="mb-3">
                <label for="title">Title</label>
                <input class="form-control"
                  v-model="question.title"
                  type="title"
                  id="title"
                >
              </div>
              <div class="mb-3">
                <label for="content">Content</label>
                <input class="form-control"
                  v-model="question.content"
                  type="content"
                  id="content"
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
import actions from 'main/mixins/actions'
import abilities from 'main/mixins/abilities'

export default defineComponent({
  setup() {
    const question = computed(() => store.state.question.question)
    const questionAbility = ref(store.state.ability.abilities.Question)
    const route = useRoute()
    const { destroyRecord } = actions()
    const { checkAbilities } = abilities()

    onBeforeMount(() => {
      checkAbilities(questionAbility.value.update).then(data => {
        if (data) {
          const params = { id: route.params.id }
          store.dispatch('question/getQuestionForEdit', params)
        }
      })
    })

    function destroyQuestion(id: number | string): void {
      const params = { id }
      destroyRecord('question/destroyQuestion', params).then(data => {
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

    function sendEditForm(): void {
      const params = {
        question: {
          id: question.value.content,
          title: question.value.title,
          content: question.value.content
        }
      }
      store.dispatch('question/updateQuestion', params).then(data => {
        if (data.ok) {
          store.commit('notice/setNotice', {
            title: "Success",
            text: 'asdfdsf',
            type: 'success'
          })
          router.push({ name: 'question_show', params: { id: question.value.content } })
        }
      })
    }

    return {
      question,
      destroyQuestion,
      sendEditForm
    }
  }
})
</script>

<style scoped>

</style>