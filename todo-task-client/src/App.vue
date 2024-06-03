<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<!-- src/components/TaskList.vue -->
<template>
  <div>
    <h1>Todo List</h1>
    <input v-model="newTaskTitle" @keyup.enter="addTask" placeholder="Add a new task"/>
    <ul>
      <li v-for="task in tasks" :key="task._id">
        <span :style="{ textDecoration: task.completed ? 'line-through' : 'none' }">{{ task.title }}</span>
        <button @click="toggleComplete(task)">{{ task.completed ? 'Undo' : 'Complete' }}</button>
        <button @click="removeTask(task._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

export default {
  data() {
    return {
      tasks: [],
      newTaskTitle: ''
    };
  },
  async created() {
    this.tasks = (await getTasks()).data;
  },
  methods: {
    async addTask() {
      const newTask = { title: this.newTaskTitle, completed: false };
      const response = await createTask(newTask);
      this.tasks.push(response.data);
      this.newTaskTitle = '';
    },
    async toggleComplete(task) {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(task._id, updatedTask);
      task.completed = !task.completed;
    },
    async removeTask(id) {
      await deleteTask(id);
      this.tasks = this.tasks.filter(task => task._id !== id);
    }
  }
};
</script>
