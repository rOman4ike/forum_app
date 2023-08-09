<template>
  <div class="vue-pagination">
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
          v-for="page in paginateInfo.total_pages"
          :key='page'
        >
          <a class="page-link"
            :class="{ 'active': page == paginateInfo.current_page }"
            @click="changePage(page)"
          >
            {{ page }}
          </a>
        </li>
        <li class="page-item"
          :class="{ 'disabled': route.query.page == paginateInfo.total_pages}"
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
</template>

<script lang='ts'>
import { computed, defineComponent, toRefs } from 'vue'
import { useRoute } from 'vue2-helpers/vue-router'
import store from 'main/store/base'
import { router } from 'main/routes/index'

export default defineComponent({
  props: {
    storeName: String
  },
  setup(props) {
    const { storeName } = toRefs(props)
    const storeNameValue = storeName.value
    const storeNameCapitalize = storeName.value[0].toUpperCase() + storeName.value.slice(1)
    const paginateInfo = computed(() => store.state[storeNameValue][`${storeNameValue}s`])
    const route = useRoute()

    function changePage(page): void {
      if (page >= 1 && page <= paginateInfo.value.total_pages && page != route.query.page) {
        const params = { page }
        router.push({ name: `${storeNameValue}_index`, query: { page } })
        store.dispatch(`${storeNameValue}/get${storeNameCapitalize}s`, params)
      }
    }

    return {
      paginateInfo,
      route,
      changePage
    }
  }
})
</script>

<style>

</style>