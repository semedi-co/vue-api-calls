<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const buku = ref([]);

const getBuku = async () => {
  await axios
    .get("http://localhost:3000/buku")
    .then((response) => {
      buku.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(() => {
  getBuku();
});
</script>

<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center">
      <h1>Toko Buku</h1>
      <button
        @click="router.push('/add-buku')"
        type="button"
        class="btn btn-primary"
      >
        Tambah
      </button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Cover</th>
          <th scope="col">Judul</th>
          <th scope="col">Penulis</th>
          <th scope="col">Kategori</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in buku" :key="item.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>
            <img
              :src="item.cover"
              alt="cover"
              width="100"
              class="img-thumbnail"
            />
          </td>
          <td>{{ item.judul }}</td>
          <td>{{ item.penulis }}</td>
          <td>
            <span
              class="badge bg-dark mx-2"
              v-for="(kate, index) in item.kategori"
              :key="index"
              >{{ kate }}</span
            >
          </td>
          <td>
            <div class="d-flex gap-4">
              <!--
              untuk mengarah ke detail buku kita perlu nyisipkan params
              yang isinya id dari buku untuk nantinya dipakai get detail buku
              -->
              <button
                class="btn btn-info btn-sm"
                @click="router.push('/buku/' + item.id)"
              >
                Detail
              </button>
              <button class="btn btn-danger btn-sm">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
