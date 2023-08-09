<template>
  <div class="vue-search position-relative">

    <input class="form-control"
      type="text"
      v-model='searchValue'
      @input='sendInputValue()'
      :placeholder='placeholderValue'
    >

    <div class="position-absolute w-100"
      style="z-index: 5;"
      v-if='searchList'
    >
      <div class="list-group">
        <div class="list-group-item list-group-action"
          v-for="item in searchList"
          :key="item.id"
        >
          <router-link :to="{ name: `${storeName}_show`, params: { id: item.id } }">
            {{ outputItem(item) }}
          </router-link>
        </div>

        <div class="list-group-item"
          v-if='!isLoading && !hasError && !searchList.length && searchValue.length >= 3'
        >
          Not found
        </div>
        <div class="list-group-item"
          v-else-if='isLoading && hasError && searchValue.length >= 3'
        >
          Error
        </div>

      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, computed } from "vue"
import store from 'main/store/base'

export default defineComponent({
  props: {
    storeName: String,
    placeholderValue: {
      type: String,
      required: false,
      default: 'Input your value'
    }
  },
  setup(props) {
    const { storeName, placeholderValue } = toRefs(props)
    const storeNameCapitalize = storeName.value[0].toUpperCase() + storeName.value.slice(1)
    const searchValue = ref('')
    const isLoading = ref(false)
    const hasError = ref(false)
    const searchList = computed(() => store.state[storeName.value][`${storeName.value}Search`])
    const storeRoute = ref(`${storeName.value}/search${storeNameCapitalize}`)

    function sendInputValue(): void {
      if (searchValue.value.length >= 3) {
        isLoading.value = true
        const params = { q: searchValue.value }
        store.dispatch(storeRoute.value, params)
          .then(data => {
            isLoading.value = false
            hasError.value = false
          })
          .catch(err => {
            hasError.value = true
          })
      } else {
        store.commit(`${storeName.value}/set${storeNameCapitalize}Search`, [])
      }
    }

    function outputItem(item): object {
      const obj = { ...item }
      delete obj.id
      return obj
    }

    return {
      storeName,
      placeholderValue,
      searchValue,
      isLoading,
      hasError,
      searchList,
      sendInputValue,
      outputItem
    }
  }
})
</script>

<style>

</style>