//@ts-ignore
import { createStore } from "vuex";
import { service } from "../service";
import { AxiosResponse } from "axios";
export default createStore({
  state: {
    userData: [],
    users: [],
    searchType: "ALL",
  },
  actions: {
    /**
     * Fetches the users from the server.
     *
     * @param {unknown} commit - The commit parameter.
     * @returns {Promise<AxiosResponse<any, any>>} A promise that resolves with the response from the server.
     */
    fetchUsers({ commit }: any): Promise<AxiosResponse<any, any>> {
      return new Promise((resolve, reject) => {
        service
          .get("/users") // Send GET request to fetch users data from the server
          .then((response) => {
            commit("SET_USERS", response.data); // Call commit function to update users data in the store
            resolve(response); // Resolve the promise with the response from the server
          })
          .catch((error) => {
            reject(error); // Reject the promise with the error from the server
          });
      });
    },
    /**
     * Sets the search type.
     *
     * @param {any} commit - The commit object.
     * @param {string} payload - The payload string containing the search type.
     */
    setSearchType({ commit }: any, payload: string) {
      commit("SET_SEARCH_TYPE", payload);
    },
    /**
     * Searches for a user based on the provided query.
     *
     * @param {unknown} commit - The commit object.
     * @param {string} query - The search query.
     */
    search({ commit }: unknown, query: string) {
      /**
       * Calls the "SEARCH_USER" mutation with the provided query.
       */
      commit("SEARCH_USER", query);
    },
  },
  mutations: {
    /**
     * Sets the users data in the state and updates the users list.
     *
     * @param {any} state - The current state object.
     * @param {any} payload - The new user data to be set.
     */
    SET_USERS: (state: any, payload: any) => {
      state.userData = payload;
      state.users = payload;
    },
    /**
     * Sets the search type in the state to the specified payload value.
     *
     * @param {any} state - The current state object.
     * @param {string} payload - The value to set the search type to.
     */
    SET_SEARCH_TYPE: (state: any, payload: string) => {
      state.searchType = payload;
    },
    /**
     * Filters the user data based on the given query and updates the state accordingly.
     *
     * @param {any} state - The current state of the application.
     * @param {string} query - The query string used for filtering.
     */
    SEARCH_USER: (state: any, query: string) => {
      state.users = state.userData.filter((user: any) => {
        switch (state.searchType) {
          case "NAME":
            return user.name.toLowerCase().includes(query);
          case "USERNAME":
            return user.username.toLowerCase().includes(query);
          case "PHONE":
            return user.phone.toLowerCase().includes(query);
          case "WEBSITE":
            return user.website.toLowerCase().includes(query);
          case "COMPANY":
            return (
              user.company.name.toLowerCase().includes(query) ||
              user.company.catchPhrase.toLowerCase().includes(query)
            );
          case "ADDRESS":
            return (
              user.address.city.toLowerCase().includes(query) ||
              user.address.street.toLowerCase().includes(query) ||
              user.address.suite.toLowerCase().includes(query) ||
              user.address.zipcode.toLowerCase().includes(query)
            );
          case "ALL":
            return (
              user.name.toLowerCase().includes(query) ||
              user.email.toLowerCase().includes(query) ||
              user.phone.toLowerCase().includes(query) ||
              user.website.toLowerCase().includes(query) ||
              user.username.toLowerCase().includes(query) ||
              user.company.name.toLowerCase().includes(query) ||
              user.company.catchPhrase.toLowerCase().includes(query) ||
              user.address.city.toLowerCase().includes(query) ||
              user.address.street.toLowerCase().includes(query) ||
              user.address.suite.toLowerCase().includes(query) ||
              user.address.zipcode.toLowerCase().includes(query)
            );
          default:
            break;
        }
      });
    },
  },
});
