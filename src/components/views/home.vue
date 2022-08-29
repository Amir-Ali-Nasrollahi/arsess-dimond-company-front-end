<template>
  <div
    class="dark:text-slate-50 text-slate-900 overflow-y-scroll h-full md:mt-0 mt-10"
  >
    <h1 class="text-4xl flex font-normal dark:text-slate-50">
      سلام
      <h2 class="text-blue-500 font-bold dark:text-amber-400">
        {{ data.name }}
      </h2>
      ، خوش اومدی !!
    </h1>
    <section
      class="flex sm:flex-row flex-col sm:items-start items-center mt-10"
    >
      <div class="flex flex-col w-5/6 sm:w-1/2">
        <h2 class="text-lg">انبارک شما</h2>
        <div class="flex flex-col mt-5" v-if="load">
          <div
            class="dark:bg-sky-900 mt-3 lg:w-4/6 md:w-5/6 w-full p-2 md:mx-0 mx-1 rounded-lg bg-slate-100"
            v-if="res.data != null"
            v-for="value in res.data"
          >
            <h1 class="text-xl pt-1 text-right">
              نام محصول :{{ value.product.name }}
            </h1>
            <h4 class="text-right text-lg">
              کد محصول: {{ value.product.code }}
            </h4>

            <h4 class="text-lg text-right px-1" dir="rtl">
              تاریخ دریافت :{{
                value.date.replace("T", " / ").replace(".000000Z", " ")
              }}
            </h4>
            <button
              v-on:click="backToStore(value.product.id)"
              class="bg-blue-500 m-1 lg:w-24 w-full h-8 rounded-xl text-white text-lg"
            >
              بازگرداندن
            </button>
          </div>
          <h3 class="dark:text-sky-600/80 text-slate-400 text-2xl" v-else>
            انبارک شما خالیه :(
          </h3>
        </div>
        <loading-section-vue v-else></loading-section-vue>
      </div>
      <div
        class="bg-indigo-400 shadow-lg text-slate-50 shadow-indigo-500/50 lg:w-1/2 w-5/6 ml-1 my-10 rounded-xl flex flex-col items-center"
      >
        <h1 class="mt-5 lg:text-lg text-xl mx-2">
          ایا میخواهیید محصولاتتان را برای انبار دیگری ارسال کنید؟
        </h1>
        <img
          src="https://free3dicon.com/wp-content/uploads/2022/04/market-300x300.png"
          alt=""
          @load="changeHidden"
          :class="{ hidden: active }"
        />
        <loading-section-vue :class="{ hidden: !active }"></loading-section-vue>
        <h3 class="text-lg lg:text-center lg:w-1/2 w-11/12 m-2">
          میدونستید اگه دسترسی داشته باشید میتونید خیلی راحت محصولات انبارتون رو
          انتقال بدید؟
        </h3>
        <h4 class="text-indigo-800">فقط باید دسترسی داشته باشی :)</h4>
        <router-link
          class="bg-indigo-700 text-xl m-3 rounded-md lg:w-fit w-5/6 text-center p-2"
          :to="'/dashboard/products/'"
          >انتقال محصولات</router-link
        >
      </div>
    </section>
    <notifications :classes="cl" />
  </div>
</template>
<script>
import { notify } from "@kyvg/vue3-notification";
import axios from "axios";
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import { useCookies } from "vue3-cookies";
import loadingSectionVue from "../loadingSection.vue";
export default {
  components: {
    loadingSectionVue,
    RouterLink,
  },
  props: {
    data: Object,
  },

  setup(props) {
    const data = props.data.data;
    const load = ref(false);
    const active = ref(true);
    const { cookies } = useCookies();
    let cl = ref(
      "m-3 rounded-lg p-2 text-right bg-green-500 text-md text-slate-900 shadow-lg shadow-green-400/20"
    );
    const res = reactive({
      data: "",
    });
    function changeHidden() {
      active.value = !active.value;
    }
    axios
      .get("http://localhost:8000/api/bag/" + cookies.get("_token"))
      .then(function (response) {
        res.data = response.data.value;
      })
      .finally(function () {
        load.value = true;
      });
    function backToStore(e) {
      axios
        .post("http://localhost:8000/api/backProduct", {
          product_id: e,
          _token: cookies.get("_token"),
        })
        .then(function () {
          notify({
            title: "عملیات موفقیت امیز",
            type: "success",
            text: "محصول با موفقیت به انبار موقت انتقال پیدا کرد ...",
          });
        });
    }
    return { data, res, load, backToStore, changeHidden, active, cl };
  },
};
</script>
