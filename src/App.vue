<script setup>
import { onMounted, reactive } from "vue";
import axios from "axios";

const data = reactive({
  message: "Hello World",
  users: [],
});

const getUsers = async () => {
  await axios
    .get("https://reqres.in/api/users?page=2")
    .then((response) => {
      data.users = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(() => {
  getUsers();
});
</script>

<template>
  <ul>
    <li v-for="item in data.users" :key="item.id">
      <img :src="item.avatar" alt="avatar" />
      {{ item.first_name + " " + item.last_name }}
    </li>
  </ul>
</template>
