import VueRouter from "vue-router"
import Main from "main/components/Main.vue"
import Login from "main/components/Login.vue"
import Signup from "main/components/Signup.vue"
import UsersList from "main/components/UsersList.vue"
import User from "main/components/User.vue"
import Edit from "main/components/Edit.vue"

const routes = [
  { path: '/', name: 'main', component: Main },
  { path: '/login', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/userslist', name: 'userslist', component: UsersList },
  { path: '/user/:id', name: 'user', component: User },
  { path: '/user/:id/edit', name: 'edit', component: Edit }

  // Впоследствии переделать маршруты так
  // { path: '/users/', name: 'users', component: UserMain, children: [
  //   { path: '/list', name: 'userslist', component: UsersSearch },
  //   { path: ':id', name: 'user', component: UsersShow, children: [
  //     { path: '/edit', name: 'useredit', component: UsersEdit }
  //   ]},
  // ]}
  // Мож так переписать?
  // compoenents
  // - Edit
  // - Show
  // - Index
]

export const router = new VueRouter({
  routes,
})