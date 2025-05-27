<template>
  <!-- Main section for company list -->
  <section class="py-5 overflow-hidden">
    <div class="container-fluid">
      <div class="row pt-4 px-5">
        <h2>Companies</h2>
        <!-- Button to add a new company -->
        <router-link
          to="/companies/add"
          class="btn btn-primary"
        >
          Add Company
        </router-link>
        <!-- Table of companies -->
        <table class="table table-striped">
          <colgroup>
            <col style="width: 25%">
            <col style="width: 25%">
            <col style="width: 25%">
            <col style="width: 25%">
          </colgroup>
          <thead>
            <tr>
              <th scope="col">
                Name
              </th>
              <th scope="col">
                ABN
              </th>
              <th scope="col">
                Number of Employees
              </th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            <!-- Loading state -->
            <tr v-if="companies === null && !error">
              <td
                colspan="4"
                class="text-center"
              >
                Loading...
              </td>
            </tr>
            <!-- Error state with retry -->
            <tr v-else-if="error">
              <td
                colspan="4"
                class="text-center"
              >
                <div class="text-danger mb-2">
                  Error: {{ error }}
                </div>
                <button
                  class="btn btn-secondary"
                  @click="fetchCompanies"
                >
                  Retry
                </button>
              </td>
            </tr>
            <!-- No companies found -->
            <tr v-else-if="companies.length === 0">
              <td
                colspan="4"
                class="text-center"
              >
                No companies found
              </td>
            </tr>
            <!-- List companies -->
            <tr
              v-for="company in companies"
              v-else
              :key="company.id"
            >
              <th scope="row">
                <router-link :to="`/companies/${company.id}`">
                  {{ company.name }}
                </router-link>
              </th>
              <td>{{ company.abn }}</td>
              <td>{{ company.num_employees }}</td>
              <td>
                <router-link
                  :to="`/companies/${company.id}`"
                  class="btn btn-primary ms-1"
                >
                  View
                </router-link> 
                <router-link
                  :to="`/companies/${company.id}/edit`"
                  class="btn btn-success ms-1"
                >
                  Edit
                </router-link> 
                <button
                  class="btn btn-danger ms-1"
                  @click="deleteCompany(company.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import api from '../api';

export default {
  data() {
    return {
      companies: null,
      error: null,
    };
  },
  mounted() {
    this.fetchCompanies();
  },
  methods: {
    ...mapActions(['successMessage', 'errorMessage']),
    async fetchCompanies() {
      this.companies = null;
      this.error = null;
      try {
        const response = await api.get('/companies');
        this.companies = response.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Unknown error';
        this.companies = [];
      }
    },
    async deleteCompany(companyId) {
      if (confirm("Are you sure you want to delete this company?")) {
        try {
          await api.delete(`/companies/${companyId}`);
          this.successMessage("Company deleted successfully.");
          this.fetchCompanies();
        } catch (error) {
          this.errorMessage("An error occurred while deleting the company: " + (error.response?.data?.message || error.message));
        }
      }
    },
  },
};
</script>

<style scoped>
</style>