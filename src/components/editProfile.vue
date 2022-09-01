<template>
  <div>
    <div
      class="dark:bg-sky-700 bg-slate-300 lg:w-11/12 w-5/6 rounded-lg p-1 h-fit flex flex-col lg:flex-row flex-wrap items-center justify-around lg:text-sm lg:font-bold text-lg mt-3"
    >
      <!-- {{value.user.name}} -->
      <h1 class="lg:w-3/12 w-full md:text-right text-center">
        نام و نام خانوادگی : {{ value.user.name + " " + value.user.lastname }}
      </h1>
      <h1 class="lg:w-2/12 w-full md:text-right text-center mr-1">
        شماره : {{ value.user.phone }}
      </h1>
      <h1 class="lg:w-2/12 w-full md:text-right text-center mr-1">
        کدملی : {{ value.user.code }}
      </h1>
      <div v-for="(store, i) in value.store">
        <h1 class="mx-1 flex" v-if="i == 'name'">انبار : {{ store }}</h1>
      </div>
      <h1
        class="lg:w-2/12 w-full md:text-right text-center flex flex-col md:items-start items-center mr-1"
      ></h1>
      <div class="flex lg:flex-row w-4/6 flex-col h-fit">
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
      <div class="w-fit">
        <selectInputVue v-if="show" :dataShow="value.store" :data="value.stores" @sendStoreValue="getStoreValue" />
      </div>
      <button @click="submit" class="bg-blue-500 w-20 text-lg h-8 rounded-lg text-white">
        تغییر
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useCookies } from "vue3-cookies";
import router from "../router";
import selectInputVue from "./selectInput.vue";

export default {
  components: {
    selectInputVue,
  },
  setup() {
    const { params } = useRoute();
    const value = reactive({
      user: "",
      stores: "",
      store:""
    });
    const show = ref(false);
    const d = reactive({
      id: params.user_id,
      stores: "",
      authUser: false,
      authProduct: false,
      makeStore: false,
      sendProduct: false,
      addProduct: false,
      loginProduct: false,
      isAdmin:false,
    });
    onMounted(() => {
      axios
        .get(
          "http://localhost:8000/api/checkOwn/" +
            useCookies().cookies.get("_token")
        )
        .then(function (response) {
          if (response.data.value.authUser == false) {
            router.push("/notFound");
          }
        })
        .catch(function () {
          router.push("/notFound");
        });
    });
    axios
      .get(
        "http://localhost:8000/api/changeProfile/" +
          useCookies().cookies.get("_token") +
          "/" +
          params.user_id
      )
      .then(function (re) {
        value.user = re.data.value.user;
        d.authUser = Boolean(value.user.own.authUser);
        d.authProduct = Boolean(value.user.own.authProducts);
        d.makeStore = Boolean(value.user.own.makeStore);
        d.sendProduct = Boolean(value.user.own.sendProducts);
        d.addProduct = Boolean(value.user.own.addProducts);
        d.loginProduct = Boolean(value.user.own.loginProduct);
        d.isAdmin = Boolean(value.user.own.isAdmin);
        value.stores = re.data.value.stores;
        value.store = re.data.value.store;
        show.value = true;
      });
    function getStoreValue(e) {
      d.stores = e;
    }
    function submit() {
      axios.patch('http://localhost:8000/api/editUser/' + useCookies().cookies.get('_token'), d).then((re) => {

      })
    }
    return { value, d, getStoreValue, show, submit };
  },
};
</script>
