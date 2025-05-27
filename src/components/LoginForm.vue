<template>
  <!-- Login form for user authentication -->
  <section
    id="login-form"
    class="py-5"
  >
    <div class="container-sm">
      <div class="row justify-content-center">
        <div class="col-lg-4 p-5 border shadow-sm">
          <h5 class="text-uppercase mb-4">
            Login
          </h5>
          <!-- Form submission handled by submitForm method -->
          <form
            class="form-group flex-wrap"
            @submit.prevent="submitForm"
          >
            <div class="col-12 pb-3">
              <label>Email address *</label>
              <!-- Two-way binding for email input -->
              <input
                v-model="email"
                type="email"
                class="form-control"
                required
              >
            </div>
            <div class="col-12 pb-3">
              <label>Password *</label>
              <!-- Two-way binding for password input -->
              <input
                v-model="password"
                type="password"
                class="form-control"
                required
              >
            </div>
            <div class="col-12">
              <button
                type="submit"
                class="btn btn-primary text-uppercase w-100"
              >
                Log in
              </button>
            </div>
            <!-- Display error message if login fails -->
            <div
              v-if="error"
              class="col-12 pt-3 text-danger"
            >
              {{ error }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
  
<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '', // User email input
      password: '', // User password input
      error: '' // Error message for failed login
    };
  },
  methods: {
    ...mapActions(['login']),
    // Handles form submission and login logic
    async submitForm() {
      this.error = '';
      const success = await this.login({ email: this.email, password: this.password });
      if (success) {
        // Redirect to dashboard on successful login
        this.$router.push({ name: 'AdminDashboard' });
      } else {
        // Show error message on failure
        this.error = 'Invalid email or password.';
      }
    }
  }
};
</script>
  
<style scoped>
</style>