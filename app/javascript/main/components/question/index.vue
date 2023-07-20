<template>
  <div class="question-index">
    <div class="container">
      <div class="question-index-inner">

        <div class="d-flex justify-content-between align-items-center mb-3">
          <h1>Questions list <span class="badge bg-secondary">New</span> <span class='badge bg-danger'>Related</span></h1>
          <div class="btn-group">
            <router-link :to="{ name: 'question_new' }"
              v-if="questionAbilities.create"
            >
              <a class="btn btn-success">Create</a>
            </router-link>
          </div>
        </div>
        <div class="position-relative mb-3">
          <input class="form-control"
            v-model="searchValue"
            @input="sendInputValue()"
            type="text"
            placeholder="Input question title"
          >
          <div class="position-absolute w-100"
            style="z-index: 1;"
            v-if="searchQuestions.length && searchValue"
          >
            <div class="list-group"
              :class="{'d-block': searchValue}"
              v-for="question in searchQuestions"
              :key="question.id"
            >
              <router-link class="list-group-item list-group-item-action"
                :to="{ name: 'question_show', params: { id: question.id } }"
              >
                {{ question.title }}
              </router-link>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <div class="form-check form-check-inline mb-3">
            <input class="form-check-input"
              type="radio"
              name="pagination"
              id="pagination1"
              checked
            ><label class="form-check-label" for="pagination1">Пагинация в виде меню</label>
          </div>

          <div class="form-check form-check-inline">
            <input class="form-check-input"
              type="radio"
              name="pagination"
              id="pagination2"
            ><label class="form-check-label" for="pagination2">Автоматическая пагинация</label>
          </div>
        </div>

        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between align-items-center"
            v-for="(question, idx) in questions.questions"
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

        <nav v-if="searchQuestions.length">
          <ul class="pagination justify-content-center">
            <li class="page-item"
              :class="{ 'disabled': route.query.page == 1 || !route.query.page }"
            >
              <a class="page-link"
                @click="changePage(route.query.page - 1)"
              >
                Previous
              </a>
            </li>

            <li class="page-item"
              v-for="page in questions.total_pages"
              :key='page'
            >
              <a class="page-link"
                :class="{ 'active': page == questions.current_page }"
                @click="changePage(page)"
              >
                {{ page }}
              </a>
            </li>

            <li class="page-item"
              :class="{ 'disabled': route.query.page == questions.total_pages}"
            >
              <a class="page-link"
                @click="changePage(+route.query.page + 1 || 2)"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, defineComponent, onBeforeMount } from "vue"
import { useRoute } from 'vue2-helpers/vue-router'
import { router } from 'main/routes/index'
import store from 'main/store/base'
import actions from 'main/mixins/actions'
import abilities from 'main/mixins/abilities'

export default defineComponent({
  setup() {
    const questions = computed(() => store.state.question.questions)
    const questionAbilities = ref(store.state.ability.abilities.Question)
    const searchValue = ref('')
    const searchQuestions = computed(() => store.state.question.searchQuestions)
    const route = useRoute()
    const { destroyRecord } = actions()
    const { checkAbilities } = abilities()

    onBeforeMount(() => {
      checkAbilities(questionAbilities.value.read).then(data => {
        const params = {
          page: route.query.page || 1
        }
        if (data) {
          store.dispatch('question/getQuestions', params)
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

    function changePage(page): void {
      if (page >= 1 && page <= questions.value.total_pages && page != route.query.page) {
        const params = { page }
        router.push({ name: 'question_index', query: { page } })
        store.dispatch('question/getQuestions', params)
      }
    }

    function sendInputValue(): void {
      const params = { q: searchValue.value }
      store.dispatch('question/searchQuestion', params)
    }

    return {
      questions,
      questionAbilities,
      searchValue,
      searchQuestions,
      route,
      destroyQuestion,
      changePage,
      sendInputValue
    }
  }
})
</script>

<style scoped>

</style>