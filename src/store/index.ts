//@ts-ignore
import { createStore } from "vuex";
import { service } from "../service";
import { AxiosResponse } from "axios";
export default createStore({
  state: {
    userData: [],
    users: [],
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
     * Filters the user data based on the given query and updates the state accordingly.
     *
     * @param {any} state - The current state of the application.
     * @param {string} query - The query string used for filtering.
     */
    SEARCH_USER: (state: any, query: string) => {
      state.users = state.userData.filter((user: any) => {
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
      });
    },
  },
});
