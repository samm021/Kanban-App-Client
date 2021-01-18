<template>
    <div class="content">
        <list 
        :tasks="backlogTasks"
        :state="state[0]"
        @regetTasksBacklog="regetTasks"
        @regetTaskPut="regetTaskPut"></list>
        <list 
        :tasks="todoTasks"
        :state="state[1]"
        @regetTasksTodo="regetTasks"
        @regetTaskPut="regetTaskPut"></list>
        <list 
        :tasks="doingTasks"
        :state="state[2]"
        @regetTasksDoing="regetTasks"
        @regetTaskPut="regetTaskPut"></list>
        <list 
        :tasks="doneTasks"
        :state="state[3]"
        @regetTasksDone="regetTasks"
        @regetTaskPut="regetTaskPut"></list>
    </div>
</template>

<script>
import List from './List.vue'
// import ListBacklog from './ListBacklog.vue';
// import ListDoing from './ListDoing.vue';
// import ListDone from './ListDone.vue';
// import ListTodo from './ListTodo.vue';
export default {
    name: 'Content',
    data() {
        return {
            backlogTasks: '',
            todoTasks: '',
            doingTasks: '',
            doneTasks: '',
            state: ['backlog', 'todo', 'doing', 'done']
        }
    },
    methods: {
        regetTasks() {
            this.$emit('regetTasks')
        },
        regetTaskPut() {
            this.$emit('regetTaskPut')
        },
    },
    components: {
        List
        // ListBacklog,
        // ListTodo,
        // ListDoing,
        // ListDone
    },
    props: ['tasks'],
    watch: {
        tasks() {
            this.backlogTasks = this.tasks.filter(task => task.category == 'backlog').reverse();
            this.todoTasks = this.tasks.filter(task => task.category == 'todo').reverse();
            this.doingTasks = this.tasks.filter(task => task.category == 'doing').reverse();
            this.doneTasks = this.tasks.filter(task => task.category == 'done').reverse();
        }
    }
}
</script>

<style>

</style>