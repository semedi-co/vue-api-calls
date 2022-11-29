<script setup>
defineProps({
  variant: {
    type: String,
    default: "secondary",
  },
  label: {
    type: String,
    default: "Button",
  },
});

function generateVariant(variant) {
  switch (variant) {
    case "primary":
      return "btn-primary";
    case "info":
      return "btn-info";
    case "danger":
      return "btn-danger";
    default:
      return "btn-secondary";
  }
}
</script>

<template>
  <button class="btn" :class="generateVariant(variant)">
    {{ label }}
  </button>
</template>
