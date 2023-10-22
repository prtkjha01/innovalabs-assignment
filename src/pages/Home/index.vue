<script setup lang="ts">
import { reactive } from "vue";
const questions: Array<{
  id: number;
  name: string;
  content: string;
  to: string;
}> = reactive([
  {
    id: 1,
    name: "Question A",
    content:
      "Parent-child communication, Child Parent Communication, Child Child Communication",
    to: "Question A",
  },
  {
    id: 2,
    name: "Question B",
    content:
      "Need to list total users from an API in a paginated list. The list can be searched and filtered. The user can search and filter the user list with all parameters",
    to: "Question B",
  },
  {
    id: 3,
    name: "Question C",
    content:
      "Write code to build form and handle this dynamically. When the user press submit button this form needs to be validated before submit. This block can be dynamic JSON. This can be N number of Blocks.",
    to: "Question C",
  },
]);
</script>
<template>
  <div class="title">Innovalabs VueJs Assignment</div>
  <div class="question-container">
    <div
      class="question-wrapper"
      v-for="question in questions"
      :key="question.id"
      @click="$router.push({ name: question.to })"
    >
      <div class="question-name">{{ question.name }}:</div>
      <div class="question-content">{{ question.content }}</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.title {
  margin-top: 24px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
.question-container {
  margin-top: 12rem;

  .question-wrapper {
    padding: 20px;
    margin-block: 1rem;
    border: 2px solid white;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    cursor: pointer;
  }
}
.question-wrapper:hover {
  background-color: #535353;
  border-color: #e8e8e8;
  transition: transform 0.3s;
  transform: scale(1.01);
}
</style>
