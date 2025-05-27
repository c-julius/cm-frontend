<template>
  <!-- Company form fields -->
  <form
    class="card p-4"
    @submit.prevent="handleSubmit"
  >
    <div class="mb-3">
      <label class="form-label">Name</label>
      <input
        v-model="localCompany.name"
        class="form-control"
        required
        name="name"
      >
    </div>
    <div class="mb-3">
      <label class="form-label">ABN</label>
      <input
        v-model="localCompany.abn"
        class="form-control"
        required
        name="abn"
      >
    </div>
    <div class="mb-3">
      <label class="form-label">Email</label>
      <input
        v-model="localCompany.email"
        class="form-control"
        type="email"
        required
        name="email"
      >
    </div>
    <div class="mb-3">
      <label class="form-label">Address</label>
      <input
        v-model="localCompany.address"
        class="form-control"
        required
        name="address"
      >
    </div>
    <div class="mt-3">
      <!-- Submit and cancel buttons -->
      <button
        type="submit"
        class="btn btn-primary me-2"
      >
        {{ isEdit ? 'Save Changes' : 'Add Company' }}
      </button>
      <router-link
        :to="cancelUrl"
        class="btn btn-secondary"
      >
        Cancel
      </router-link>
    </div>
  </form>
</template>

<script>
export default {
  name: 'CompanyForm',
  emits: ['form-submit'],
  props: {
    company: {
      type: Object,
      required: true, // The company object to edit or add
    },
    isEdit: {
      type: Boolean,
      default: false, // Whether this is an edit form
    },
  },
  data() {
    return {
      // Local copy of company for form editing
      localCompany: { ...this.company },
    };
  },
  computed: {
    // Cancel URL depends on edit/add mode
    cancelUrl() {
      return this.isEdit && this.company.id ? `/companies/${this.company.id}` : '/';
    },
  },
  watch: {
    company: {
      handler(newVal) {
        this.localCompany = { ...newVal };
      },
      deep: true,
    },
  },
  methods: {
    handleSubmit() {
      this.$emit('form-submit', { ...this.localCompany });
    },
  },
};
</script>

<style scoped>
</style>
