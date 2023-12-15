<template>
  <div :style="formStyle"> 
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
  computed: {
    formStyle() {
      return {
        backgroundColor: this.email.length > 0 && this.password.length > 0 ? '#049343' : '#1E2029'
      };
    }
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
  