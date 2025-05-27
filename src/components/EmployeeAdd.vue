<template>
  <!-- Main section for adding an employee -->
  <section class="py-5 overflow-hidden">
    <div class="container-fluid">
      <div class="row pt-4 px-5">
        <h2>Add Employee</h2>
        <!-- Show saving state -->
        <div
          v-if="loading"
          class="text-center"
        >
          Saving...
        </div>
        <!-- Error state with retry if companies not loaded -->
        <div
          v-else-if="error"
          class="text-danger text-center"
        >
          Error: {{ error }}
          <div
            v-if="!companies"
            class="mt-2"
          >
            <button
              class="btn btn-secondary"
              @click="resetForm"
            >
              Retry
            </button>
          </div>
        </div>
        <!-- Employee form for adding -->
        <EmployeeForm
          v-else
          :employee="employee"
          :companies="companies"
          :is-edit="false"
          :cancel-url="cancelUrl"
          :lock-company="!!$route.query.lockCompany"
          @form-submit="addEmployee"
        />
      </div>
    </div>
  </section>
</template>

<script>
// Import API utility, EmployeeForm, and Vuex actions
import api from '../api';
import EmployeeForm from './EmployeeForm.vue';
import { mapActions } from 'vuex';

export default {
  name: 'EmployeeAdd',
  components: { EmployeeForm },
  data() {
    return {
      employee: {
        first_name: '', // New employee first name
        last_name: '',  // New employee last name
        email: '',      // New employee email
        address: '',    // New employee address
        company_id: null, // Selected company
      },
      companies: null,   // List of companies for dropdown
      loading: false,    // Loading state
      error: null,       // Error message
    };
  },
  computed: {
    // Cancel URL for the form
    cancelUrl() {
      return this.$route.query.companyId
        ? `/companies/${this.$route.query.companyId}`
        : '/employees';
    },
  },
  // On component creation, fetch companies
  async created() {
    await this.fetchCompanies();
  },
  methods: {
    ...mapActions(['successMessage', 'errorMessage']),
    // Fetch companies from the API
    async fetchCompanies() {
      try {
        const response = await api.get('/companies');
        this.companies = response.data;
        // If a companyId is provided in the query, pre-select it
        if (this.$route.query.companyId) {
          this.employee.company_id = Number(this.$route.query.companyId);
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Unknown error';
      }
    },
    // Add a new employee
    async addEmployee(employeeData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.post(`/companies/${employeeData.company_id}/employees`, employeeData);
        this.successMessage('Employee added successfully');
        this.$router.push(`/employees/${response.data.id}`);
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Unknown error';
      } finally {
        this.loading = false;
      }
    },
    // Reset the form
    resetForm() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
</style>
