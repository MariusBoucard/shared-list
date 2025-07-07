<template>
  <div id="app">
    <div v-if="!loggedIn">
      <Login @login="handleLogin" />
    </div>
    <div v-else>
      <div class="container">
        <header>
          <h1>Appartements pour avec ma jadou</h1>
          <button @click="logout" class="logout-button">Déco</button>
        </header>
        <AddItemForm @addItem="addNewItem" />
        <hr>
        <div class="item-list">
          <ItemDetails
            v-for="item in items"
            :key="item.id || index"
            :item="item"
            @delete="deleteItem"
            @update="updateItem"  
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axiosInstance from './axios.js' // Import the configured Axios instance
import Login from './components/LoginComponent.vue'
import AddItemForm from './components/AddItemForm.vue'
import ItemDetails from './components/ItemDetails.vue'

export default {
  components: {
    Login,
    AddItemForm,
    ItemDetails
  },
  data() {
    return {
      loggedIn: false,
      username: 'chikita',
      password: 'yolo_du_79',
      token: '',
      items: [],
      nextId: 69 // To generate unique IDs for new items
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axiosInstance.post('/api/login', {
          username: this.username,
          password: this.password,
        });
        this.token = response.data.token;
        this.loggedIn = true;
        this.getList(); // Fetch the item list after successful login
        console.log('Login successful:', response.data);
      } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
      }
    },
    logout() {
      this.loggedIn = false;
      this.token = '';
      this.items = [];
    },
    addNewItem() {
      const newItem = {
        id: this.nextId++,
        title: 'Appart '+ (this.items.length + 1),
        link: '',
        address: 'xx',
        size: 'xx',
        description: '',
        note : 0,
        comments: []
      }
      this.items.push(newItem)
      axiosInstance.post('/api/items', newItem, {
        headers: {
          Authorization: this.token,
        },
      })
      .then(response => {
        console.log('Item added:', response.data);
        newItem.id = response.data.id; // Update the new item with the ID from the server
      })
    },
    async getList() {
      console.log('Fetching items...');
      if (!this.token) {
        console.error('No token available. Please log in first.');
        return;
      }
      try {
        const response = await axiosInstance.get('/api/items', {
          headers: {
            Authorization: this.token,
          },
        });
        this.items = response.data;
        console.log('Items fetched:', this.items);
      } catch (error) {
        console.error('Failed to fetch items:', error.response?.data || error.message);
      }
    },
    updateItem(payload) {
      const itemToUpdate = this.items.find(item => item.id === payload.id)
      if (itemToUpdate) {
        itemToUpdate[payload.field] = payload.value
      //  this.$set(itemToUpdate, payload.field, payload.value)
      }

      console.log('Updating item:', payload);
      axiosInstance.put(`/api/items/${payload.id}`, {
        [payload.field]: payload.value
      }, {
        headers: {
          Authorization: this.token,
        },
      })
    },
    deleteItem(itemId) {
      if (!itemId || isNaN(itemId)) {
    console.error('Invalid itemId:', itemId);
    return;
  }

      console.log('Deleting item with ID:', itemId);
      this.items = this.items.filter(item => item.id !== itemId)
      console.log(itemId)
      axiosInstance.delete(`/api/items/${itemId}`, {
        headers: {
          Authorization: this.token,
        },
      })
      .then(response => {
        console.log('Item deleted:', response.data);
      })

    }
  }
}
</script>
<style>
/* Your global styles remain the same */
body {
  font-family: sans-serif;
  background-color: #f4f4f4;
  color: #333;
}

#app {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.container {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.logout-button {
  padding: 0.5rem 1rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.item-list {
  margin-top: 1rem;
}
</style>