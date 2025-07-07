<template>
    <div class="item-card">
      <div class="item-fields">
        <div class="field">
          <label>Nom :</label>
          <input :value="item.title" @input="emitUpdate('title', $event.target.value)">
        </div>
        <div class="field">
          <label>Lien :</label>
          <input :value="item.link" @input="emitUpdate('link', $event.target.value)">
        </div>
        <div class="field">
          <label>Addresse :</label>
          <input :value="item.address" @input="emitUpdate('address', $event.target.value)">
        </div>
        <div class="field">
          <label>Taille :</label>
          <input :value="item.size" @input="emitUpdate('size', $event.target.value)">
        </div>
        <div class="field">
          <label>Description :</label>
          <textarea :value="item.description" @input="emitUpdate('description', $event.target.value)"></textarea>
        </div>
        <div class="field">
          <label>Note :</label>
          <input type="number" :value="item.note" @input="emitUpdate('note', $event.target.value)" min="0" max="5">

        </div>
      
        </div>
        
      <div class="comments-section">
        <h3>Avis</h3>
        <ul>
          <li v-for="(comment, index) in item.comments" :key="index">
            {{ comment }}
          </li>
        </ul>
        <div class="add-comment">
          <input v-model="newComment" @keyup.enter="addComment" placeholder="Un commentaire ?">
          <button @click="addComment">+</button>
        </div>
      </div>
  
      <button @click="deleteItem" class="delete-button">Delete Item</button>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    item: Object
  })
  
  // Define all the events this component can emit
  const emit = defineEmits(['delete', 'update'])
  
  const newComment = ref('')
  
  // Emits a structured update event to the parent
  const emitUpdate = (field, value) => {
    emit('update', { id: props.item.id, field, value })
  }
  
  const addComment = () => {
    if (newComment.value.trim()) {
      // Also emit an event for adding a comment
      const updatedComments = [...props.item.comments, newComment.value.trim()]
      emit('update', { id: props.item.id, field: 'comments', value: updatedComments })
      newComment.value = ''
    }
  }
  
  const deleteItem = () => {
    emit('delete', props.item.id)
  }
  </script>
  
  <style scoped>
  /* Your styles remain the same */
  .item-card {
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .item-fields .field {
    margin-bottom: 1rem;
  }
  
  .item-fields label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .item-fields input,
  .item-fields textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .comments-section {
    margin-top: 1.5rem;
  }
  
  .add-comment {
    display: flex;
    margin-top: 0.5rem;
  }
  
  .add-comment input {
    flex-grow: 1;
    border-right: none;
  }
  
  .delete-button {
    margin-top: 1rem;
    background-color: #e53935;
    color: white;
    border: none;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 4px;
  }
  </style>