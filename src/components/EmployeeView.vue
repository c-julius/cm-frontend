<template>
  <!-- Main section for employee details -->
  <section class="py-5 overflow-hidden">
    <div class="container-fluid">
      <div class="row pt-4 px-5">
        <h2>Employee Details</h2>
        <!-- Loading state -->
        <div
          v-if="loading"
          class="text-center"
        >
          Loading...
        </div>
        <!-- Error state with retry -->
        <div
          v-else-if="error"
          class="text-danger text-center"
        >
          Error: {{ error }}
          <div class="mt-2">
            <button
              class="btn btn-secondary"
              @click="fetchEmployee"
            >
              Retry
            </button>
          </div>
        </div>
        <!-- Employee details card -->
        <div
          v-else-if="employee"
          class="card p-4"
        >
          <h3>{{ employee.first_name }} {{ employee.last_name }}</h3>
          <p><strong>Email:</strong> {{ employee.email }}</p>
          <p><strong>Address:</strong> {{ employee.address }}</p>
          <p>
            <strong>Company: </strong>
            <router-link :to="`/companies/${employee.company.id}`">
              {{ employee.company.name }}
            </router-link>
          </p>
          <div class="mt-3">
            <!-- Edit Employee button -->
            <router-link
              :to="`/employees/${employee.id}/edit`"
              class="btn btn-primary me-2"
            >
              Edit Employee
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// Import API utility
import api from '../api';

export default {
  name: 'EmployeeView',
  data() {
    return {
      employee: null, // Holds employee data
      loading: true,  // Loading state
      error: null,    // Error message
    };
  },
  async created() {
    await this.fetchEmployee();
  },
  methods: {
    // Fetch employee details from API
    async fetchEmployee() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get(`/employees/${this.$route.params.id}`);
        this.employee = response.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Unknown error';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
</style>
