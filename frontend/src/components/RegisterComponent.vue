<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        await this.$axios.post('http://localhost:3000/register', {
          email: this.email,
          password: this.password
        });
        alert('Registration successful');
      } catch (error) {
        alert('Registration failed: ' + error);
      }
    }
  }
};
</script>
  