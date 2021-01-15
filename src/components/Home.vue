<template>
    <div>
      <navbar 
      @logout="logout"></navbar>
      <Content 
      :tasks="tasks"
      @regetTasks="regetTasks"
      @regetTaskPut="regetTaskPut"></Content>
    </div>
</template>

<script>
import Content from './Content.vue'
import Navbar from './Navbar.vue'
export default {
    name: 'Home',
    components: {
        Navbar,
        Content
    },
    props: ['tasks'],
    methods: {
      logout() {
        this.$emit('logout', 'login');
      },
      regetTasks() {
        this.$emit('regetTasks');
      },
      regetTaskPut() {
          this.$emit('regetTaskPut')
      },
    }
}
</script>

<style>

</style>