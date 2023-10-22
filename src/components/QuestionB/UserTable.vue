<script setup lang="ts">
import { onMounted, computed, ref, Ref, ComputedRef } from "vue";
//@ts-ignore
import { useStore } from "vuex";
const store = useStore();
onMounted(() => {
  loading.value = true;
  store
    .dispatch("fetchUsers")
    .then(() => {
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
});
//Loading binding
const loading: Ref<boolean> = ref(false);
//Filters
const query: Ref<string> = ref("");
const searchType: Ref<string> = ref("ALL");
//Table Data
const users: ComputedRef<any> = computed(() => store.state.users);

//Paginator Data
const lastPage: ComputedRef<number> = computed(() =>
  Math.ceil(users.value.length / pageSize.value)
);
const page: Ref<number> = ref(1);
const pageSize: Ref<number> = ref(4);
const start: Ref<number> = ref(pageSize.value * (page.value - 1));
const end: Ref<number> = ref(start.value + pageSize.value);

/**
 * Sets the search type in the store.
 *
 * @param {type} searchType - the type of search to be set
 * @return {void}
 */
const setSearchType = (): void => {
  store.dispatch("setSearchType", searchType.value);
};
/**
 * Handles the search action.
 *
 * @return {void} This function does not return anything.
 */
const handleSearch = (): void => {
  store.dispatch("search", query.value.toLowerCase()); //call to store function
};

/**
 * Handles pagination based on the given type.
 *
 * @param {string} type - The type of pagination (PREV or NEXT).
 * @return {void} This function does not return anything.
 */
const handlePagination = (type: string): void => {
  // Set loading to true to indicate that the pagination is in progress
  loading.value = true;

  // Delay the execution of the pagination logic by 1.5 seconds
  setTimeout(() => {
    // Check the pagination type
    if (type === "PREV") {
      // Check if there are previous pages available
      if (start.value >= pageSize.value) {
        // Decrease the page number and adjust the start and end values
        page.value--;
        start.value -= pageSize.value;
        end.value -= pageSize.value;
      } else {
        // No previous pages available, do nothing
        void 0;
      }
    } else {
      // Check if there are next pages available
      if (page.value <= lastPage.value - 1) {
        // Increase the page number and adjust the start and end values
        page.value++;
        start.value += pageSize.value;
        end.value += pageSize.value;
      } else {
        // No next pages available, do nothing
        void 0;
      }
    }

    // Set loading to false to indicate that the pagination is completed
    loading.value = false;

    // Log the updated start and end values
    console.log("after", start.value, end.value);
  }, 1500);
};
</script>
<template>
  <div class="users">
    <!-- Filters -->
    <div class="filters">
      <div class="search-type-dropdown-wrapper">
        <select
          class="search-type-dropdown"
          v-model="searchType"
          name=""
          id=""
          @change="setSearchType"
        >
          <option value="ALL">All</option>
          <option value="NAME">Name</option>
          <option value="USERNAME">Username</option>
          <option value="PHONE">Phone</option>
          <option value="WEBSITE">Website</option>
          <option value="COMPANY">Company</option>
          <option value="ADDRESS">Address</option>
        </select>
      </div>
      <div class="search">
        <input
          type="search"
          v-model="query"
          name="user-search"
          id=""
          @keyup="handleSearch"
        />
        <button class="search-btn" @click="handleSearch">search</button>
      </div>
    </div>
    <!-- Filters -->
    <!-- Table -->
    <table class="users-table">
      <!-- Headers -->
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Website</th>
          <th>Company</th>
          <th>Address</th>
        </tr>
      </thead>
      <!-- Headers -->
      <!-- Body -->
      <tbody>
        <tr
          v-if="!loading"
          v-for="(user, index) in users.slice(start, end)"
          :key="index"
        >
          <td>
            <div class="name">
              <div>{{ user.name }}</div>
              <div class="username">@{{ user.username }}</div>
            </div>
          </td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.website }}</td>
          <td>
            <div class="company">
              <div>{{ user.company.name }}</div>
              <div>{{ user.company.catchPhrase }}</div>
            </div>
          </td>
          <td>
            <div class="address">
              {{
                `${user.address.suite}, ${user.address.street}, ${user.address.city} - ${user.address.zipcode}`
              }}
            </div>
          </td>
        </tr>
        <tr v-else>
          <td></td>
          <td></td>
          <td></td>
          <td style="padding: 20px; display: flex; justify-content: center">
            <div class="loader"></div>
          </td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
      <!-- Body -->
    </table>
    <!-- Table -->
    <!-- Paginator -->
    <div class="paginator">
      <div class="paginator-text">
        Showing {{ start + 1 }} to
        {{ end > users.length ? users.length.toString() : end }} of
        {{ users.length }} users
      </div>
      <div class="paginator-right">
        <div class="current-page">Page {{ page }} of {{ lastPage }}</div>
        <button
          class="paginator-btn"
          @click="handlePagination('PREV')"
          :disabled="end <= pageSize"
        >
          Prev
        </button>
        <button
          class="paginator-btn"
          @click="handlePagination('NEXT')"
          :disabled="page + 1 > lastPage"
        >
          Next
        </button>
      </div>
    </div>
    <!-- Paginator -->
  </div>
</template>
<style scoped>
.users {
  margin-top: 48px;
}
.filters {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.search-type-dropdown {
  /* height: 28px; */
  padding: 5px;
}
table {
  border-collapse: collapse;
  width: 100%;
}
.users-table {
  margin-top: 36px;
}
.search {
  display: flex;
  gap: 5px;
}
.search-btn {
  cursor: pointer;
  background-color: rgb(91, 152, 0);
  color: #fff;
  border: none;
  border-radius: 4px;
}
th {
  text-align: start;
}
tr:nth-child(even) {
  background-color: #535353;
}
th,
td {
  padding: 10px;
  font-size: 13px;
}
td .username {
  color: rgb(91, 152, 0);
}
thead {
  border: 1px solid #fff;
}
tbody {
  border: 1px solid #fff;
}
.loader {
  height: 50px;
  width: 50px;
  border: 3px dashed #fff;
  border-radius: 100%;
  animation: rotate 2s infinite linear;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
.paginator {
  border: 1px solid #fff;
  border-top: none;
  padding: 12px;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.paginator-btn {
  cursor: pointer;
}
.paginator-right {
  display: flex;
  gap: 12px;
}
</style>
