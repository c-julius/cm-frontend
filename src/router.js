import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from './components/LoginForm.vue';
import AdminDashboard from './components/AdminDashboard.vue';
import CompanyList from './components/CompanyList.vue';
import CompanyForm from './components/CompanyForm.vue';
import EmployeeList from './components/EmployeeList.vue';
import EmployeeForm from './components/EmployeeForm.vue';
import CompanyView from './components/CompanyView.vue';
import CompanyEdit from './components/CompanyEdit.vue';
import CompanyAdd from './components/CompanyAdd.vue';
import EmployeeView from './components/EmployeeView.vue';
import EmployeeEdit from './components/EmployeeEdit.vue';
import EmployeeAdd from './components/EmployeeAdd.vue';
import store from './store';

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard
  },
  {
    path: '/companies',
    name: 'CompanyList',
    component: CompanyList
  },
  {
    path: '/companies/new',
    name: 'CompanyForm',
    component: CompanyForm
  },
  {
    path: '/companies/:companyId/edit',
    name: 'CompanyEditForm',
    component: CompanyForm
  },
  {
    path: '/companies/:companyId/employees',
    name: 'EmployeeList',
    component: EmployeeList
  },
  {
    path: '/companies/:companyId/employees/new',
    name: 'EmployeeForm',
    component: EmployeeForm
  },
  {
    path: '/employees/:employeeId/edit',
    name: 'EmployeeEdit',
    component: EmployeeForm
  },
  {
    path: '/companies/:id',
    name: 'CompanyView',
    component: CompanyView
  },
  {
    path: '/companies/:id/edit',
    name: 'CompanyEdit',
    component: CompanyEdit
  },
  {
    path: '/companies/add',
    name: 'CompanyAdd',
    component: CompanyAdd,
    meta: { requiresAuth: true },
  },
  {
    path: '/employees',
    name: 'EmployeeList',
    component: EmployeeList,
    meta: { requiresAuth: true },
  },
  {
    path: '/employees/:id',
    name: 'EmployeeView',
    component: EmployeeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/employees/:id/edit',
    name: 'EmployeeEdit',
    component: EmployeeEdit,
    meta: { requiresAuth: true },
  },
  {
    path: '/employees/add',
    name: 'EmployeeAdd',
    component: EmployeeAdd,
    meta: { requiresAuth: true },
  },
  {
    path: '/companies/:id/employees/add',
    name: 'CompanyEmployeeAdd',
    component: EmployeeAdd,
    meta: { requiresAuth: true },
  },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter(to, from, next) {
      store.dispatch('logout');
      next({ name: 'LoginForm' });
    },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const unauthenticatedRoutes = ['LoginForm'];

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (!isAuthenticated && !unauthenticatedRoutes.includes(to.name)) {
    // If the user is not authenticated and trying to access a protected route
    // redirect to the login page
    next({ name: 'LoginForm' });
  } else if (isAuthenticated) {
    if (to.name === 'LoginForm') {
      // If the user is authenticated and trying to access the login page,
      // redirect to the admin dashboard
      next({ name: 'AdminDashboard' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;