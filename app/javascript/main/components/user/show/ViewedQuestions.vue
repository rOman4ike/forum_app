<template>
  <div>
    <div class="list-group">
      <router-link class="list-group-item list-group-item-action"
        v-for="viewedQuestion in viewedQuestions"
        :key="viewedQuestion.id"
        :to="{ name: 'question_show', params: { id: viewedQuestion.question_id } }"
      >
        {{ viewedQuestion.title }}
      </router-link>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent } from "vue"
import store from 'main/store/base'

export default defineComponent({
  setup() {
    const viewedQuestions = computed(() => store.state.viewedQuestion.viewedQuestions)

    return {
      viewedQuestions
    }
  }
})
</script>

<style>

</style>