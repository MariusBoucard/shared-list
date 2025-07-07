<template>
    <div>
      <button @click="addItem" class="add-item-button">Ajouter un appart</button>
    </div>
  </template>
  
  <script setup>
  import { defineEmits } from 'vue'
  
  const emit = defineEmits(['addItem'])
  
  const addItem = () => {
    emit('addItem')
  }
  </script>
  
  <style scoped>
  .add-item-button {
    padding: 0.75rem 1.5rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }
  </style>