<script setup>
import MyButton from "../components/Button.vue";

function halo() {
  alert("halo");
}
</script>

<template>
  <div class="p-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-5">
      <h1 class="display-5 fw-bold">Vue - Api Calls</h1>
      <p class="col-md-8 fs-4">
        There are several options available to make API calls from your Vue.js
        applications.
      </p>
      <form @submit="halo">
        <MyButton label="Lets Go" variant="primary" type="submit" />
      </form>
      <MyButton label="Lets Go" variant="danger" />
      <MyButton label="Lets Go" variant="info" />
      <MyButton label="Lets Go" />
    </div>
  </div>
</template>
