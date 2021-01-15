<template>
        <div class="board">
        <div class="list-group">
            <a href="#" class="todo-header list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">To Do</h4>
                <span class="btn-body">
                    <span class="btn" data-toggle="collapse" href="#collapseAddTodo" role="button" aria-expanded="false" aria-controls="collapseAdd">
                    <i class="fa fa-plus align-self-center" aria-hidden="true"></i>
                    </span>
                </span>
                </div>
            </a>
            <div href="#" id="collapseAddTodo" class="collapse list-group-item list-group-item-action flex-column align-items-start">

                <form @submit.prevent="addTodo" class="flex-row align-items-end">
                <div class="form-group">
                    <input type="text" v-model="todoTitle" class="form-control" placeholder="task">
                </div>
                <div class="form-group">
                    <input type="text" v-model="todoDetail" class="form-control" placeholder="task detail">
                </div>
                <div class="form-group">
                    <input class="form-control" v-model="todoDate" type="date">
                </div>
                

                <div class="d-flex w-100 justify-content-between">
                <button class="nav-btn btn btn-outline-primary my-2 my-sm-0" type="submit">Submit Task</button>
                <button @click="cancel" class="nav-btn btn btn-outline-danger my-2 my-sm-0" data-toggle="collapse" href="#collapseAddTodo" role="button" aria-expanded="false" aria-controls="collapseAdd">Cancel</button>
                
                </div>
                </form>
            </div>

            <div class="scroll-area-sm">
                <div class="ps-show-limits">
                    <div style="position: static;" class="ps ps--active-y">
                        <div class="ps-content">
                            <card
                            v-for="task in tasks"
                            :key="task.id"
                            :task="task"
                            @regetTaskPut="regetTaskPut"></card>
                        </div>
                    </div>
                </div>
            </div>
        </div>

</template>

<script>
import Card from './Card.vue';
import axios from 'axios';
export default {
    name: 'ListTodo',
    data() {
        return {
            todoTitle: '',
            todoDetail: '',
            todoDate: '' 
        }
    },
    methods: {
        regetTaskPut() {
            this.$emit('regetTaskPut')
        },
        async addTodo() {
            console.log(this.todoDate);
            try {
                console.log(this.todoDate);
                await axios({
                    method: 'POST',
                    url: `http://localhost:3000/tasks`,
                    data: {
                        title: this.todoTitle,
                        detail: this.todoDetail,
                        due_date: this.todoDate,
                        category: 'todo'
                    },
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                this.todoTitle = '';
                this.todoDetail = '';
                this.todoDate = '';
                this.$emit('regetTasksTodo');
            }
            catch(err) {
                console.log(err)
            }
        },
        cancel() {
            this.todoTitle = '';
            this.todoDetail = '';
            this.todoDate = '';
        }
    },
    components: {
        Card
    },
    props: ['tasks']
}
</script>

<style>

</style>