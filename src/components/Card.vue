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
    components: {
        
    },
    methods: {
        changeCard() {
            this.side === 'view' ? this.side = 'edit' : this.side = 'view';
        },
        async getTask() {
            try {
                let getTask = await axios({
                    method: 'GET',
                    url: `http://localhost:3000/tasks/${this.task.id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                });
                this.editTitle = getTask.data.title;
                this.editDetail = getTask.data.detail;
                this.editDueDate = this.formatDate(getTask.data.due_date);
                this.changeCard();
            } catch (err) {
                console.log(err)
            }
        },
        async putTask() {
            try {
                await axios({
                    method: 'PUT',
                    url: `http://localhost:3000/tasks/${this.task.id}`,
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
            } catch (err) {
                console.log(err.response)
            }
        },
        async patchTask(category) {
            try {
                await axios({
                    method: 'PATCH',
                    url: `http://localhost:3000/tasks/${this.task.id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    data: {
                        category
                    }
                });
                this.$emit('regetTaskPut');
            } catch (err) {
                console.log(err.response)
            }
        },
        async deleteTask() {
            try {
                const task = await axios({
                    method: 'DELETE',
                    url: `http://localhost:3000/tasks/${this.task.id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                });
                this.$emit('regetTaskPut');
            } catch (err) {
                console.log(err.response)
            }
        },
        formatDate(date) {
            return date.substring(0, 10)
        }
    },
    props: ['task'],
    created() {
            this.showTitle =  this.task.title,
            this.showDetail =  this.task.detail,
            this.showDate =  this.task.due_date,
            this.showName = this.task.User.name,
            this.categories = this.categories.filter(category => category !== this.task.category)
    },
    watch: {
        task() {
            this.showTitle =  this.task.title,
            this.showDetail =  this.task.detail,
            this.showDate =  this.task.due_date,
            this.showName = this.task.User.name
        }
    }

};
</script>

<style>
</style>