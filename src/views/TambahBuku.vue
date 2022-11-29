<script setup>
import { reactive, ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import axios from "axios";
import { useRouter } from "vue-router";
import { faker } from "@faker-js/faker";
import * as Yup from "yup";
import MyInput from "../components/Input.vue";

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

const addBuku = (values) => {
  const data = {
    judul: values.judul,
    penulis: values.penulis,
    kategori: values.kategori,
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

const schema = Yup.object().shape({
  judul: Yup.string().required("Judul harus diisi"),
  penulis: Yup.string().required("Penulis harus diisi"),
  kategori: Yup.array()
    .min(2, "Min 2 Kategori")
    .required("Kategori harus diisi"),
});
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4">Tambah Buku</h1>
    <Form @submit="addBuku" :validation-schema="schema" v-slot="{ errors }">
      <MyInput
        title="Judul"
        name="judul"
        type="text"
        :errors="errors.judul"
        placeholder="Masukkan Judul"
      />
      <MyInput
        title="Penulis"
        name="penulis"
        type="text"
        :errors="errors.penulis"
        placeholder="Masukkan penulis"
      />
      <MyInput
        title="Kategori"
        name="kategori"
        type="checkbox"
        :errors="errors.kategori"
        placeholder="Masukkan kategori"
        :data="kategori"
      />
      <button type="submit" class="btn btn-primary">Simpan</button>
    </Form>
  </div>
</template>
