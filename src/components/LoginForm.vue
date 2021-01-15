<template>
    <div class="container h-100">
        <div class="d-flex justify-content-center h-100">
            <div class="user_card">
                <div class="text-center intro"> <img
                    src="https://cdn1.iconfinder.com/data/icons/project-management-color-line-vol-1/512/KANBAN-512.png"
                    width="160"></div>
                <div class="text-center intro">
                <h3>看KAN板BAN</h3>
                </div>
                <div class="d-flex justify-content-center form_container">
                <form @submit.prevent="loginPost">
                    <div class="input-group mb-3">
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                    </div>
                    <input type="text" v-model="loginEmail" class="form-control" value="" placeholder="email">
                    </div>
                    <div class="input-group mb-2">
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                    </div>
                    <input type="password" v-model="loginPassword" class="form-control" value="" placeholder="password">
                    </div>
                    <div class="form-group">
                    </div>
                    <div class="d-flex justify-content-center mt-3 login_container">
                    <button type="submit" name="button" class="btn custom-btn form-control">Login</button>
                    </div>
                </form>
                </div>
                <div class="mt-4">
                <div class="d-flex justify-content-center">
                    Don't have an account? <a @click.prevent="toRegister" href="#" class="ml-2">Sign Up</a>
                </div>
                <div class="d-flex justify-content-center">
                    <div class="g-sign">
                    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import axios from 'axios';
export default {
    name: 'LoginForm',
    data() {
        return {
            loginEmail: '',
            loginPassword: '',
            params: {
                client_id: '141969560150-700va3sn4kqbei7md0j63pak4hpk4uhh.apps.googleusercontent.com'
            },
            renderParams: {
                width: 250,
                height: 50,
                longtitle:true
            }
        }
    },
    components: {
        GoogleLogin
    },
    methods: {
        async loginPost() {
            try {
                const user = await axios.post(`https://kanban-server-samm021.herokuapp.com/login`, {
                    email: this.loginEmail,
                    password: this.loginPassword
                });
                this.loginEmail = '';
                this.loginPassword = '';
                localStorage.setItem('access_token', user.data.access_token);
                this.$emit('goLogin', 'home');
                this.$emit('reGetTasks')
            } 
            catch (err) {
                this.$swal({
                    icon: 'warning',
                    text: err.response.data.message,
                });
            }
        },
        toRegister() {
            this.$emit('goLogin', 'register')
        },
        async onSuccess(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token;
            try {
                const user = await axios({
                    method: 'POST',
                    url: 'https://kanban-server-samm021.herokuapp.com/google',
                    data: {
                        id_token: googleUser.getAuthResponse().id_token
                    }
                })
                localStorage.setItem('access_token', user.data.access_token);
                this.$emit('goLogin', 'home');
                this.$emit('reGetTasks');
            } 
            catch (err) {
                this.$swal({
                    icon: 'warning',
                    text: err.response.data.message,
                });
            }
        }
    }
}
</script>

<style>

</style>