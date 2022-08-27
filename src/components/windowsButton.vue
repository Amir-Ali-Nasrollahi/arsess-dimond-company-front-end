<template>
  <section
    class="flex flex-row justify-around flex-wrap text-xl font-bold"
    v-if="load"
  >
    <div
      id="window"
      v-if="data.response.value.authUser"
      v-on:click="pushing_to('/dashboard/requests/authUser')"
      class="lg:w-32 w-28 rounded-2xl lg:h-28 h-24 bg-slate-300 dark:bg-sky-700 transition-all duration-75 ease-linear hover:shadow-lg text-center cursor-pointer p-1 flex flex-row items-center justify-center dark:text-slate-50 text-slate-800 mx-1 lg:mt-0 mt-4"
    >
      درخواست های کاربران
    </div>
    <div
      v-if="data.response.value.addProducts"
      id="window"
      v-on:click="pushing_to('/dashboard/requests/addProduct')"
      class="lg:w-32 w-28 rounded-2xl lg:h-28 h-24 bg-slate-300 dark:bg-sky-700 transition-all duration-75 ease-linear hover:shadow-lg text-center cursor-pointer p-1 flex flex-row items-center justify-center dark:text-slate-50 text-slate-800 mx-1 lg:mt-0 mt-4"
    >
      ورود محصول
    </div>

    <div
      v-if="data.response.value.addProducts"
      id="window"
      v-on:click="pushing_to('/dashboard/requests/makeProduct')"
      class="lg:w-32 w-28 rounded-2xl lg:h-28 h-24 bg-slate-300 dark:bg-sky-700 transition-all duration-75 ease-linear hover:shadow-lg text-center cursor-pointer p-1 flex flex-row items-center justify-center dark:text-slate-50 text-slate-800 mx-1 lg:mt-0 mt-4"
    >
      ساخت محصول
    </div>

    <div
      id="window"
      v-if="data.response.value.makeStore"
      v-on:click="pushing_to('/dashboard/requests/addStore')"
      class="lg:w-32 w-28 rounded-2xl lg:h-28 h-24 bg-slate-300 dark:bg-sky-700 transition-all duration-75 ease-linear hover:shadow-lg text-center cursor-pointer p-1 flex flex-row items-center justify-center dark:text-slate-50 text-slate-800 mx-1 lg:mt-0 mt-4"
    >
      ایجاد انبار
    </div>
    <div
      v-if="data.response.value.authProducts"
      id="window"
      v-on:click="pushing_to('/dashboard/requests/getProduct')"
      class="lg:w-32 w-28 rounded-2xl lg:h-28 h-24 bg-slate-300 dark:bg-sky-700 transition-all duration-75 ease-linear hover:shadow-lg text-center cursor-pointer p-1 flex flex-row items-center justify-center dark:text-slate-50 text-slate-800 mx-1 lg:mt-0 mt-4"
    >
      دریافت محصولات
    </div>

  </section>
  <loadingSection
    class="w-full flex flex-row justify-center"
    v-else
  ></loadingSection>
</template>

<script>
import loadingSection from "./loadingSection.vue";
import axios from "axios";
import router from "../router";
import { useCookies } from "vue3-cookies";
import { reactive, ref } from "vue";
export default {
  components: {
    loadingSection,
  },
  setup() {
    const data = reactive({
      response: "",
    });
    const load = ref(false);
    function pushing_to(address) {
      router.push(address);
    }
    const { cookies } = useCookies();
    axios
      .get("http://localhost:8000/api/checkOwn/" + cookies.get("_token"))
      .then(function (response) {
        data.response = response.data;
      })
      .finally(function () {
        load.value = true;
      });
    return { pushing_to, load, data };
  },
};
</script>
