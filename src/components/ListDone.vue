<template>
      <div class="board">
        <div class="list-group">
            <a href="#" class="done-header list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">Done</h4>
                <span class="btn-body">
                    <span class="btn" data-toggle="collapse" href="#collapseAddDone" role="button" aria-expanded="false" aria-controls="collapseAdd">
                    <i class="fa fa-plus align-self-center" aria-hidden="true"></i>
                    </span>
                </span>
                </div>
            </a>
            <div href="#" id="collapseAddDone" class="collapse list-group-item list-group-item-action flex-column align-items-start">

                <form @submit.prevent="addDone" class="flex-row align-items-end">
                <div class="form-group">
                    <input type="text" v-model="doneTitle" class="form-control" placeholder="task">
                </div>
                <div class="form-group">
                    <input type="text" v-model="doneDetail" class="form-control" placeholder="task detail">
                </div>
                <div class="form-group">
                    <input class="form-control" v-model="doneDate" type="date">
                </div>
                

                <div class="d-flex w-100 justify-content-between">
                <button class="nav-btn btn btn-outline-primary my-2 my-sm-0" type="submit">Submit Task</button>
                <button @click="cancel" class="nav-btn btn btn-outline-danger my-2 my-sm-0" data-toggle="collapse" href="#collapseAddDone" role="button" aria-expanded="false" aria-controls="collapseAdd">Cancel</button>
                
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
    name: 'ListDone',
    data() {
        return {
            doneTitle: '',
            doneDetail: '',
            doneDate: ''
        }
    },
    methods: {
        regetTaskPut() {
            this.$emit('regetTaskPut')
        },
        async addDone() {
            try {
                await axios({
                    method: 'POST',
                    url: `http://localhost:3000/tasks`,
                    data: {
                        title: this.doneTitle,
                        detail: this.doneDetail,
                        due_date: this.doneDate,
                        category: 'done'
                    },
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                this.doneTitle = '';
                this.doneDetail = '';
                this.doneDate = '';
                this.$emit('regetTasksDone');
            }
            catch(err) {
                console.log(err)
            }
        },
        cancel() {
            this.doneTitle = '';
            this.doneDetail = '';
            this.doneDate = '';
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