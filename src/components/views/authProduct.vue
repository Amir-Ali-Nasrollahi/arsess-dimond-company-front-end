<template>
  <div
    class="flex w-full lg:flex-col lg:items-center items-start lg:justify-start justify-center flex-wrap flex-row"
  >
    <div
      v-if="load == true && show == true"
      class="flex dark:bg-sky-700 p-2 rounded-xl bg-slate-300 mt-5 lg:w-11/12 w-3/4 lg:flex-row lg:items-center lg:justify-between flex-col text-md"
      v-for="value in d.value"
      :id="'div' + value.ditails_id"
    >
      <h2 class="flex flex-wrap">
        نام محصول :
        <h3 class="font-bold">{{ value.product.name }}</h3>
      </h2>
      <h2 class="flex flex-wrap">
        کد محصول :
        <h3 class="font-bold">{{ value.product.code }}</h3>
      </h2>
      <h2 class="flex flex-wrap">
        نوع :
        <h3 class="font-bold">{{ (value.product.is_own == 1) ? "اموال شرکت":"محصول مصرفی" }}</h3>
      </h2>
      <h2 class="flex flex-wrap w-16 lg:mx-1 mx-0">
        تعداد :
        <h3 class="font-bold">{{ value.count }}</h3>
      </h2>
      <h2 class="flex flex-wrap">
        کاربر ارسال کننده :
        <h3 class="font-bold">
          {{ value.user_sender.name + " " + value.user_sender.lastname }}
        </h3>
      </h2>
      <h2 class="flex flex-wrap">
        تاریخ ارسال :
        <h3 class="font-bold">
          {{ value.date.replace("T", "  /").replace(".000000Z", "") }}
        </h3>
      </h2>
      <div class="flex lg:flex-row flex-col">
        <button
          class="lg:mx-2 mx-0 h-fit bg-green-500 rounded-xl lg:mt-0 mt-3 font-bold lg:w-fit p-2 lg:py-1 py-2 w-full"
          @click="confirmProductRequests(value.ditails_id)"
        >
          تایید دریافت
        </button>
        <button
          class="bg-red-500 h-fit text-white rounded-xl lg:mt-0 mt-3 font-bold lg:w-fit p-2 lg:py-1 py-2 w-full"
          @click="deleteProductRequests(value.ditails_id)"
        >
          لغو دریافت
        </button>
      </div>
    </div>
    <h1
      class="text-3xl mt-10 dark:text-sky-500 text-slate-400"
      v-else-if="show == false && load == true"
    >
      هیچ محصول دریافتی وجود ندارد :(
    </h1>
    <loading-section v-else></loading-section>
    <notifications :classes="cl" />
  </div>
</template>

<script setup>
import loadingSection from "../loadingSection.vue";
import { notify } from "@kyvg/vue3-notification";
import axios from "axios";
import { reactive, ref, watch } from "vue";
import { useCookies } from "vue3-cookies";

const cookie = useCookies().cookies.get("_token");
const d = reactive({
  value: "",
});
const load = ref(false);
const show = ref(true);
let cl = ref(
  "m-3 rounded-lg p-2 text-right bg-rose-500 text-md text-slate-900 shadow-lg shadow-rose-400/20"
);
axios
  .get("http://localhost:8000/api/store/" + cookie)
  .then(function ({ data }) {
    d.value = data;
  })
  .catch(function (re) {
    if (re.response.status == 404) {
      show.value = false;
    }
  })
  .finally(function () {
    load.value = true;
  });
const data = reactive({
  id: "",
});
function confirmProductRequests(e) {
  data.id = e;
  axios
    .patch("http://localhost:8000/api/store/" + cookie, data)
    .then(function () {
      document.getElementById("div" + data.id).classList.add("hidden");
      cl.value =
        "m-3 rounded-lg p-2 text-right bg-green-500 text-md text-slate-900 shadow-lg shadow-green-400/20";
      notify({
        title: "عملیات موفقیت امیز",
        type: "success",
        text: "عملیات تایید محصول با موفقیت انجام شد",
      });
    })
    .catch(function () {
      notify({
        title: "اوه نه!!",
        type: "error",
        text: "توی ارتباط با سرور به مشکل برخوردیم لطفا دوباره تلاش کنید",
      });
    });
}
function deleteProductRequests(e) {
  data.id = e;
  axios
    .delete("http://localhost:8000/api/deletestoreditails/" + cookie + "/" + e)
    .then(function () {
      cl.value =
        "m-3 rounded-lg p-2 text-right bg-green-500 text-md text-slate-900 shadow-lg shadow-green-400/20";
      notify({
        title: "عملیات موفقیت امیز",
        type: "success",
        text: "عملیات رد درخواست با موفقیت انجام شد",
      });
      document.getElementById("div" + data.id).classList.add("hidden");
    })
    .catch(function () {
      notify({
        title: "اوه نه!!",
        type: "error",
        text: "توی ارتباط با سرور به مشکل برخوردیم لطفا دوباره تلاش کنید",
      });
    });
}
</script>
