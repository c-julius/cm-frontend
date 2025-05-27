<template>
  <!-- Main section for editing a company -->
  <section class="py-5 overflow-hidden">
    <div class="container-fluid">
      <div class="row pt-4 px-5">
        <h2>Edit Company</h2>
        <!-- Loading state -->
        <div
          v-if="loading"
          class="text-center"
        >
          Loading...
        </div>
        <!-- Error state with retry if company not loaded -->
        <div
          v-else-if="error"
          class="text-danger text-center"
        >
          Error: {{ error }}
          <div
            v-if="!company"
            class="mt-2"
          >
            <button
              class="btn btn-secondary"
              @click="fetchCompany"
            >
              Retry
            </button>
          </div>
        </div>
        <!-- Add employee button if company loaded -->
        <div
          v-if="company"
          class="mb-3"
        >
          <router-link
            :to="{ path: `/employees/add`, query: { companyId: company.id, lockCompany: 1 } }"
            class="btn btn-success"
          >
            Add Employee
          </router-link>
        </div>
        <!-- Company form for editing -->
        <CompanyForm
          v-if="company"
          :company="company"
          :is-edit="true"
          @form-submit="updateCompany"
        />
      </div>
    </div>
  </section>
</template>

<script>
// Import API utility, Vuex actions, and CompanyForm
import api from '../api';
import { mapActions } from "vuex";
import CompanyForm from './CompanyForm.vue';

export default {
  name: 'CompanyEdit',
  components: { CompanyForm },
  data() {
    return {
      company: null, // Holds company data
      loading: true, // Loading state
      error: null,   // Error message
    };
  },
  // Fetch company data on component creation
  async created() {
    await this.fetchCompany();
  },
  methods: {
    ...mapActions(['successMessage', 'errorMessage']),
    // Fetch company details for editing
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
    // Update company details
    async updateCompany(companyData) {
      this.loading = true;
      this.error = null;
      try {
        await api.put(`/companies/${this.company.id}`, companyData);
        this.successMessage('Company updated successfully');
        this.$router.push(`/companies/${this.company.id}`);
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
