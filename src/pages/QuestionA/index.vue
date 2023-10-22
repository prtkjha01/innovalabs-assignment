<script setup lang="ts">
import Parent from "../../components/QuestionA/Parent.vue";
</script>
<template>
  <div class="header">
    <span class="back-arrow" @click="$router.push({ path: '/' })">&larr; </span>
    Question A :
  </div>
  <div class="question">
    <ul class="list">
      <li>Parent-child communication</li>
      <li>Child Parent Communication</li>
      <li>Child Child Communication</li>
    </ul>
  </div>
  <div class="parent-wrapper">
    <Parent />
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
.list {
  font-weight: 500;
}
.parent-wrapper {
  margin-top: 48px;
}
</style>
