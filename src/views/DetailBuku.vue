<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const dataDetail = reactive({
  form: {},
});

const kategori = ref([
  "Fiksi",
  "Non Fiksi",
  "Komik",
  "Novel",
  "Biografi",
  "Ensiklopedia",
]);

const router = useRouter();
// Pertama kita perlu mendapatkan params (2) dari url browser kita ex: http://localhost:5173/buku/1
// dan kita tampung di variable idBuku
const idBuku = useRoute().params.id;

// Setelah Dapatkan id buku => kita pakai untuk get Detail Buku dengan url /data/{masukkan dgn idBuku}
const getDetailBuku = async () => {
  await axios
    .get("http://localhost:3000/buku/" + idBuku) // Outputnya ex: http://localhost:3000/buku/3
    .then((res) => {
      // masukkan respon api (res.data) ke variable dataDetail.form
      dataDetail.form = res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const editBuku = async () => {
  // untuk method/fungsi ini tidak beda jauh dengan method tambahBuku
  const dataEdit = {
    ...dataDetail.form, // Agar data yang tidak diedit tidak hilang (id, cover)
    judul: dataDetail.form.judul,
    penulis: dataDetail.form.penulis,
    kategori: dataDetail.form.kategori,
  };
  /*
  hanya saja.. karena kita akan melakukan edit HTTP request method yang bakalan di pakai yaitu put/PUT
  yang rumusnya... 
  axios.put('url/id', dataEdit)

  note: ada beberapa http methods yang perlu kita ketahui,
        tapi yang bakal sering dipakai ada 4 (GET, POST, PUT, DELETE).
        selengkapnya https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
  */
  axios
    .put("http://localhost:3000/buku/" + idBuku, dataEdit)
    .then((res) => {
      alert(`Berhasil Mengubah buku ${res.data.judul}`);
      // Setelah berhasil edit kita redirect/pergi ke list buku
      router.push("/buku");
    })
    .catch((err) => {
      alert(err);
    });
};

onMounted(() => {
  getDetailBuku();
});
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4">Detail Buku</h1>
    <img
      :src="dataDetail.form.cover"
      alt=""
      width="100"
      class="img-thumbnail mb-3"
    />
    <form @submit.prevent="editBuku">
      <div class="mb-3">
        <label for="judul" class="form-label">Judul</label>
        <input
          type="text"
          class="form-control"
          id="judul"
          placeholder="Masukkan Judul Buku"
          v-model="dataDetail.form.judul"
        />
      </div>
      <div class="mb-3">
        <label for="Penulis" class="form-label">Penulis</label>
        <input
          type="text"
          class="form-control"
          id="Penulis"
          placeholder="Masukkan Penulis Buku"
          v-model="dataDetail.form.penulis"
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
            v-model="dataDetail.form.kategori"
            :id="item"
            :value="item"
          />
          <label class="form-check-label" :for="item">{{ item }}</label>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Edit</button>
    </form>
  </div>
</template>
