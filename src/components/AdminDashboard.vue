<template>
  <!-- Main section for admin dashboard -->
  <section class="py-5 overflow-hidden">
    <div class="container-fluid">
      <div class="row pt-4 px-5">
        <!-- Error state with retry -->
        <div
          v-if="error"
          class="col-12 mb-4"
        >
          <div class="alert alert-danger text-center">
            <div>Error: {{ error }}</div>
            <button
              class="btn btn-secondary mt-2"
              @click="fetchCounts"
            >
              Retry
            </button>
          </div>
        </div>
        <!-- Companies count card -->
        <div
          v-else
          class="col-12 col-md-6 mb-4"
        >
          <div class="card text-center shadow-sm">
            <div class="card-body">
              <h5 class="card-title">
                <router-link to="/companies">
                  Total Companies
                </router-link>
              </h5>
              <div
                class="display-4 fw-bold"
                :class="{ 'text-primary': companiesCount !== null }"
              >
                <span v-if="companiesCount !== null">{{ companiesCount }}</span>
                <span v-else>Loading...</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Employees count card -->
        <div
          v-if="!error"
          class="col-12 col-md-6 mb-4"
        >
          <div class="card text-center shadow-sm">
            <div class="card-body">
              <h5 class="card-title">
                <router-link to="/employees">
                  Total Employees
                </router-link>
              </h5>
              <div
                class="display-4 fw-bold"
                :class="{ 'text-success': employeesCount !== null }"
              >
                <span v-if="employeesCount !== null">{{ employeesCount }}</span>
                <span v-else>Loading...</span>
              </div>
            </div>
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
  name: 'AdminDashboard',
  data() {
    return {
      companiesCount: null, // Total companies
      employeesCount: null, // Total employees
      error: null, // Error message
    };
  },
  // Fetch counts on component creation
  async created() {
    await this.fetchCounts();
  },
  methods: {
    // Fetch counts for companies and employees
    async fetchCounts() {
      this.error = null;
      this.companiesCount = null;
      this.employeesCount = null;
      try {
        const [companiesRes, employeesRes] = await Promise.all([
          api.get('/companies/count'),
          api.get('/employees/count'),
        ]);
        this.companiesCount = companiesRes.data.count;
        this.employeesCount = employeesRes.data.count;
      } catch (e) {
        this.error = e.response?.data?.message || e.message || 'Unknown error';
        this.companiesCount = '—';
        this.employeesCount = '—';
      }
    },
  },
};
</script>

<style scoped>
.card-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
.display-4 {
  font-size: 2.5rem;
  margin-top: 0.5rem;
}
</style>