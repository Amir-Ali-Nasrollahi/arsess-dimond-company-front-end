<template>
  <section
    class="flex lg:flex-col flex-row justify-around flex-wrap items-center"
  >
    <h1 class="text-xl dark:text-slate-50 text-slate-800">
      تعداد کل محصولات انبار : {{ (value.data).length }}
    </h1>
    <div
      class="lg:w-5/6 md:w-1/3 w-3/4 dark:bg-sky-900 flex flex-col items-center bg-slate-100 rounded-lg h-fit p-1 transition duration-100 ease-linear hover:shadow-lg my-2 text-slate-800 dark:text-slate-50"
      v-if="active && found"
      v-for="val in value.data"
    >
      <div
        class="flex lg:justify-between lg:flex-row flex-col lg:items-center lg:text-md text-xl lg:h-20 h-fit w-full"
      >
        <h1>نام دستگاه : {{ val.product.name }}</h1>
        <h1 class="mx-">
          نوع دستگاه :
          {{
            val.product.is_own == true
              ? "اموال شرکت"
              : val.product.is_product == true
              ? "کالا فروشی"
              : "مصرفی"
          }}
        </h1>
        <h2>کد دستگاه : {{ val.product.code }}</h2>
        <h2>سریال دستگاه : {{ val.product.serial }}</h2>
        <div class="lg:w-auto w-full text-center lg:mt-0 mt-2">
          <button
            :id="val.product.id"
            @click="showDitails"
            class="text-blue-500 transition-all duration-75 ease-linear hover:underline"
          >
            جزییات
          </button>
          <button
            v-if="sp"
            @click="sendProduct(val)"
            class="bg-green-500 text-slate-50 lg:w-16 w-full h-8 rounded-lg hover:shadow-md transition-all lg:mx-2 duration-75 ease-linear"
          >
            ارسال
          </button>

          <button
            v-else
            class="bg-green-500/50 cursor-not-allowed text-slate-50 lg:w-16 w-full h-8 rounded-lg transition-all lg:mx-2 duration-75 ease-linear"
          >
            ارسال
          </button>
        </div>
      </div>

      <div class="hidden test" :id="'div' + val.product.id">
        <div v-for="des in val.product.describe">
          <h1 class="p-2 bg-slate-200 my-1 rounded-lg dark:bg-sky-800 dark:text-slate-100">{{ des.describe }}</h1>
        </div>
      </div>
    </div>
    <notFoundProduct v-else-if="!found" />
    <loadingSection v-else />
  </section>
</template>

<script>
import axios from "axios";
import { reactive, ref, watch } from "vue";
import { useCookies } from "vue3-cookies";
import loadingSection from "./loadingSection.vue";
import notFoundProduct from "./notFoundProduct.vue";
// import {} from "vue-router";
import router from "../router";
export default {
  components: {
    loadingSection,
    notFoundProduct
  },
  props: {
    val: Object,
  },
  setup(p) {
    const active = ref(false);
    const { cookies } = useCookies();
    const found = ref(true);
    const value = reactive({
      data: "",
    });
    if (p.val.search == "") {
      axios
        .post("http://localhost:8000/api/showStore", {
          _token: cookies.get("_token"),
          id: p.val.store_id,
        })
        .then(function (response) {
          value.data = response.data.value;
        })
        .catch(function () {
          found.value = false;
        })
        .finally(function () {
          active.value = true;
        });
    }
    watch(p.val, function () {
      if (p.val.search == "") {
        found.value = true;
        active.value = false;
        axios
          .post("http://localhost:8000/api/showStore", {
            _token: cookies.get("_token"),
            id: p.val.store_id,
          })
          .then(function (response) {
            found.value = true;
            value.data = response.data.value;
          })
          .catch(function () {
            found.value = false;
          })
          .finally(function () {
            active.value = true;
          });
      } else {
        found.value = true;
        active.value = false;
        axios
          .post("http://localhost:8000/api/search", {
            _token: cookies.get("_token"),
            id: p.val.store_id,
            code: p.val.search,
          })
          .then(function (response) {
            console.log(response);
            found.value = true;
            value.data = response.data.value;
          })
          .catch(function () {
            found.value = false;
          })
          .finally(function () {
            active.value = true;
          });
      }
    });
    function showDitails(e) {
      const divId = document.getElementById('div' + e.target.id).classList;
      (divId.contains("hidden")) ? divId.remove('hidden') : divId.add('hidden');
    }

    const sp = ref("");
    sp.value = Boolean(useCookies().cookies.get("sp"));
    // console.log(sp.value)
    function sendProduct(e) {
      router.push("/dashboard/sendProduct/" + e.product.id + "/" + e.store_id);
    }
    
    return {
      sendProduct,
      active,
      found,
      value,
      sp,
      showDitails
    };
  },
};
</script>

<style scoped>
.showing {
  color: #eee;
}
</style>
