<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="nav-header d-flex w-100 justify-content-between">
          <h4>看KAN板BAN</h4>
          <button class="nav-btn btn btn-warning my-2 my-sm-0" @click="logout">Logout</button>
        </div>
    </nav>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
  name: 'Navbar',
  methods: {
    logout() {
      localStorage.clear();
      this.googleLogout();
      this.$emit('logout');
    },
    googleLogout() {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut()
    }
  }
}
</script>

<style>

</style>