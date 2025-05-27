<template>
  <!-- Main section for adding a company -->
  <section class="py-5 overflow-hidden">
    <div class="container-fluid">
      <div class="row pt-4 px-5">
        <h2>Add Company</h2>
        <!-- Show saving state -->
        <div
          v-if="loading"
          class="text-center"
        >
          Saving...
        </div>
        <!-- Error state -->
        <div
          v-else-if="error"
          class="text-danger text-center"
        >
          Error: {{ error }}
        </div>
        <!-- Company form for adding -->
        <CompanyForm
          v-else-if="company"
          :company="company"
          :is-edit="false"
          @form-submit="addCompany"
        />
      </div>
    </div>
  </section>
</template>

<script>
// Import API utility, CompanyForm, and Vuex actions
import api from '../api';
import CompanyForm from './CompanyForm.vue';
import { mapActions } from 'vuex';

export default {
  name: 'CompanyAdd',
  components: { CompanyForm },
  data() {
    return {
      company: {
        name: '',    // New company name
        abn: '',     // New company ABN
        email: '',   // New company email
        address: '', // New company address
      },
      loading: false, // Loading state
      error: null,    // Error message
    };
  },
  methods: {
    ...mapActions(['successMessage', 'errorMessage']),
    // Add a new company via API
    async addCompany(companyData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.post('/companies', companyData);
        this.successMessage('Company added successfully');
        this.$router.push(`/companies/${response.data.id}`);
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Unknown error';
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
</style>
