<template>
  <div>
    <!-- Show loading if companies not loaded -->
    <div
      v-if="!companies"
      class="text-center"
    >
      Loading...
    </div>
    <!-- Employee form fields -->
    <form
      v-else
      class="card p-4"
      @submit.prevent="handleSubmit"
    >
      <div class="mb-3">
        <label class="form-label">First Name</label>
        <input
          v-model="localEmployee.first_name"
          class="form-control"
          required
          name="first_name"
        >
      </div>
      <div class="mb-3">
        <label class="form-label">Last Name</label>
        <input
          v-model="localEmployee.last_name"
          class="form-control"
          required
          name="last_name"
        >
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          v-model="localEmployee.email"
          class="form-control"
          type="email"
          required
          name="email"
        >
      </div>
      <div class="mb-3">
        <label class="form-label">Address</label>
        <input
          v-model="localEmployee.address"
          class="form-control"
          required
          name="address"
        >
      </div>
      <div class="mb-3">
        <label class="form-label">Company</label>
        <select
          v-model="localEmployee.company_id"
          class="form-select"
          required
          :disabled="lockCompany"
          name="company_id"
        >
          <option
            v-for="company in companies"
            :key="company.id"
            :value="company.id"
          >
            {{ company.name }}
          </option>
        </select>
      </div>
      <div class="mt-3">
        <!-- Submit and cancel buttons -->
        <button
          type="submit"
          class="btn btn-primary me-2"
        >
          {{ isEdit ? 'Save Changes' : 'Add Employee' }}
        </button>
        <router-link
          :to="cancelUrl"
          class="btn btn-secondary"
        >
          Cancel
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EmployeeForm',
  emits: ['form-submit'],
  props: {
    employee: {
      type: Object,
      required: true, // The employee object to edit or add
    },
    companies: {
      type: Array,
      required: true, // List of companies for dropdown
    },
    isEdit: {
      type: Boolean,
      default: false, // Determines if the form is in edit mode
    },
    cancelUrl: {
      type: String,
      default: '/', // Default cancel URL
    },
    lockCompany: {
      type: Boolean,
      default: false, // Determines if the company field is editable
    },
  },
  data() {
    return {
      localEmployee: { ...this.employee }, // Local copy of employee data
    };
  },
  watch: {
    employee: {
      handler(newVal) {
        this.localEmployee = { ...newVal }; // Update localEmployee when employee prop changes
      },
      deep: true,
    },
  },
  methods: {
    handleSubmit() {
      this.$emit('form-submit', { ...this.localEmployee }); // Emit form-submit event with employee data
    },
  },
};
</script>

<style scoped>
</style>
