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
                <form @submit.prevent="registerPost">
                    <div class="input-group mb-3">
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="fa fa-envelope"></i></span>
                    </div>
                    <input type="email" v-model="registerEmail" class="form-control" value="" placeholder="email">
                    </div>
                    <div class="input-group mb-3">
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="fa fa-user"></i></span>
                    </div>
                    <input type="text" v-model="registerName" class="form-control" value="" placeholder="name">
                    </div>
                    <div class="input-group mb-3">
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="fa fa-key"></i></span>
                    </div>
                    <input type="password" v-model="registerPassword" class="form-control" value="" placeholder="password">
                    </div>
                    <div class="form-group">
                    </div>
                    <div class="d-flex justify-content-center mt-3 login_container">
                    <button type="submit" name="button" class="btn custom-btn form-control">Register</button>
                    </div>
                    <div class="d-flex justify-content-center mt-3 login_container">
                    <button type="submit" @click.prevent="cancel" name="button" class="btn btn-danger form-control">Cancel
                    </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'RegisterForm',
    data() {
        return {
            registerEmail: '',
            registerName: '',
            registerPassword: '',
        }
    },
    methods: {
        async registerPost() {
            try {
                await axios.post(`http://localhost:3000/register`, {
                    email: this.registerEmail,
                    name: this.registerName,
                    password: this.registerPassword
                });
                this.registerEmail = '';
                this.registerName = '';
                this.registerPassword = '';
                this.$emit('goRegister', 'login');
            } catch (err) {
                console.log(err);
            }
        },
        cancel() {
            this.$emit('cancel', 'login');
        }
    }
}
</script>

<style>

</style>