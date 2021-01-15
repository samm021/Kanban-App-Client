<template>
<div>
    <div
        v-if="side === 'view'"
        href="#"
        class="list-group-item list-group-item-action flex-column align-items-start"
    >
        <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{ showTitle }}</h5>
        <small class="text-muted">by {{ showName }}</small>
        </div>
        <p class="mb-1">{{ showDetail }}</p>
        <div class="d-flex w-100 justify-content-between">
        <small class="text-muted">due {{ showDate }}</small>
        <small class="text-muted">
            <span class="btn-body">
            <span
                id="dropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
                class="dropdown"
            >
                <i class="fa fa-bars" aria-hidden="true"></i>
            </span>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <button role="button" class="btn-sm btn-light dropdown-item" @click="patchTask(categories[0])">move to {{ categories[0] }}</button>
                <button role="button" class="btn-sm btn-light dropdown-item" @click="patchTask(categories[1])">move to {{ categories[1] }}</button>
                <button role="button" class="btn-sm btn-light dropdown-item" @click="patchTask(categories[2])">move to {{ categories[2] }}</button>
            </div>
            </span>
            <span class="btn-body">
            <span @click="getTask" role="button">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            </span>
            </span>
            <span class="btn-body">
            <span @click="deleteTask">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </span>
            </span>
        </small>
        </div>
    </div>
    <div
    v-if="side==='edit'"
    href="#" class="list-group-item list-group-item-action flex-column align-items-start">

    <form @submit.prevent="putTask" class="flex-row align-items-end">
    <div class="form-group">
        <input type="text" class="form-control" v-model="editTitle" >
    </div>
    <div class="form-group">
        <input type="text" class="form-control" v-model="editDetail" >
    </div>
    <div class="form-group">
        <input class="form-control" type="date" v-model="editDueDate" >
    </div>
   

    <div class="d-flex w-100 justify-content-between">
    <button class="nav-btn btn btn-outline-info my-2 my-sm-0" type="submit">Edit Task</button>
    <button @click="changeCard" class="nav-btn btn btn-outline-danger my-2 my-sm-0">Cancel</button>
    </form>
    </div>
</div>

</template>

<script>
import axios from 'axios';
export default {
    name: "Card",
    data() {
        return {
            side: 'view',
            showTitle: '',
            showDetail: '',
            showDate: '',
            showName: '',
            editTitle: '',
            editDetail: '',
            editDueDate: '',
            categories: ['backlog', 'todo', 'doing', 'done']
        }
    },
    methods: {
        changeCard() {
            this.side === 'view' ? this.side = 'edit' : this.side = 'view';
        },
        async getTask() {
            try {
                let getTask = await axios({
                    method: 'GET',
                    url: `https://kanban-server-samm021.herokuapp.com/tasks/${this.task.id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                });
                this.editTitle = getTask.data.title;
                this.editDetail = getTask.data.detail;
                this.editDueDate = this.formatDate(getTask.data.due_date);
                this.changeCard();
            } 
            catch (err) {
                this.$swal({
                    icon: 'warning',
                    text: err.response.data.message,
                });
            }
        },
        async putTask() {
            try {
                await axios({
                    method: 'PUT',
                    url: `https://kanban-server-samm021.herokuapp.com/tasks/${this.task.id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    data: {
                        title: this.editTitle,
                        detail: this.editDetail,
                        due_date: this.editDueDate
                    }
                });
                this.changeCard();
                this.$emit('regetTaskPut');
            } 
            catch (err) {
                err.response.data = Array.isArray(err.response.data) ? err.response.data[0] : err.response.data;
                this.$swal({
                    icon: 'warning',
                    text: err.response.data.message,
                });
            }
        },
        async patchTask(category) {
            try {
                await axios({
                    method: 'PATCH',
                    url: `https://kanban-server-samm021.herokuapp.com/tasks/${this.task.id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    data: {
                        category
                    }
                });
                this.$emit('regetTaskPut');
            } 
            catch (err) {
                this.$swal({
                    icon: 'warning',
                    text: err.response.data.message,
                });
            }
        },
        async deleteTask() {
            try {
                await axios({
                    method: 'DELETE',
                    url: `https://kanban-server-samm021.herokuapp.com/tasks/${this.task.id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                });
                this.$emit('regetTaskPut');
            } 
            catch (err) {
                this.$swal({
                    icon: 'warning',
                    text: err.response.data.message,
                });
            }
        },
        formatDate(date) {
            return date.substring(0, 10)
        }
    },
    props: ['task'],
    created() {
            this.showId = this.task
            this.showTitle =  this.task.title,
            this.showDetail =  this.task.detail,
            this.showDate =  new Date(this.task.due_date.substring(0, 10)).toString().substring(0, 15)
            this.showName = this.task.User.name,
            this.categories = this.categories.filter(category => category !== this.task.category)
    },
    watch: {
        task() {
            this.showTitle =  this.task.title,
            this.showDetail =  this.task.detail,
            this.showDate =  new Date(this.task.due_date.substring(0, 10)).toString().substring(0, 15)
            this.showName = this.task.User.name
        }
    }

};
</script>

<style>
</style>