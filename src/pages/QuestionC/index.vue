<script setup lang="ts">
//@ts-ignore
import DynamicForm from "@components/QuestionC/DynamicForm.vue";
</script>
<template>
  <div class="header">
    <span class="back-arrow" @click="$router.push({ path: '/' })">&larr;</span>
    Question C :
  </div>
  <div class="question">
    Write code to build form and handle this dynamically. When the user press
    submit button this form needs to be validated before submit.
    <br />
    This block can be dynamic JSON. This can be N number of Blocks.
  </div>
  <div class="solution">
    <DynamicForm />
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
