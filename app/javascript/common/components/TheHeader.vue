<template>
  <header class="header">
    <div class="container">
      <div class="header-inner">

        <nav class="navbar navbar-expand-sm bg-light navbar-light">
          <div class="container-fluid">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link" to="/">Main</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="login">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="signup">Signup</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="userslist">Users List</router-link>
              </li>
            </ul>
          </div>
        </nav>

      </div>
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style>

</style>