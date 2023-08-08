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
          <vue-search
            :storeName="'question'"
            :placeholderValue="'Input question title'"
          />
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

        <nav>
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
import VueSearch from 'common/components/VueSearch.vue'
import { router } from 'main/routes/index'
import store from 'main/store/base'
import actions from 'main/mixins/actions'
import abilities from 'main/mixins/abilities'

export default defineComponent({
  components: { VueSearch },
  setup() {
    const questions = computed(() => store.state.question.questions)
    const questionAbilities = ref(store.state.ability.abilities.Question)
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

    return {
      questions,
      questionAbilities,
      route,
      destroyQuestion,
      changePage,
    }
  }
})
</script>

<style scoped>

</style>