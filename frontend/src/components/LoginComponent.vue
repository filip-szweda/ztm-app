<template>
  <div :style="formStyle">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
  
<script>
import router from '@/router';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  computed: {
    formStyle() {
      return {
        backgroundColor: this.email.length > 0 && this.password.length > 0 ? '#049343' : '#1E2029'
      };
    }
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password
        });
        localStorage.setItem('token', response.data.token);
        router.push('/stops');
        alert('Login successful');
      } catch (error) {
        alert('Login failed: ' + error);
      }
    }
  }
};
</script>
  