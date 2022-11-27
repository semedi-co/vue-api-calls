<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { faker } from "@faker-js/faker";

const kategori = ref([
  "Fiksi",
  "Non Fiksi",
  "Komik",
  "Novel",
  "Biografi",
  "Ensiklopedia",
  "Kamus",
]);

const form = reactive({
  judul: "",
  penulis: "",
  kategori: [],
});

const router = useRouter();

const tambahBuku = async () => {
  const data = {
    judul: form.judul,
    penulis: form.penulis,
    kategori: form.kategori,
    cover: faker.image.abstract(200, 300, true),
  };
  axios
    .post("http://localhost:3000/buku", data)
    .then((res) => {
      alert(`Berhasil menambahkan buku ${res.data.judul}`);
      router.push("/buku");
    })
    .catch((err) => {
      alert(err);
    });
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4">Tambah Buku</h1>
    <form @submit.prevent="tambahBuku">
      <div class="mb-3">
        <label for="judul" class="form-label">Judul</label>
        <input
          type="text"
          class="form-control"
          id="judul"
          placeholder="Masukkan Judul Buku"
          v-model="form.judul"
        />
      </div>
      <div class="mb-3">
        <label for="Penulis" class="form-label">Penulis</label>
        <input
          type="text"
          class="form-control"
          id="Penulis"
          placeholder="Masukkan Penulis Buku"
          v-model="form.penulis"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Kategori</label>
        <br />
        <div
          class="form-check form-check-inline"
          v-for="(item, index) in kategori"
          :key="index"
        >
          <input
            class="form-check-input"
            type="checkbox"
            v-model="form.kategori"
            :id="item"
            :value="item"
          />
          <label class="form-check-label" :for="item">{{ item }}</label>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Simpan</button>
    </form>
  </div>
</template>
