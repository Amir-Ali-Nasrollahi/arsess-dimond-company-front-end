<template>
  <section
    class="flex lg:flex-col flex-row justify-around flex-wrap items-center"
  >
    <div
      v-if="sp"
      class="md:w-1/2 w-3/4 bg-yellow-500/50 text-amber-900 p-2 text-md dark:text-amber-100 rounded-xl text-center"
    >
      <h1
        class="dark:text-amber-400 text-amber-600 text-xl font-bold"
        dir="rtl"
      >
        نکته !!
      </h1>
      <h3 class="lg:text-base text-lg">
        شما میتوانید برای ارسال محصولات از
        <router-link
          :to="{ name: 'groupSend' }"
          class="dark:text-amber-400 font-semibold hover:underline text-amber-600"
        >
          ارسال گروهی
        </router-link>
        استفاده کنید.
      </h3>
    </div>
    <div
      class="lg:w-5/6 md:w-1/3 w-3/4 dark:bg-sky-900 flex flex-col items-center bg-slate-100 rounded-lg h-fit p-1 transition duration-100 ease-linear hover:shadow-lg dark:hover:shadow-sky-600/40 hover:shadow-slate-500/10 my-2 text-slate-800 dark:text-slate-50"
      v-if="active && found"
      v-for="val in value.data"
    >
      <div
        class="flex lg:justify-between px-1 lg:flex-row flex-col lg:items-center lg:text-md text-xl lg:h-20 h-fit w-full"
      >
        <h1>نام دستگاه : {{ val.name }}</h1>
        <h1 class="mx-">
          نوع دستگاه :
          {{
            val.is_own == true
              ? "اموال شرکت"
              : val.is_product == true
              ? "کالا فروشی"
              : "مصرفی"
          }}
        </h1>
        <h2>کد دستگاه : {{ val.code }}</h2>
        <h2>سریال دستگاه : {{ val.serial }}</h2>
        <div class="lg:w-auto w-full text-center lg:mt-0 mt-2">
          <button
            :id="val.id"
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

      <div class="hidden test w-full" :id="'div' + val.id">
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg m-1">
          <table
            class="w-full text-base text-left text-gray-500 dark:text-gray-100"
          >
            <thead
              class="text-base font-bold text-gray-700 uppercase bg-gray-50 dark:bg-sky-800 dark:text-gray-100"
            >
              <tr class="text-center">
                <th scope="col" class="py-3 px-6">کاربر فرستنده</th>
                <th scope="col" class="py-3 px-6">انبار فرستنده</th>
                <th scope="col" class="py-3 px-6">کاربر گیرنده</th>
                <th scope="col" class="py-3 px-6">انبار گیرنده</th>
                <th scope="col" class="py-3 px-6">وضعیت محصول</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-t dark:bg-sky-900 dark:border-sky-700"
                v-for="des in val.describe"
              >
                <td class="py-4 px-6">{{ des.user_sender }}</td>
                <td class="py-4 px-6">
                  <h2 class="w-fit mx-auto px-2 py-1">
                    {{ des.store_sender ? des.store_sender : "-" }}
                  </h2>
                </td>
                <td class="py-4 px-6">
                  <h2 class="w-fit mx-auto px-2 py-1">
                    {{ des.user_geter ? des.user_geter : "-" }}
                  </h2>
                </td>
                <td class="py-4 px-6">
                  <h2 class="w-fit mx-auto px-2 py-1">
                    {{ des.store_geter ? des.store_geter : "-" }}
                  </h2>
                </td>
                <td class="py-4 md:px-6 px-4">
                  <h2
                    class="w-fit mx-auto px-2 py-1 rounded-lg"
                    :class="{
                      'text-green-500': des.status,
                      'bg-green-500/20': des.status,
                      'text-red-500': des.status == false,
                      'bg-red-500/20': des.status == false,
                      'bg-blue-500/20': des.status == null,
                      'text-blue-500': des.status == null,
                    }"
                  >
                    {{
                      des.status == true
                        ? "تایید شده"
                        : des.status == null
                        ? "در حال انتظار"
                        : "رد شده"
                    }}
                  </h2>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <notFoundProduct v-else-if="!found" />
    <loadingSection v-else />
    <div class="flex flex-row justify-between w-5/6 mt-3">
      <button
        class="bg-blue-500 text-lg px-2 py-1 rounded-lg text-slate-100 hover:underline"
        @click="showPrev()"
        v-if="page > 1"
      >
        صفحه قبل
      </button>
      <button
        class="bg-blue-500 text-lg px-2 py-1 shadow-none rounded-lg text-slate-100 opacity-70 cursor-not-allowed"
        v-else
      >
        صفحه قبل
      </button>
      <button
        class="bg-blue-500 text-lg px-2 py-1 rounded-lg text-slate-100 hover:underline"
        @click="showMore()"
        v-if="Object.keys(value.data).length > 0">
        صفحه بعدی
      </button>
    </div>
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
import { RouterLink, useRoute } from "vue-router";
export default {
  components: {
    loadingSection,
    notFoundProduct,
    RouterLink,
  },
  props: {
    val: Object,
  },
  setup(p) {
    const active = ref(false);
    const { cookies } = useCookies();
    const found = ref(true);
    let page = ref(1);
    page.value = useRoute().params.page ? Number(useRoute().params.page) : 1;
    const value = reactive({
      data: "",
    });
    if (p.val.search == "") {
      axios
        .post("http://localhost:8000/api/showStore?page=" + page.value, {
          _token: cookies.get("_token"),
          id: p.val.store_id,
        })
        .then(function (response) {
          value.data = response.data.value[0].data;
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
          .post("http://localhost:8000/api/showStore?page=" + page.value, {
            _token: cookies.get("_token"),
            id: p.val.store_id,
          })
          .then(function (response) {
            found.value = true;
            if (Number(response.data.value[0].data) == Number([])) {
              router.push("/notFound");
            }
            value.data = response.data.value[0].data;
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
      const divId = document.getElementById("div" + e.target.id).classList;
      divId.contains("hidden") ? divId.remove("hidden") : divId.add("hidden");
    }

    const sp = ref("");
    sp.value = Boolean(useCookies().cookies.get("sp"));

    function sendProduct(e) {
      router.push("/dashboard/sendProduct/" + e.id + "/" + e.store_id);
    }

    function showMore() {
      page.value += 1;
      router.push({ name: "products", params: { page: page.value } });
      axios
        .post("http://localhost:8000/api/showStore?page=" + page.value, {
          _token: cookies.get("_token"),
        })
        .then((response) => {
          value.data = response.data.value[0].data;
        });
    }
    function showPrev() {
      page.value -= 1;
      router.push({ name: "products", params: { page: page.value } });
      axios
        .post("http://localhost:8000/api/showStore?page=" + page.value, {
          _token: cookies.get("_token"),
        })
        .then((response) => {
          value.data = response.data.value[0].data;
        });
    }

    return {
      sendProduct,
      active,
      found,
      value,
      sp,
      showDitails,
      showMore,
      showPrev,
      page,
    };
  },
};
</script>

<style scoped>
.showing {
  color: #eee;
}
</style>
