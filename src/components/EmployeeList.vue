<template>
  <!-- Main section for employee list -->
  <section class="py-5 overflow-hidden">
    <div class="container-fluid">
      <div class="row pt-4 px-5">
        <h2>Employees</h2>
        <!-- Add Employee button (only if not filtered by company) -->
        <router-link
          v-if="!companyId"
          to="/employees/add"
          class="btn btn-primary"
        >
          Add Employee
        </router-link>
        <!-- Table of employees -->
        <table
          class="table table-striped"
          name="employees"
        >
          <colgroup>
            <col style="width: 20%">
            <col style="width: 20%">
            <col style="width: 20%">
            <col
              v-if="showCompanyColumn"
              style="width: 20%"
            >
            <col style="width: 20%">
          </colgroup>
          <thead>
            <tr>
              <th scope="col">
                Name
              </th>
              <th scope="col">
                Email
              </th>
              <th scope="col">
                Address
              </th>
              <th
                v-if="showCompanyColumn"
                scope="col"
              >
                Company
              </th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            <!-- Loading state -->
            <tr v-if="employees === null && !error">
              <td
                :colspan="showCompanyColumn ? 5 : 4"
                class="text-center"
              >
                Loading...
              </td>
            </tr>
            <!-- Error state with retry -->
            <tr v-else-if="error">
              <td
                :colspan="showCompanyColumn ? 5 : 4"
                class="text-center"
              >
                <div class="text-danger mb-2">
                  Error: {{ error }}
                </div>
                <button
                  class="btn btn-secondary"
                  @click="fetchEmployees"
                >
                  Retry
                </button>
              </td>
            </tr>
            <!-- No employees found -->
            <tr v-else-if="employees.length === 0">
              <td
                :colspan="showCompanyColumn ? 5 : 4"
                class="text-center"
              >
                No employees found
              </td>
            </tr>
            <!-- List employees -->
            <tr
              v-for="employee in employees"
              v-else
              :key="employee.id"
            >
              <th scope="row">
                <router-link :to="`/employees/${employee.id}`">
                  {{ employee.first_name }} {{ employee.last_name }}
                </router-link>
              </th>
              <td>{{ employee.email }}</td>
              <td>{{ employee.address }}</td>
              <td v-if="showCompanyColumn">
                <router-link
                  v-if="employee.company"
                  :to="`/companies/${employee.company.id}`"
                >
                  {{ employee.company.name }}
                </router-link>
                <span v-else>N/A</span>
              </td>
              <td>
                <router-link
                  :to="`/employees/${employee.id}`"
                  class="btn btn-success ms-1"
                >
                  View
                </router-link> 
                <router-link
                  :to="`/employees/${employee.id}/edit`"
                  class="btn btn-primary ms-1"
                >
                  Edit
                </router-link> 
                <button
                  class="btn btn-danger ms-1"
                  @click="deleteEmployee(employee.id)"
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
import api from '../api';
import { mapActions } from 'vuex';

export default {
  name: 'EmployeeList',
  props: {
    showCompanyColumn: {
      type: Boolean,
      default: true,
    },
    companyId: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      employees: null,
      error: null,
    };
  },
  mounted() {
    this.fetchEmployees();
  },
  methods: {
    ... mapActions(['successMessage', 'errorMessage']),
    async fetchEmployees() {
      this.employees = null;
      this.error = null;
      try {
        let url = '/employees';
        if (this.companyId) {
          url = `/companies/${this.companyId}/employees`;
        }
        const response = await api.get(url);
        this.employees = response.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Unknown error';
        this.employees = [];
      }
    },
    async deleteEmployee(employeeId) {
      if (confirm("Are you sure you want to delete this employee?")) {
        try {
          await api.delete(`/employees/${employeeId}`);
          this.successMessage('Employee deleted successfully');
          this.fetchEmployees();
        } catch (error) {
          alert("An error occurred while deleting the employee: " + (error.response?.data?.message || error.message));
        }
      }
    },
  },
};
</script>

<style scoped>
</style>
