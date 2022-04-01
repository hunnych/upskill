import Vue from "vue";
import Vuex from "vuex";
import EventService from '@/services/EventService.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: null,
    totalExpense: 0,
    loggedUser: null,
    notificationMessage: false,
    errorMessage: false,
    messages: null,
  },
  mutations: {
    GET_EXPENSE_DATA(state, payload) {
      state.items = payload;
    },
    CALCULATE_TOTAL_EXPENSE(state, payload) { 
      state.totalExpense = payload;
    },
    LOGGED_USER(state, payload) {
      state.loggedUser = payload;
    },
    SET_NOTIFICATION(state, payload) {
      state.notificationMessage = payload;
    },
    GET_MESSAGES(state, payload) {
      state.messages = payload;
    },
  },
  actions: {
    async getExpenses({ commit }) {
      console.log("1");
      var expenseData = null;
      var total = 0;
      await EventService.getExpensesRequest().then((result) => {
        expenseData = result.data;
        expenseData.forEach((expense) => {
          total += parseInt(expense.amount);
        });
      }).catch(error => {
        console.log("error",error)  
      });
      commit("GET_EXPENSE_DATA", expenseData);
      commit("CALCULATE_TOTAL_EXPENSE", total);
    },
    async deleteExpense({ dispatch }, id) {
       await EventService.deleteExpenseRequest(id.deleteId)
        .then((result) => {
          console.log(result.data);
          dispatch("getExpenses");
        });
    },
    async AddExpense({ dispatch }, expenseData) {
        await EventService.postExpensesRequest(expenseData)
        .then((result) => {
          console.log(result);
          dispatch("getExpenses");
        });
    },

    async UserLogin({ commit }, formData) {
      const result = await EventService.userLoginRequest(formData.username,formData.password);
      commit("LOGGED_USER", result);
      return result;
    },

    async UserRegistration({ commit }, RegistrationformData) {
      console.log(RegistrationformData);
      const register = await EventService.userRegistrationRequest(RegistrationformData);
      const registerResponse = register.then((response) => response.data);
      commit("SET_NOTIFICATION", "You are registered successfully");
      return registerResponse;
    },

    async getMessages({ commit }) {
      await EventService.getMessagesRequest().then((result) => {
        commit("GET_MESSAGES", result.data);
      });
    },
    async sendMessage({ dispatch }, messageData) {
      await EventService.sendMessageRequest(messageData)
        .then((result) => {
          console.log(result.data);
          dispatch("getMessages");
        });
    },
  },
  getters: {
    getTotalExpense: (state) => state.totalExpense,
  },
});
