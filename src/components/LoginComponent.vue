<template>
    <div class="login-container">
      <h2>Connection</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">nom :</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div>
          <label for="password">Mdp :</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Connecter</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue'
  
  const username = ref('')
  const password = ref('')
  const emit = defineEmits(['login'])
  
  const login = () => {
    // In a real application, you would have authentication logic here
    if ((username.value == "Jade" && password.value == "amoureux") || 
       (username.value == "Marius" && password.value == "amoureux")) {
      emit('login')
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 5rem auto;
    padding: 2rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  </style>