import Main from "../components/Main.vue"
import Login from "../components/Login.vue"
import Signup from "../components/Signup.vue"
import UsersList from "../components/UsersList.vue"


export const routes = [
  { path: '/', name: 'main', component: Main },
  { path: '/login', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/userslist', name: 'userslist', component: UsersList },
]