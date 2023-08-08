import VueRouter from "vue-router"
import Main from "main/components/Main.vue"
import Login from "main/components/Login.vue"
import Signup from "main/components/Signup.vue"
import ErrorPage from "common/components/error.vue"

// User
import UserIndex from "main/components/user/index.vue"
import UserShow from "main/components/user/show.vue"
import UserEdit from "main/components/user/edit.vue"

// Qusetion
import QuestionIndex from "main/components/question/index.vue"
import QuestionShow from "main/components/question/show.vue"
import QuestionEdit from "main/components/question/edit.vue"
import QuestionNew from "main/components/question/new.vue"

const routes = [
  { path: '/', name: 'main', component: Main, meta: { title: 'Main' } },
  { path: '/login', name: 'login', component: Login, meta: { title: 'Login' } },
  { path: '/signup', name: 'signup', component: Signup, meta: { title: 'Signup' } },

  // 404
  // { path: '/:pathMatch(.*)*', name: 'Error', component: ErrorPage },

  // User
  { path: '/users/', name: 'user_index', component: UserIndex, meta: { title: 'User list' } },
  { path: '/users/:id/', name: 'user_show', component: UserShow, meta: { title: 'User show' } },
  { path: '/users/:id/edit/', name: 'user_edit', component: UserEdit, meta: { title: 'User edit' } },

  // Question
  { path: '/questions/', name: 'question_index', component: QuestionIndex, meta: { title: 'Question list' }, query: { page: 1 } },
  { path: '/questions/new/', name: 'question_new', component: QuestionNew, meta: { title: 'Question new' } },
  { path: '/questions/:id/', name: 'question_show', component: QuestionShow, meta: { title: 'Question show' } },
  { path: '/questions/:id/edit/', name: 'question_edit', component: QuestionEdit, meta: { title: 'Question edit' } },
]

export const router = new VueRouter({
  routes,
})