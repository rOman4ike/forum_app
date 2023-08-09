<template>
  <header class="header">
    <div class="container">
      <div class="header-inner">

        <nav class="navbar navbar-expand-sm bg-light navbar-light">
          <div class="container-fluid">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'main' }">
                  {{ $t('header.nav.main') }}
                </router-link>
              </li>
              <li class="nav-item" v-if="!isAuthorized">
                <router-link class="nav-link" :to="{ name: 'login' }">
                  {{ $t('header.nav.login') }}
                </router-link>
              </li>
              <li class="nav-item" v-if="!isAuthorized">
                <router-link class="nav-link" :to="{ name: 'signup' }">
                  {{ $t('header.nav.signup') }}
                </router-link>
              </li>
              <li class="nav-item" v-if="abilities.User.read">
                <router-link class="nav-link" :to="{ name: 'user_index' }">
                  {{ $t('header.nav.users_list') }}
                </router-link>
              </li>
              <li class="nav-item" v-if="abilities.Question.read">
                <router-link class="nav-link" :to="{ name: 'question_index' }">
                  {{ $t('header.nav.questions') }}
                </router-link>
              </li>
              <li class="nav-item" v-if="isAuthorized">
                <a class="nav-link"
                  @click="redirectToMyProfile()"
                >
                  {{ $t('header.nav.my_profile') }}
                </a>
              </li>
              <li class="nav-item" v-if="isAuthorized">
                <router-link class="nav-link link-primary"
                  :to="{ name: 'main' }"
                  @click.native="logout()"
                >
                  {{ $t('header.nav.logout') }}
                </router-link>
              </li>
              <li class="nav-item">
                <div class="locale-changer">
                  <select class="form-select" v-model="$i18n.locale" @change="changeLocale($i18n.locale)">
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
import { defineComponent, onBeforeMount, computed } from "vue"
import { i18n } from "locales/vue-i18n"
import store from 'main/store/base'
import { router } from 'main/routes/index'

export default defineComponent({
  setup() {
    const isAuthorized = computed(() => store.state.user.isAuthorized)
    const abilities = computed(() => store.state.ability.abilities)

    onBeforeMount(() => {
      if (localStorage.getItem('locale')) {
        i18n.locale = localStorage.getItem('locale')
      }
    })

    function changeLocale(locale) {
      localStorage.setItem('locale', locale)
      i18n.locale = locale
    }

    function redirectToMyProfile() {
      // catch - временное решение, надо потом придумать что-то другое (выскакивает ошибка если повторно нажимать на my profile когда ты уже находишься в нем)
      router
        .push({ name: 'user_show', params: { id: localStorage.getItem('user_id') } })
        .catch(err => {})
    }

    function logout() {
      store.dispatch('user/deleteSession').then(data => {
        if (data.ok) {
          localStorage.removeItem('token')
          localStorage.removeItem('user_id')
          store.commit('user/setIsAuthorized', false)
          store.dispatch('ability/setAbilities', data.data.abilities.models_abilities)
        }
      })
    }

    return {
      isAuthorized,
      abilities,
      changeLocale,
      redirectToMyProfile,
      logout,
    }
  }
})
</script>

<style>

</style>