<template>
  <div>
      <login-form 
        v-if="page==='login'"
        v-on:goLogin="changePage"
        v-on:reGetTasks="getTasks"></login-form>
      <register-form 
        v-if="page==='register'"
        v-on:goRegister="changePage"
        v-on:cancel="changePage"></register-form>
        <home
       v-if="page==='home'" 
       :tasks="tasks"
       v-on:logout="changePage"
       v-on:regetTasks="getTasks"
       v-on:regetTaskPut="getTasks"></home>
  </div>
</template>

<script>
import Home from './components/Home.vue';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import axios from 'axios';
export default {
    name: "App",
    data() {
        return {
            page: '',
            tasks: '',
        }
    },
    components: {
        LoginForm,
        RegisterForm,
        Home
    },
    methods: {
        changePage(page) {
            this.page = page;
        },
        checkAuth() {
            if (localStorage.getItem('access_token')) {
                this.page = 'home';
                this.getTasks();
            } else {
                this.page = 'login';
            }
        },
        async getTasks() {
            try {
                let tasks = await axios({
                    method: 'GET',
                    url: `http://localhost:3000/tasks`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                });
                this.tasks = tasks.data;
            } catch (err) {
                console.log(err.response);
            }
        }

    },
    created() {
        this.checkAuth();
    }
}
</script>

<style>

</style>