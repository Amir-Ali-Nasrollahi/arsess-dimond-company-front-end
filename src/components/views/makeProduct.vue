<template>
  <div class="w-full flex flex-col mt-10 items-center justify-center">
    <h1 class="text-3xl">ساخت محصول</h1>
    <form
      class="mt-5 lg:w-2/3 w-11/12 flex flex-col items-center"
      @submit.prevent="submit"
    >
      <div class="md:w-1/2 w-3/4">
        <label class="md:text-sm text-md" for="name">نام محصول</label>
        <input
          id="name"
          v-model="data.name"
          class="w-full mt-1 rounded-lg dark:bg-sky-700 h-10 bg-slate-100"
          type="text"
        />
      </div>
      <div class="md:w-1/2 w-3/4 mt-3 flex flex-row justify-center">
        <input
          class="w-fit px-5 mt-1 text-xl font-bold rounded-lg h-8 cursor-pointer bg-green-500"
          type="submit"
          value="تایید"
        />
      </div>
    </form>
    <h1 class="text-3xl mt-10">لیست دسته محصول ها</h1>
    <div class="flex flex-col flex-wrap w-2/3 justify-around">
      <div
        class="dark:bg-sky-900 bg-slate-100 px-2 py-1 mx-2 rounded flex flex-col lg:flex-row justify-around text-xl mt-2"
        v-for="value in allCategory.data"
      >
        <h1>نام دسته : {{ value.name }}</h1>
        <h1>
          تاریخ ساخت :‌{{
            value.created_at.replace("T", " / ").replace(".000000Z", " ")
          }}
        </h1>
        <button
          class="bg-red-500 text-slate-100 lg:w-20 w-full rounded-lg"
          v-on:click="deleteCategory(value.id)"
        >
          حذف
        </button>
      </div>
    </div>
    <notifications :classes="cl" />
  </div>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useCookies } from "vue3-cookies";
import router from "../../router/index.js";

const { cookies } = useCookies();

onMounted(() => {
  axios
    .get("http://localhost:8000/api/checkOwn/" + cookies.get("_token"))
    .then(function (response) {
      if (response.data.value.addProducts == 0) {
        router.push("/notFound");
      }
    })
    .catch(function () {
      router.push("/notFound");
    });
});

const data = reactive({
  name: "",
  _token: cookies.get("_token"),
});
let cl = ref(
  "m-3 rounded-lg p-2 text-right bg-rose-500 text-md text-slate-900 shadow-lg shadow-rose-400/20"
);
function submit() {
  axios
    .post("http://localhost:8000/api/category", data)
    .then(function () {
      cl.value =
        "m-3 rounded-lg p-2 text-right bg-green-500 text-md text-slate-900 shadow-lg shadow-green-400/20";
      notify({
        title: "عملیات موفقیت امیز",
        type: "success",
        text: "محصول با موفقیت ورود پیدا کرد ...",
      });
    })
    .catch(function () {
      cl.value =
        "m-3 rounded-lg p-2 text-right bg-rose-500 text-md text-slate-900 shadow-lg shadow-rose-400/20";
      notify({
        title: "عملیات با خطا مواجه شد",
        type: "error",
        text: "یه مشکلی در ارتباط با سرور پیش اومده لطفا دوباره امتحان کنید",
      });
    });
}
const allCategory = reactive({
  data: "",
});
axios
  .get("http://localhost:8000/api/category/" + cookies.get("_token"))
  .then((re) => {
    allCategory.data = re.data.value;
    console.log(re);
  });

const deleteCategory = (e) => {
  axios
    .delete(
      "http://localhost:8000/api/deleteCategory/" + cookies.get("_token") + "/" + e
    )
    .then(function () {
      cl.value =
        "m-3 rounded-lg p-2 text-right bg-green-500 text-md text-slate-900 shadow-lg shadow-green-400/20";
      notify({
        title: "عملیات موفقیت امیز",
        type: "success",
        text: "محصول با موفقیت حذف شد ...",
      });
    });
};
</script>
