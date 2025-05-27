// Vuex store for authentication, user state, and flash messages
import { createStore } from 'vuex';
import api from '../api';

const store = createStore({
  state: {
    // Tracks if user is authenticated (based on JWT in localStorage)
    isAuthenticated: !!localStorage.getItem('jwt_token'),
    // Stores the current user object (from localStorage or null)
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    // Holds flash messages for UI feedback
    flashMessages: []
  },
  mutations: {
    // Set authentication state (true/false)
    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    // Set user object and persist to localStorage
    setUser(state, user) {
      state.user = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    },
    // Replace all flash messages
    setFlashMessages(state, messages) {
      state.flashMessages = messages;
    },
    // Set a single flash message (clears previous)
    setFlashMessage(state, message) {
      state.flashMessages = [message]; // Clear previous messages and set the new one
    },
    // Clear all flash messages
    clearFlashMessages(state) {
      state.flashMessages = [];
    }
  },
  actions: {
    // Log in the user, store JWT and user, update state
    async login({ commit }, { email, password }) {
      const response = await api.post('/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('jwt_token', token);
      commit('setUser', response.data.user);
      commit('setAuthentication', true);
      return response.data.user;
    },
    // Log out the user, clear JWT and user from storage/state
    async logout({ commit }) {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('user');
      commit('setUser', null);
      commit('setAuthentication', false);
    },
    // Initialize store state from localStorage (on app load)
    async initialize({ commit }) {
      const token = localStorage.getItem('jwt_token');
      const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
      if (token && user) {
        commit('setAuthentication', true);
        commit('setUser', user);
      } else {
        commit('setAuthentication', false);
        commit('setUser', null);
      }
    },
    // Show a success flash message
    successMessage({ commit }, message) {
      commit('setFlashMessage', { type: 'success', text: message });
    },
    // Show an error flash message
    errorMessage({ commit }, message) {
      commit('setFlashMessage', { type: 'danger', text: message });
    }
  },
  getters: {
    // Returns authentication state
    isAuthenticated: state => state.isAuthenticated,
    // Returns current user object
    user: state => state.user,
    // Returns all flash messages
    flashMessages: state => state.flashMessages
  }
});

export default store;