import VueRouter from "vue-router"
import Main from "main/components/Main.vue"
import Login from "main/components/Login.vue"
import Signup from "main/components/Signup.vue"

// User
import UserIndex from "main/components/user/index.vue"
import UserShow from "main/components/user/show.vue"
import UserEdit from "main/components/user/edit.vue"

// Qusetion
import QuestionIndex from "main/components/question/index.vue"
import QuestionShow from "main/components/question/show.vue"
import QuestionEdit from "main/components/question/edit.vue"

const routes = [
  { path: '/', name: 'main', component: Main },
  { path: '/login', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: Signup },

  // User
  { path: '/users/', name: 'user_index', component: UserIndex },
  { path: '/users/:id/', name: 'user_show', component: UserShow },
  { path: '/users/:id/edit/', name: 'user_edit', component: UserEdit },

  // Question
  { path: '/questions/', name: 'question_index', component: QuestionIndex },
  { path: '/questions/:id/', name: 'question_show', component: QuestionShow },
  { path: '/questions/:id/edit/', name: 'question_edit', component: QuestionEdit },
]

export const router = new VueRouter({
  routes,
})