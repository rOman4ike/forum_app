<template>
  <header class="header">
    <div class="container">
      <div class="header-inner">

        <nav class="navbar navbar-expand-sm bg-light navbar-light">
          <div class="container-fluid">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link" to="/">
                  {{ $t('header.nav.main') }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/login">
                  {{ $t('header.nav.login') }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/signup">
                  {{ $t('header.nav.signup') }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'user_index' }">
                  {{ $t('header.nav.users_list') }}
                </router-link>
              </li>
              <li class="nav-item">
                <div class="locale-changer">
                  <select v-model="$i18n.locale" @change="changeLocale($i18n.locale)">
                    <option v-for="locale in $i18n.availableLocales"
                      :key="`locale-${locale}`"
                      :value="locale"
                    >
                      {{ locale }}
                    </option>
                  </select>
                </div>
              </li>
            </ul>
          </div>
        </nav>

      </div>
    </div>
  </header>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount } from "vue"
import { i18n } from "locales/vue-i18n"

export default defineComponent({
  setup() {
    onBeforeMount(() => {
      if (localStorage.getItem('locale')) {
        i18n.locale = localStorage.getItem('locale')
      }
    })

    console.log(navigator);


    function changeLocale(locale) {
      localStorage.setItem('locale', locale)
      i18n.locale = locale
    }

    return {
      changeLocale
    }
  }
})
</script>

<style>

</style>