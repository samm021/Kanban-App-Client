<template>
    <div class="board">
        <div class="list-group">
            <a href="#" :class="`${state}-header`" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">{{header}}</h4>
                <span class="btn-body">
                    <span class="btn" data-toggle="collapse" :href="`#collapseAdd${state}`" role="button" aria-expanded="false" :aria-controls="`collapseAdd${state}`">
                    <i class="fa fa-plus align-self-center" aria-hidden="true"></i>
                    </span>
                </span>
                </div>
            </a>
            <div href="#" :id="`collapseAdd${state}`" class="collapse list-group-item list-group-item-action flex-column align-items-start">

                <form @submit.prevent="add" class="flex-row align-items-end">
                <div class="form-group">
                    <input type="text" v-model="addTitle" class="form-control" placeholder="task">
                </div>
                <div class="form-group">
                    <input type="text" v-model="addDetail" class="form-control" placeholder="task detail">
                </div>
                <div class="form-group">
                    <input class="form-control" v-model="addDate" type="date">
                </div>
                <div class="d-flex w-100 justify-content-between">
                    <button class="nav-btn btn btn-outline-primary my-2 my-sm-0" type="submit">Submit Task</button>
                    <button @click="cancel" class="nav-btn btn btn-outline-danger my-2 my-sm-0" data-toggle="collapse" :href="`#collapseAdd${state}`" type="button" aria-expanded="false" :aria-controls="`collapseAdd${state}`">Cancel</button>
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
    name: 'List',
    data() {
        return {
            addTitle: '',
            addDetail: '',
            addDate: '',
            header: ''
        }
    },
    methods: {
        regetTaskPut() {
            this.$emit('regetTaskPut')
        },
        async add() {
            try {
                await axios({
                    method: 'POST',
                    url: `https://kanban-server-samm021.herokuapp.com/tasks`,
                    data: {
                        title: this.addTitle,
                        detail: this.addDetail,
                        due_date: this.addDate,
                        category: this.state
                    },
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                this.addTitle = '';
                this.addDetail = '';
                this.addDate = '';
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
        cancel() {
            this.addTitle = '';
            this.addDetail = '';
            this.addDate = '';
        }
    },
    components: {
        Card
    },
    props: ['tasks', 'state'],
    created() {
        this.header = this.state.charAt(0).toUpperCase() + this.state.slice(1);
    }
}
</script>

<style>

</style>