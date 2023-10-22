<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  data: {
    type: String,
  },
});
const emit = defineEmits<{
  (event: "pass-data", data: string): void;
}>();
</script>
<template>
  <div class="child">
    <div class="title">Child 2</div>
    <div class="data-actions">
      <button
        class="pass-data-btn"
        :disabled="data !== 'CHILD2'"
        @click="emit('pass-data', 'PARENT')"
      >
        Pass to Parent
      </button>
      <button
        class="pass-data-btn"
        :disabled="data !== 'CHILD2'"
        @click="emit('pass-data', 'CHILD1')"
      >
        Pass to Child 1
      </button>
    </div>
    <div class="data-wrapper">
      <transition>
        <div v-if="data === 'CHILD2'" class="data">DATA</div>
      </transition>
    </div>
  </div>
</template>
<style scoped>
.child {
  padding: 12px;
  border: 2px dashed #fff;
  border-radius: 12px;
  width: 100%;
  position: relative;
}
.data-actions {
  margin-top: 48px;
}
.pass-data-btn {
  cursor: pointer;
}
.data-wrapper {
  top: 12px;
  right: 12px;
}
</style>
