<template>
    <div class="board">
        <div class="list-group">
            <a href="#" class="doing-header list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">Doing</h4>
                <span class="btn-body">
                    <span class="btn" data-toggle="collapse" href="#collapseAddDoing" role="button" aria-expanded="false" aria-controls="collapseAdd">
                    <i class="fa fa-plus align-self-center" aria-hidden="true"></i>
                    </span>
                </span>
                </div>
            </a>
            <div href="#" id="collapseAddDoing" class="collapse list-group-item list-group-item-action flex-column align-items-start">

                <form @submit.prevent="addDoing" class="flex-row align-items-end">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="doingTitle" placeholder="task">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" v-model="doingDetail" placeholder="task detail">
                </div>
                <div class="form-group">
                    <input class="form-control" v-model="doingDate" type="date">
                </div>
                
                <div class="d-flex w-100 justify-content-between">
                <button class="nav-btn btn btn-outline-primary my-2 my-sm-0" type="submit">Submit Task</button>
                <button @click="cancel" class="nav-btn btn btn-outline-danger my-2 my-sm-0" data-toggle="collapse" href="#collapseAddDoing" type="button" aria-expanded="false" aria-controls="collapseAdd">Cancel</button>
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
    name: 'ListDoing',
    components: {
        Card
    },
    data() {
        return {
            doingTitle: '',
            doingDetail: '',
            doingDate: '',
        }
    },
    methods: {
        regetTaskPut() {
            this.$emit('regetTaskPut')
        },
        async addDoing() {
            try {
                await axios({
                    method: 'POST',
                    url: `https://kanban-server-samm021.herokuapp.com/tasks`,
                    data: {
                        title: this.doingTitle,
                        detail: this.doingDetail,
                        due_date: this.doingDate,
                        category: 'doing'
                    },
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                this.doingTitle = '';
                this.doingDetail = '';
                this.doingDate = '';
                this.$emit('regetTasksDoing');
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
            this.doingTitle = '';
            this.doingDetail = '';
            this.doingDate = '';
        }
    },
    props: ['tasks']
}
</script>

<style>

</style>