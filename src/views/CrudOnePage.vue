<script setup>
import { onMounted, reactive } from "vue";
import axios from "axios";
import { faker } from "@faker-js/faker";

const data = reactive({
  users: [],
  form: {
    name: "",
    hobi: "",
  },
  selected: {},
  mode: "add",
});

// Get Users
const getUsers = async () => {
  await axios
    .get("http://localhost:3000/users")
    .then((response) => {
      data.users = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

// Add User
const addUsers = async () => {
  if (data.mode === "add") {
    const sendData = {
      name: data.form.name,
      hobi: data.form.hobi,
      avatar: faker.image.nature(),
    };
    await axios
      .post("http://localhost:3000/users", sendData)
      .then(() => {
        getUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    const sendData = {
      ...data.selected,
      name: data.form.name,
      hobi: data.form.hobi,
    };
    await axios
      .put(`http://localhost:3000/users/${data.selected.id}`, sendData)
      .then(() => {
        getUsers();
        alert("berhasil Edit");
        data.mode = "add";
        data.form.name = "";
        data.form.hobi = "";
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

// Delete User
const deleteUsers = async (id) => {
  await axios
    .delete(`http://localhost:3000/users/${id}`)
    .then(() => {
      getUsers();
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
  <div class="container mt-5">
    <h1 class="mb-4">CRUD One Page</h1>
    <div class="row">
      <div class="col col-md-4">
        <div class="card mb-5 sticky-top">
          <div class="card-body">
            <form @submit.prevent="addUsers">
              <div class="form-group mb-3">
                <label for="name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="data.form.name"
                  placeholder="Enter name"
                />
              </div>
              <div class="form-group mb-3">
                <label for="hobi">Hobi</label>
                <input
                  type="text"
                  class="form-control"
                  id="hobi"
                  placeholder="Enter Hobi"
                  v-model="data.form.hobi"
                />
              </div>
              <button type="submit" class="btn btn-primary me-2">
                {{ data.mode == "add" ? "Simpan" : "Edit" }}
              </button>
              <button
                v-if="data.mode === 'edit'"
                class="btn btn-dark"
                @click="
                  data.mode = 'add';
                  data.selected = {};
                  data.form.hobi = '';
                  data.form.name = '';
                "
              >
                Batal
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="col col-md-8">
        <ul v-if="data.users.length" class="list-group list-group-flush">
          <li
            v-for="item in data.users"
            :key="item.id"
            class="list-group-item d-flex gap-4 align-items-center justify-content-between"
          >
            <div class="d-flex gap-4">
              <img :src="item.avatar" alt="avatar" class="img-thumbnail" />
              <div>
                <h2>{{ item.name }}</h2>
                <p>Hobi: {{ item.hobi }}</p>
              </div>
            </div>
            <div class="d-flex gap-3">
              <button
                class="btn btn-danger btn-sm"
                @click="deleteUsers(item.id)"
              >
                Delete
              </button>
              <button
                class="btn btn-info btn-sm"
                @click="
                  data.selected = item;
                  data.form = { ...item };
                  data.mode = 'edit';
                "
              >
                Edit
              </button>
            </div>
          </li>
        </ul>
        <div v-else>Data Masih Kosong</div>
      </div>
    </div>
  </div>
</template>
