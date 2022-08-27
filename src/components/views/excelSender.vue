<template>
  <div class="w-full">
    <div class="w-fit mx-5 mt-10 pt-1">
      <router-link
        :to="'/dashboard/requests/addProduct'"
        class="bg-blue-500 px-2 py-1 self-start rounded-lg"
        >ورود تکی</router-link
      >
    </div>
    <h1 class="text-3xl text-center">ورود گروهی</h1>

    <excel-reader-section-vue @sendData="sendData">
      <div
        class="md:w-1/2 w-3/4 mt-8 bg-yellow-500/50 text-amber-900 p-2 text-md dark:text-amber-100 rounded-xl"
      >
        <h1
          class="dark:text-amber-400 text-amber-600 text-xl font-bold"
          dir="rtl"
        >
          نکته !!
        </h1>
        <h3 class="font-bold">فایل اکسل شما باید شامل 8 ستون باشد</h3>
        <h2>ستون اول : نام محصول</h2>
        <h2>ستون دوم : نام انبار</h2>
        <h2>ستون سوم : سریال محصول</h2>
        <h2>ستون چهارم : کد شش رقمی</h2>
        <h2>ستون پنجم : دسته محصول</h2>
        <h2>ستون ششم : محصول اموال شرکت است؟ (باید با صفر و یک باشد)</h2>
        <h2>ستون هفتم : محصول مصرفی است؟ (باید با صفر و یک باشد)</h2>
        <h2>ستون هشتم : محصول کالا فروشی است؟ (باید با صفر و یک باشد)</h2>

        <h1 class="font-bold">یک یعنی بله صفر یعنی خیر</h1>
      </div>
    </excel-reader-section-vue>
    <notifications :classes="cl" />
  </div>
</template>

<script>
import { notify } from "@kyvg/vue3-notification";
import axios from "axios";
import { ref } from "vue";
import excelReaderSectionVue from "../excelReaderSection.vue";
export default {
  components: {
    excelReaderSectionVue,
  },
  setup() {
    const cl = ref("");
    function sendData(formData) {
      axios
        .post("http://localhost:8000/api/product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          cl.value =
            "m-3 rounded-lg p-2 text-right bg-green-500 text-md text-slate-900 shadow-lg shadow-green-400/20";
          notify({
            title: "عملیات موفقیت امیز",
            type: "success",
            text: "عملیات ارسال محصولات با موفقیت انجام شد",
          });
        })
        .catch(function () {
          notify({
            title: "اوه نه!!",
            type: "error",
            text: "توی ارسال فایل به سرور به مشکل برخوردیم لطفا چک ساختار فایل ارسالی را مجددا با استاندار ارسال چک کنید",
          });
        });
    }

    return { sendData, cl };
  },
};
</script>
