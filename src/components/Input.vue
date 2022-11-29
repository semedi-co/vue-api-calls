<script setup>
import { ErrorMessage, Field } from "vee-validate";

defineProps({
  title: {
    type: String,
    default: "Label Form",
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
    required: true,
  },
  errors: {
    required: true,
  },
  placeholder: {
    type: String,
  },
  data: {
    type: Array,
  },
});
</script>
<template>
  <div class="mb-3" v-if="type === 'text'">
    <label :for="title" class="form-label">{{ title }}</label>
    <Field
      :name="name"
      type="text"
      class="form-control"
      :class="{ 'is-invalid': errors }"
      :id="title"
      :placeholder="placeholder"
    />
    <ErrorMessage :name="name" class="invalid-feedback" />
  </div>
  <div class="mb-3" v-if="type === 'checkbox'">
    <label class="form-label">{{ title }}</label>
    <br />
    <div
      class="form-check form-check-inline"
      v-for="(item, index) in data"
      :key="index"
    >
      <Field
        class="form-check-input"
        type="checkbox"
        :name="name"
        :class="{ 'is-invalid': errors }"
        :id="item"
        :value="item"
      />
      <label class="form-check-label" :for="item">{{ item }}</label>
    </div>
    <br />
    <ErrorMessage :name="name" class="text-danger" />
  </div>
</template>
