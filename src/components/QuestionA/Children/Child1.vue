<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

//const props =
defineProps({
  data: {
    type: String,
    required: true,
  },
});

const emit = defineEmits<{
  (event: "pass-data", data: string): void;
}>();
</script>
<template>
  <div class="child">
    <div class="title">Child 1</div>
    <div class="data-actions">
      <button
        class="pass-data-btn"
        :disabled="data !== 'CHILD1'"
        @click="emit('pass-data', 'PARENT')"
      >
        Pass to Parent
      </button>
      <button
        class="pass-data-btn"
        :disabled="data !== 'CHILD1'"
        @click="emit('pass-data', 'CHILD2')"
      >
        Pass to Child 2
      </button>
    </div>
    <div class="data-wrapper">
      <transition>
        <div v-if="data === 'CHILD1'" class="data">DATA</div>
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
  min-height: 100px;
  position: relative;
}
.data-actions {
  margin-top: 48px;
}
.data-wrapper {
  top: 12px;
  right: 12px;
}
</style>
