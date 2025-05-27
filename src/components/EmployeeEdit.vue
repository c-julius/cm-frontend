<template>
  <!-- Main section for editing an employee -->
  <section class="py-5 overflow-hidden">
    <div class="container-fluid">
      <div class="row pt-4 px-5">
        <h2>Edit Employee</h2>
        <!-- Loading state -->
        <div
          v-if="loading"
          class="text-center"
        >
          Loading...
        </div>
        <!-- Error state with retry if employee not loaded -->
        <div
          v-else-if="error"
          class="text-danger text-center"
        >
          Error: {{ error }}
          <div
            v-if="!employee"
            class="mt-2"
          >
            <button
              class="btn btn-secondary"
              @click="fetchEmployee"
            >
              Retry
            </button>
          </div>
        </div>
        <!-- Employee form for editing -->
        <EmployeeForm
          v-if="employee && companies"
          :employee="employee"
          :companies="companies"
          :is-edit="true"
          :cancel-url="`/employees/${employee.id}`"
          @form-submit="updateEmployee"
        />
      </div>
    </div>
  </section>
</template>

<script>
// Import API utility, Vuex actions, and EmployeeForm
import api from '../api';
import { mapActions } from 'vuex';
import EmployeeForm from './EmployeeForm.vue';

export default {
  name: 'EmployeeEdit',
  components: { EmployeeForm },
  data() {
    return {
      employee: null,   // Holds employee data
      companies: null,  // List of companies for dropdown
      loading: true,    // Loading state
      error: null,      // Error message
    };
  },
  // Fetch employee data on component creation
  async created() {
    await this.fetchEmployee();
  },
  methods: {
    ...mapActions(['successMessage', 'errorMessage']),
    // Fetch employee and company data for editing
    async fetchEmployee() {
      this.loading = true;
      this.error = null;
      try {
        const [empRes, compRes] = await Promise.all([
          api.get(`/employees/${this.$route.params.id}`),
          api.get('/companies'),
        ]);
        this.employee = empRes.data;
        this.employee.company_id = this.employee.company?.id || null;
        this.companies = compRes.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Unknown error';
      } finally {
        this.loading = false;
      }
    },
    // Update employee data
    async updateEmployee(employeeData) {
      this.loading = true;
      this.error = null;
      try {
        await api.put(`/employees/${this.employee.id}`, employeeData);
        this.successMessage('Employee updated successfully');
        this.$router.push(`/employees/${this.employee.id}`);
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
