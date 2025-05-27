<template>
  <!-- Main section for company details -->
  <section class="py-5 overflow-hidden">
    <div class="container-fluid">
      <div class="row pt-4 px-5">
        <h2>Company Details</h2>
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
              @click="fetchCompany"
            >
              Retry
            </button>
          </div>
        </div>
        <!-- Company details card -->
        <div
          v-else-if="company"
          class="card p-4"
        >
          <h3>{{ company.name }}</h3>
          <p><strong>ABN:</strong> {{ company.abn }}</p>
          <p><strong>Email:</strong> {{ company.email }}</p>
          <p><strong>Address:</strong> {{ company.address }}</p>
          <p><strong>Number of Employees:</strong> {{ company.num_employees }}</p>
          <div class="mt-3">
            <!-- Edit and Add Employee buttons -->
            <router-link
              :to="`/companies/${company.id}/edit`"
              class="btn btn-primary me-2"
            >
              Edit Company
            </router-link>
            <router-link
              :to="{ path: `/employees/add`, query: { companyId: company.id, lockCompany: 1 } }"
              class="btn btn-success"
            >
              Add Employee
            </router-link>
          </div>
          <!-- List of employees for this company -->
          <EmployeeList
            :show-company-column="false"
            :company-id="company.id"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// Import API utility and EmployeeList component
import api from '../api';
import EmployeeList from './EmployeeList.vue';

export default {
  name: 'CompanyView',
  components: { EmployeeList },
  data() {
    return {
      company: null, // Holds company data
      loading: true, // Loading state
      error: null,   // Error message
    };
  },
  async created() {
    await this.fetchCompany();
  },
  methods: {
    // Fetch company details from API
    async fetchCompany() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get(`/companies/${this.$route.params.id}`);
        this.company = response.data;
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
