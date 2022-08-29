<template>
  <section class="w-full" v-if="show">
    <button
      @click="showAllUser()"
      class="bg-blue-500 text-white px-2 py-1 rounded-lg hover:underline w-fit mr-10"
    >
      {{ allUser == true ? "نمایش درخواست ها" : "نمایش تمامی کاربران" }}
    </button>
    <div
      class="flex flex-col h-fit items-center w-full"
      v-for="value in res.data"
    >
      <div
        :id="'div' + value.id"
        class="dark:bg-sky-700 bg-slate-300 lg:w-11/12 w-5/6 rounded-lg p-1 h-fit flex flex-col lg:flex-row flex-wrap items-center justify-around lg:text-sm lg:font-bold text-lg mt-3"
        v-if="allUser == true ? value.status == 1 : value.status == 0"
      >
        <h1 class="lg:w-3/12 w-full md:text-right text-center">
          نام و نام خانوادگی : {{ value.name + " " + value.lastname }}
        </h1>
        <h1 class="lg:w-2/12 w-full md:text-right text-center mr-1">
          شماره : {{ value.phone }}
        </h1>
        <h1 class="lg:w-2/12 w-full md:text-right text-center mr-1">
          کدملی : {{ value.code }}
        </h1>
        <div v-for="(store, i) in value.store">
          <h1 class="mx-1 flex" v-if="i == 'name'">انبار : {{ store }}</h1>
        </div>
        <h1
          class="lg:w-2/12 w-full md:text-right text-center flex flex-col md:items-start items-center mr-1"
        >
          تاریخ ثبت نام :
          <p dir="ltr">
            {{ value.created_at.replace(".000000Z", " ").replace("T", " / ") }}
          </p>
        </h1>
        <div class="flex lg:flex-row w-4/6 flex-col h-fit" v-if="!value.status">
          <h1 class="lg:text-base text-lg">دسترسی ها‌:</h1>
          <div class="flex mx-1">
            <label
              class="lg:text-sm font-normal text-base"
              dir="rtl"
              for="makeStore"
              >ساخت انبار :
            </label>
            <input
              id="makeStore"
              type="checkbox"
              v-model="d.makeStore"
              class="lg:w-3 lg:h-3 w-5 lg:mx-0 mx-3"
            />
          </div>
          <div class="flex mx-1">
            <label
              class="lg:text-sm font-normal text-base"
              dir="rtl"
              for="addProduct"
              >ساخت محصول :
            </label>
            <input
              id="addProduct"
              type="checkbox"
              v-model="d.addProduct"
              class="lg:w-3 lg:h-3 w-5 lg:mx-0 mx-3"
            />
          </div>
          <div class="flex mx-1">
            <label
              class="lg:text-sm font-normal text-base"
              dir="rtl"
              for="authUser"
              >تایید کاربر :
            </label>
            <input
              id="authUser"
              type="checkbox"
              v-model="d.authUser"
              class="lg:w-3 lg:h-3 w-5 lg:mx-0 mx-3"
            />
          </div>
          <div class="flex mx-1">
            <label
              class="lg:text-sm font-normal text-base"
              dir="rtl"
              for="authProduct"
              >تایید محصولات :
            </label>
            <input
              id="authProduct"
              type="checkbox"
              v-model="d.authProduct"
              class="lg:w-3 lg:h-3 w-5 lg:mx-0 mx-3"
            />
          </div>
          <div class="flex mx-1">
            <label
              class="lg:text-sm font-normal text-base"
              dir="rtl"
              for="sendProduct"
              >ارسال محصولات :
            </label>
            <input
              id="sendProduct"
              type="checkbox"
              v-model="d.sendProduct"
              class="lg:w-3 lg:h-3 w-5 lg:mx-0 mx-3"
            />
          </div>
          <div class="flex mx-1">
            <label
              class="lg:text-sm font-normal text-base"
              dir="rtl"
              for="sendProduct"
              >ورود محصولات :
            </label>
            <input
              id="sendProduct"
              type="checkbox"
              v-model="d.loginProduct"
              class="lg:w-3 lg:h-3 w-5 lg:mx-0 mx-3"
            />
          </div>
          <div class="flex mx-1">
            <label
              class="lg:text-sm font-normal text-base"
              dir="rtl"
              for="sendProduct"
              >ادمین است؟ :
            </label>
            <input
              id="sendProduct"
              type="checkbox"
              v-model="d.isAdmin"
              class="lg:w-3 lg:h-3 w-5 lg:mx-0 mx-3"
            />
          </div>
        </div>

        <div
          class="flex lg:flex-row justify-around flex-col h-fit w-full"
          v-else
        >
          <h1 class="lg:text-base text-lg">دسترسی ها‌:</h1>
          <div class="flex mx-1">
            <h1>ساخت انبار : {{ value.own.makeStore == 1 ? "بله" : "خیر" }}</h1>
          </div>
          <div class="flex mx-1">
            <h1>
              ساخت محصول : {{ value.own.addProducts == 1 ? "بله" : "خیر" }}
            </h1>
          </div>
          <div class="flex mx-1">
            <h1>
              دریافت محصول : {{ value.own.authProducts == 1 ? "بله" : "خیر" }}
            </h1>
          </div>
          <div class="flex mx-1">
            <h1>
              مدیریت کاربران : {{ value.own.authUser == 1 ? "بله" : "خیر" }}
            </h1>
          </div>
          <div class="flex mx-1">
            <h1>
              ارسال محصول : {{ value.own.sendProducts == 1 ? "بله" : "خیر" }}
            </h1>
          </div>
          <div class="flex">
            <h1>انبار ها :</h1>
            <h3
              class="mr-1 dark:bg-sky-800 bg-slate-200 px-1 rounded-lg"
              v-for="val in value.storeUserRelation"
            >
              {{ val.name }}
            </h3>
          </div>
        </div>

        <div v-if="!value.status" class="flex flex-row items-center">
          <label for="stores" class="lg:text-base w-10 text-xl font-normal"
            >انبار :
          </label>
          <select-input-vue
            @sendStoreValue="getStoreValue"
            :data="stores.value"
            v-if="show"
          ></select-input-vue>
        </div>
        <div
          class="flex lg:flex-row flex-col items-center w-full justify-center mx-1 mt-2"
        >
          <button
            v-if="!value.status"
            class="lg:text-sm text-lg font-bold bg-green-500 lg:w-fit w-2/3 p-1 px-2 lg:h-8 h-fit rounded-md"
            @click="authUser(value.id)"
          >
            تایید کاربر
          </button>

          <button
            v-else
            class="lg:text-sm text-lg font-bold bg-green-500/50 px-2 p-1 text-slate-800/50 cursor-not-allowed lg:w-fit w-2/3 lg:h-8 h-fit rounded-md"
          >
            تایید کاربر
          </button>

          <button
            v-if="value.status"
            class="lg:text-sm text-lg font-bold bg-amber-500 lg:w-fit w-2/3 lg:h-8 h-fit px-2 rounded-md lg:mr-1 lg:mt-0 mt-2 p-1"
            @click="updateUser(value.id)"
          >
            بروزرسانی اطلاعات
          </button>
          <button
            class="lg:text-sm text-lg font-bold bg-red-500 lg:w-fit w-2/3 lg:h-8 h-fit px-2 rounded-md lg:mr-1 lg:mt-0 mt-2 p-1"
            @click="deleteUser(value.id)"
          >
            حذف کاربر
          </button>
        </div>
      </div>
    </div>
    <notifications :classes="cl" />
  </section>
  <loading-section
    v-else
    class="w-full flex flex-row justify-center"
  ></loading-section>
</template>

<script>
import { notify } from "@kyvg/vue3-notification";
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useCookies } from "vue3-cookies";
import loadingSection from "../loadingSection.vue";
import router from "../../router";
import selectInputVue from "../selectInput.vue";

export default {
  components: {
    loadingSection,
    selectInputVue,
  },
  setup() {
    const d = reactive({
      id: "",
      stores_name: null,
      authUser: false,
      authProduct: false,
      makeStore: false,
      sendProduct: false,
      addProduct: false,
      loginProduct: false,
      isAdmin:false,
    });
    const show = ref(false);
    let cl = ref(
      "m-3 rounded-lg p-2 text-right bg-rose-500 text-md text-slate-900 shadow-lg shadow-rose-400/20"
    );
    const res = reactive({
      data: "",
    });
    const { cookies } = useCookies();

    onMounted(() => {
      axios
        .get("http://localhost:8000/api/checkOwn/" + cookies.get("_token"))
        .then(function (response) {
          if (response.data.value.authUser == false) {
            router.push("/notFound");
          }
        })
        .catch(function () {
          router.push("/notFound");
        });
    });
    const stores = ref("");
    axios
      .get("http://localhost:8000/api/getAllStores/" + cookies.get("_token"))
      .then(function (re) {
        stores.value = re.data;
      })
      .catch(function () {
        notify({
          title: "خطا در ارتباط با سرور",
          type: "error",
          text: "ارتباط با سرور با مشکل روبه رو شد لطفا مجددا صفحه را رفرش کنید",
        });
        cl.value =
          "m-3 rounded-lg p-2 text-right bg-rose-500 text-md text-slate-900 shadow-lg shadow-rose-400/20";
      });

    axios
      .get("http://localhost:8000/api/users/" + cookies.get("_token"))
      .then(function (response) {
        res.data = response.data.value;
      })
      .finally(function () {
        show.value = true;
      });
    const allUser = ref(false);
    function showAllUser() {
      allUser.value = !allUser.value;
    }
    function authUser(e) {
      d.id = e;
      axios
        .patch("http://localhost:8000/api/users/" + cookies.get("_token"), d)
        .then(function (re) {
          document.getElementById("div" + d.id).classList.add("hidden");

          cl.value =
            "m-3 rounded-lg p-2 text-right bg-green-500 text-md text-slate-900 shadow-lg shadow-green-400/20";
          notify({
            title: "عملیات موفقیت امیز",
            type: "success",
            text: "کاربر مورد نظر با موفقیت تایید شد:)",
          });
        })
        .catch(() => {
          cl.value =
            "m-3 rounded-lg p-2 text-right bg-rose-500 text-md text-slate-900 shadow-lg shadow-rose-400/20";
          notify({
            title: "خطا در ارتباط با سرور",
            type: "error",
            text: "ارتباط با سرور با مشکل روبه رو شد لطفا مجددا صفحه را رفرش کنید",
          });
        });
    }

    function getSelectValue(e) {
      d.store_id = Number(e.target.value);
    }
    function deleteUser(e) {
      axios
        .delete(
          "http://localhost:8000/api/users/" + cookies.get("_token") + "/" + e
        )
        .then(function (re) {
console.log(re);
          cl.value =
            "m-3 rounded-lg p-2 text-right bg-green-500 text-md text-slate-900 shadow-lg shadow-green-400/20";
          notify({
            title: "عملیات موفقیت امیز",
            type: "success",
            text: "کاربر مورد نظر با موفقیت حذف شد:)",
          });
        })
        .catch(() => {
          cl.value =
            "m-3 rounded-lg p-2 text-right bg-rose-500 text-md text-slate-900 shadow-lg shadow-rose-400/20";
          notify({
            title: "خطا در ارتباط با سرور",
            type: "error",
            text: "ارتباط با سرور با مشکل روبه رو شد لطفا مجددا صفحه را رفرش کنید",
          });
        });
    }

    function getStoreValue(val) {
      d.stores_name = val;
    }
    function updateUser(e) {
      router.push({ name: "editProfile", params: { user_id: e } });
    }
    return {
      show,
      showAllUser,
      getSelectValue,
      res,
      authUser,
      cl,
      deleteUser,
      stores,
      d,
      allUser,
      getStoreValue,
      updateUser,
    };
  },
};
</script>
