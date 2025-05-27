<template>
  <div>
    <header>
      <div class="container-fluid">
        <div class="row py-3 border-bottom">
          <div class="col-sm-4 col-lg-3 text-center">
            <div>
              <h5 class="text-uppercase">
                Test Application
              </h5>
            </div>
          </div>
          <div class="col-sm-6 offset-sm-2 offset-md-0 col-lg-5 d-none d-lg-block">
            <ul class="d-flex justify-content-end list-unstyled m-0">
              <!-- Show user email if authenticated -->
              <li v-if="isAuthenticated">
                {{ user.email }}
              </li>
              <li>
                <!-- Logout link if authenticated -->
                <router-link
                  v-if="isAuthenticated"
                  to="/logout"
                  class="rounded-circle bg-light p-2 mx-1 login-logout-register"
                >
                  'Logout'
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Responsive navigation menu -->
          <div class="container-fluid">
            <div class="row py-3">
              <div class="d-flex justify-content-center justify-content-sm-between align-items-center">
                <nav class="main-menu d-flex navbar navbar-expand-lg">
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                  >
                    <span class="navbar-toggler-icon" />
                  </button>

                  <div
                    id="offcanvasNavbar"
                    class="offcanvas offcanvas-end"
                    tabindex="-1"
                    aria-labelledby="offcanvasNavbarLabel"
                  >
                    <div class="offcanvas-header justify-content-center">
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      />
                    </div>
                    <div class="offcanvas-body">
                      <ul
                        v-if="isAuthenticated"
                        class="navbar-nav justify-content-end menu-list list-unstyled d-flex gap-md-3 mb-0"
                      >
                        <li class="nav-item">
                          <router-link
                            to="/"
                            class="nav-link"
                            :class="{ active: $route.path === '/' || $route.path === '/dashboard' }"
                          >
                            Dashboard
                          </router-link>
                        </li>
                        <li class="nav-item">
                          <router-link
                            to="/companies"
                            class="nav-link"
                            :class="{ active: $route.path.startsWith('/companies') && $route.path !== '/' }"
                          >
                            Companies
                          </router-link>
                        </li>
                        <li class="nav-item">
                          <router-link
                            to="/employees"
                            class="nav-link"
                            :class="{ active: $route.path.startsWith('/employees') }"
                          >
                            Employees
                          </router-link>
                        </li>
                      </ul>
                      <ul
                        v-else
                        class="navbar-nav justify-content-end menu-list list-unstyled d-flex gap-md-3 mb-0"
                      >
                        <li class="nav-item">
                          <router-link
                            to="/login"
                            class="nav-link"
                            :class="{ active: $route.path.startsWith('/login') }"
                          >
                            Login
                          </router-link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
      isAuthenticated: (state) => state.isAuthenticated
    }),
    isCustomer() {
      return this.user?.role == "customer";
    },
    isServiceProfessional() {
      return this.user?.role == "service_professional";
    },
    isAdmin() {
      return this.user?.role == "admin";
    },
  },
  methods: {
    ...mapActions(['successMessage', 'errorMessage']),
  },
};
</script>

<style scoped>
/* Add your styles here */
.nav-link.active {
  font-weight: bold;
  color: #0d6efd !important;
  background-color: #e7f1ff;
  border-radius: 0.25rem;
}
</style>

<!-- SiteHeader.vue
This component renders the site header, navigation, and user info. It handles authentication state and navigation highlighting. -->