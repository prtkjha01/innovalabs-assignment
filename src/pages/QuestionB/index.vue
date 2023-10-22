<script setup lang="ts">
//@ts-ignore
import UserTable from "@components/QuestionB/UserTable.vue";
</script>
<template>
  <div class="header">
    <span class="back-arrow" @click="$router.push({ path: '/' })">&larr;</span>
    Question B :
  </div>
  <div class="question">
    Need to list total users from an API in a paginated list. The list can be
    searched and filtered
    <br />
    The user can search and filter the user list with all parameters
  </div>
  <div class="solution">
    <UserTable />
  </div>
</template>
<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 20px;
  font-weight: 700;
}
.back-arrow {
  font-size: 30px;
  cursor: pointer;
  transition: transform 0.3s;
}
.back-arrow:hover {
  transform: scale(1.3);
}
</style>
