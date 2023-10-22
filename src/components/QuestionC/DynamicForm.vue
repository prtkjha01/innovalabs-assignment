<script setup lang="ts">
import { reactive } from "vue";

const blocks: Array<{
  token: string;
  value: null | boolean | string;
  type: "text" | "checkbox" | "date";
  props: {
    title: string;
    required?: boolean | { condition: string; message: string };
    placeholder?: string;
    default?: boolean;
  };
}> = reactive([
  {
    token: "PERSON_NAME",
    value: null,
    type: "text",
    props: {
      title: "Enter your name",
      required: true,
      placeholder: "e.g. John Doe",
    },
  },
  {
    token: "IS_PERSON_MINOR",
    value: null,
    type: "checkbox",
    props: {
      title: "Is the current person minor?",
      default: false,
    },
  },
  {
    token: "PERSON_DOB",
    value: null,
    type: "date",
    props: {
      title: "Enter your DOB",
      required: {
        condition: "IS_PERSON_MINOR",
        message: "This field is required for minors.",
      },
      placeholder: "e.g. 01/01/2000",
    },
  },
]);
/**
 * Checks if the input is an object and returns true if the value of the condition property
 * in the blocks array is true. If the input is not an object, it returns true.
 *
 * @param {any} input - The input to be checked.
 * @return {boolean} - Returns true if the condition property is true or the input is not an object,
 *                      otherwise returns false.
 */
const toggleVisibility = (input: any): boolean => {
  // Check if the input is an object
  if (typeof input === "object") {
    // Find the block in the blocks array that matches the input condition
    const dependency = blocks.filter((block) => {
      return block.token === input.condition;
    });

    // Check if the value of the condition property is true
    if (dependency[0].value) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

/**
 * Checks if a value is required based on the given condition.
 *
 * @param {boolean | { condition: string; message: string } | undefined} required - The value representing the requirement condition.
 * @return {boolean} - Returns a boolean indicating if the value is required or not.
 */
const checkRequired = (
  required: boolean | { condition: string; message: string } | undefined
): boolean => {
  if (typeof required === "boolean") {
    return required;
  } else if (typeof required === "undefined") {
    return false;
  } else {
    return true;
  }
};
const handleSubmit = (e: Event) => {
  e.preventDefault();
  const data = blocks.map((block) => {
    return {
      token: block.token,
      value: block.value,
    };
  });
  console.log("form submitted with following data ->");
  console.table(data);
  alert("Form Submitted!");
};
</script>
<template>
  <div class="form-container">
    <div class="title">Dynamic Form</div>
    <form class="form" name="dynamic-form" @submit="handleSubmit" action="">
      <div class="input-block" v-for="(input, index) in blocks" :key="index">
        <label v-if="toggleVisibility(input.props.required)" :for="input.token"
          >{{ input.props.title }} :
        </label>
        <input
          v-if="toggleVisibility(input.props.required)"
          :id="input.token"
          :type="input.type"
          :name="input.token"
          v-model="input.value"
          :placeholder="input.props.placeholder"
          :required="checkRequired(input.props.required)"
          @input="toggleVisibility(input.props.required)"
        />
      </div>
      <div class="submit-btn-wrapper">
        <button class="submit-btn" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>
<style scoped>
.form-container {
  padding: 12px;
  width: 400px;
  border: 2px solid #fff;
  border-radius: 12px;
  margin-top: 48px;
}
.title {
  font-weight: 700;
  font-size: 20px;
}
.form {
  margin-top: 24px;
}
.input-block {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 1rem;
}
.submit-btn-wrapper {
  display: flex;
}
.submit-btn {
  cursor: pointer;
  background-color: rgb(91, 152, 0);
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px;
}
</style>
