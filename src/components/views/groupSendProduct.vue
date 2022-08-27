<template>
  <div class="w-full h-full overflow-y-scroll">
    <h1 class="text-3xl text-center dark:text-slate-100 text-slate-800">
      ارسال گروهی
    </h1>
    <excel-reader-section @sendData="sendData">
      <div
        class="md:w-1/2 w-3/4 mt-8 bg-yellow-500/50 text-amber-900 p-2 text-md dark:text-amber-100 rounded-xl"
      >
        <h1
          class="dark:text-amber-400 text-amber-600 text-xl font-bold"
          dir="rtl"
        >
          نکته !!
        </h1>
        <h3 class="font-bold">فایل اکسل شما باید شامل 3 ستون باشد</h3>
        <h2 class="my-1 border-t dark:border-amber-300/50 border-amber-700/30">
          ستون اول : لیبل (یا همان کد محصول)
        </h2>
        <h2 class="my-1 border-t dark:border-amber-300/50 border-amber-700/30">
          ستون دوم : نام انبار ارسال کننده (حتما باید به اون انبار دسترسی داشته
          باشید)
        </h2>
        <h2 class="my-1 border-t dark:border-amber-300/50 border-amber-700/30">
          ستون سوم : نام انبار دریافت کننده
        </h2>
      </div>
    </excel-reader-section>
    <notifications :classes="cl" />
  </div>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useCookies } from "vue3-cookies";
import router from "../../router";
import ExcelReaderSection from "../excelReaderSection.vue";

onMounted(() => {
  const { cookies } = useCookies();
  const sp = ref("");
  sp.value = Boolean(cookies.get("sp"));
  if (sp.value == false) {
    router.push("notFound");
  }
});
const cl = ref("");
function sendData(formData) {
  axios
    .post("http://localhost:8000/api/sendtootherstore", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      cl.value =
        "m-3 rounded-lg p-2 text-right bg-green-500 text-md text-slate-900 shadow-lg shadow-green-400/20";
      notify({
        title: "عملیات موفقیت امیز",
        type: "success",
        text: "عملیات ارسال محصولات با موفقیت انجام شد",
      });
    })
    .catch(() => {
      cl.value =
        "m-3 rounded-lg p-2 text-right bg-rose-500 text-md text-slate-900 shadow-lg shadow-rose-400/20";
      notify({
        title: "اوه نه!!",
        type: "error",
        text: "توی ارسال فایل به سرور به مشکل برخوردیم لطفا چک ساختار فایل ارسالی را مجددا با استاندار ارسال چک کنید",
      });
    });
}
</script>
