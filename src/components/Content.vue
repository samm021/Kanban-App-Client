<template>
    <div class="content">
        <list-backlog 
        :tasks="backlogTasks"
        @regetTasksBacklog="regetTasks"
        @regetTaskPut="regetTaskPut"></list-backlog>
        <list-todo 
        :tasks="todoTasks"
        @regetTasksTodo="regetTasks"
        @regetTaskPut="regetTaskPut"></list-todo>
        <list-doing 
        :tasks="doingTasks"
        @regetTasksDoing="regetTasks"
        @regetTaskPut="regetTaskPut"></list-doing>
        <list-done 
        :tasks="doneTasks"
        @regetTasksDone="regetTasks"
        @regetTaskPut="regetTaskPut"></list-done>
    </div>
</template>

<script>
import ListBacklog from './ListBacklog.vue';
import ListDoing from './ListDoing.vue';
import ListDone from './ListDone.vue';
import ListTodo from './ListTodo.vue';
export default {
    name: 'Content',
    data() {
        return {
            backlogTasks: '',
            todoTasks: '',
            doingTasks: '',
            doneTasks: ''
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
        ListBacklog,
        ListTodo,
        ListDoing,
        ListDone
    },
    props: ['tasks'],

    watch: {
        tasks() {
            this.backlogTasks = this.tasks.filter(task => task.category == 'backlog');
            this.todoTasks = this.tasks.filter(task => task.category == 'todo');
            this.doingTasks = this.tasks.filter(task => task.category == 'doing');
            this.doneTasks = this.tasks.filter(task => task.category == 'done');
        }
    }
}
</script>

<style>

</style>