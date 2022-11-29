<script setup>
import NavbarVue from "./components/Navbar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <NavbarVue navbar-brand="Brand Bojo" />
  <RouterView />
</template>
