<script setup lang="ts">
import { Ref, ref } from "vue";
import Child1 from "./Children/Child1.vue";
import Child2 from "./Children/Child2.vue";
const data: Ref<string> = ref("PARENT");
/**
 * Sets the value of the data to the given payload.
 *
 * @param {string} payload - The payload to set the data value to.
 * @return {void} This function does not return any value.
 */
const passData = (payload: string): void => {
  data.value = payload;
};
</script>
<template>
  <div class="parent">
    <div class="title">Parent Component</div>
    <div class="data-actions">
      <button
        class="pass-data-btn"
        :disabled="data !== 'PARENT'"
        @click="passData('CHILD1')"
      >
        Pass to Child 1
      </button>
      <button
        class="pass-data-btn"
        :disabled="data !== 'PARENT'"
        @click="passData('CHILD2')"
      >
        Pass to Child 2
      </button>
    </div>
    <div class="data-wrapper">
      <transition>
        <div v-if="data === 'PARENT'" class="data">DATA</div>
      </transition>
    </div>
    <div class="children">
      <Child1 :data="data" @pass-data="passData" />
      <Child2 :data="data" @pass-data="passData" />
    </div>
  </div>
</template>
<style>
.parent {
  padding: 24px;
  border: 2px solid #fff;
  border-radius: 12px;
  width: 50%;
  min-height: 100px;
  position: relative;
}

.children {
  display: flex;
  gap: 24px;
  margin-top: 48px;
}
</style>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.data-actions {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}
.pass-data-btn {
  cursor: pointer;
}
.data-wrapper {
  position: absolute;
  top: 24px;
  right: 24px;
  height: 30px;
  width: 80px;
  padding: 12px;
  border: 1px solid rgb(91, 152, 0);
}
.data {
  height: 30px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(91, 152, 0);
  border-radius: 10px;
}
</style>
