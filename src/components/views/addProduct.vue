<template>
  <div class="w-full flex flex-col mt-10 items-center justify-center">
    <router-link
      :to="{ name: 'excel' }"
      class="bg-blue-500 text-white px-2 py-1 self-start mx-5 rounded-lg"
      >ورود گروهی</router-link
    >
    <h1 class="text-3xl">ورود محصول</h1>
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
      <div class="md:w-1/2 w-3/4 mt-3">
        <label class="md:text-sm text-md" for="code">کد محصول(حداقل 5 رقم)</label>
        <input
          v-model="data.code"
          id="code"
          class="w-full mt-1 rounded-lg text-lg dark:bg-sky-700 h-10 bg-slate-100"
          type="number"
          min="100000"
        />
      </div>

      <div class="md:w-1/2 w-3/4 mt-3">
        <label class="md:text-sm text-md" for="code">سریال محصول</label>
        <input
          v-model="data.serial"
          id="code"
          class="w-full mt-1 rounded-lg text-lg dark:bg-sky-700 h-10 bg-slate-100"
          type="number"
          min="100000"
          max="1000000"
        />
      </div>

      <div class="md:w-1/2 w-3/4 mt-3">
        <label class="md:text-sm text-md" for="code">دسته محصول</label>

        <input
          v-model="data.category"
          class="w-full mt-1 rounded-lg px-2 text-lg dark:bg-sky-700 h-10 bg-slate-100"
          list="browsers"
        />

        <datalist class="text-xl" id="browsers">
          <option v-for="cat in category" :value="cat.name">
            {{ cat.name }}
          </option>
        </datalist>
      </div>

      <div class="md:w-1/2 w-3/4 mt-3">
        <label class="md:text-sm text-md" for="code">به کدام انبار ؟</label>

        <input
          v-model="data.store"
          class="w-full mt-1 rounded-lg text-lg dark:bg-sky-700 px-2 h-10 bg-slate-100"
          list="stores"
        />
        <datalist class="text-xl" id="stores">
          <option v-for="store in stores" :value="store.name">
            {{ store.name }}
          </option>
        </datalist>
      </div>
      <div class="md:w-1/2 w-3/4 mt-3">
        <label class="md:text-sm text-md" for="code">imei دستگاه (اختیاری)</label>
        <input
          v-model="data.imei"
          id="imei"
          class="w-full mt-1 rounded-lg text-lg dark:bg-sky-700 h-10 bg-slate-100"
          type="number"
        />
      </div>
      <div
        class="md:w-1/2 w-3/4 mt-3 flex flex-row justify-center items-center"
      >
        <label class="md:text-sm text-md" for="count"
          >محصول ، اموال شرکت است؟</label
        >
        <input
          id="count"
          class="w-4 mt-1 mx-3 rounded-lg text-lg dark:bg-sky-700 h-4 bg-slate-100"
          name="count"
          type="radio"
          @click="changeIsOwnValue('is_own')"
        />
      </div>
      <div
        class="md:w-1/2 w-3/4 mt-3 flex flex-row justify-center items-center"
      >
        <label class="md:text-sm text-md" for="is_spent"
          >محصول مصرفی است؟</label
        >
        <input
          id="is_spent"
          name="count"
          class="w-4 mt-1 mx-3 rounded-lg text-lg dark:bg-sky-700 h-4 bg-slate-100"
          type="radio"
          checked
          @click="changeIsOwnValue('spend')"
        />
      </div>
      <div
        class="md:w-1/2 w-3/4 mt-3 flex flex-row justify-center items-center"
      >
        <label class="md:text-sm text-md" for="is_product"
          >کالا فروشی است؟</label
        >
        <input
          id="is_product"
          name="count"
          class="w-4 mt-1 mx-3 rounded-lg text-lg dark:bg-sky-700 h-4 bg-slate-100"
          type="radio"
          @click="changeIsOwnValue('is_product')"
        />
      </div>
      <div
        class="md:w-1/2 w-3/4 mt-3 bg-yellow-500/50 text-amber-900 p-2 text-md dark:text-amber-100 rounded-xl"
      >
        <h1
          class="dark:text-amber-400 text-amber-600 text-xl font-bold"
          dir="rtl"
        >
          نکته !!
        </h1>
        شما میتوانید تمامی این مراحل را در اکسل انجام دهید و سپس در سایت اپلود
        کنید
        <br />
        برای این کار
        <router-link
          :to="'/dashboard/requests/withexcel'"
          class="font-bold dark:hover:text-amber-400 hover:text-amber-600 hover:underline mx-1"
        >
          راهنما
        </router-link>
        را بخوانید.
      </div>
      <div class="md:w-1/2 w-3/4 mt-3 flex flex-row justify-center">
        <input
          class="w-fit px-5 mt-1 text-xl font-bold rounded-lg h-8 cursor-pointer bg-green-500"
          type="submit"
          value="تایید"
        />
      </div>
    </form>
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
function changeIsOwnValue(val) {
  data.spend = false;
  data.is_own = false;
  data.is_product = false;
  if (val == "spend") {
    data.spend = true;
  } else if (val == "is_product") {
    data.is_product = true;
  } else {
    data.is_own = true;
  }

}
onMounted(() => {
  axios
    .get("http://localhost:8000/api/checkOwn/" + cookies.get("_token"))
    .then(function (response) {
      if (response.data.value.loginProduct == 0) {
        router.push("/notFound");
      }
    })
    .catch(function () {
      router.push("/notFound");
    });
});

const data = reactive({
  name: "",
  code: "",
  category: "",
  imei:"",
  store: "",
  serial: "",
  spend: false,
  is_own: false,
  is_product: false,
  _token: cookies.get("_token"),
});
let cl = ref(
  "m-3 rounded-lg p-2 text-right bg-rose-500 text-md text-slate-900 shadow-lg shadow-rose-400/20"
);
const category = ref("");
const stores = ref("");
axios
  .get("http://localhost:8000/api/category/" + data._token)
  .then(function (res) {
    category.value = res.data.value;
  });
axios
  .get("http://localhost:8000/api/getAllStores/" + data._token)
  .then(function (res) {
    stores.value = res.data.value;
  });
function submit() {
  axios
    .post("http://localhost:8000/api/product", data)
    .then(function (re) {

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
</script>
