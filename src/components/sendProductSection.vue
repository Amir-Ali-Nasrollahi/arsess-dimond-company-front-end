<template>
  <div class="overflow-y-scroll h-full">
    <div
      class="w-full h-fit flex lg:mt-0 mt-5 dark:text-slate-100 text-slate-800 flex-col items-center"
    >
    {{ own  + " te"}}
      <div v-if="own != null">
        <h1 class="text-2xl font-bold">ارسال اموال به کاربر</h1>
        <h3
          class="text-lg mt-2 dark:bg-amber-500/50 bg-amber-400/50 dark:text-amber-400 px-3 py-2 font-bold rounded-xl text-amber-800"
        >
          نکته!!
          <h4 class="font-normal">
            میتونید خیلی سریع با زدن کد ملی و تعداد محصول، اون رو برای یکی ارسال
            کنید :)
          </h4>
        </h3>
      </div>
      <div class="text-lg mt-5 dark:bg-sky-900 p-2 rounded-lg bg-slate-100">
        <h1>مشخصات محصول در حال ارسال</h1>
        <h2 class="text-base mt-3">نام کالا : {{ data.val.name }}</h2>
        <h2 class="text-base">کد کالا : {{ data.val.code }}</h2>
      </div>
      <div>
        <h1 class="dark:text-slate-50 text-slate-800"></h1>
      </div>
      <form
        v-if="own != null"
        @submit.prevent="submit"
        class="mt-10 dark:bg-sky-900 bg-slate-100 lg:w-2/3 md:w-5/6 w-full flex flex-col rounded-xl items-center p-2"
      >
        <div class="flex flex-col lg:w-4/6 w-5/6 items-center mt-2">
          <label for="user" class="self-start">به کدام کاربر ؟</label>
        <input
        id="user"
          v-model="input.user"
          class="w-full mt-1 rounded-lg text-lg dark:bg-sky-800 px-2 h-10 bg-slate-300"
          list="stores"
        />
        <datalist class="text-xl" id="stores">
          <option v-for="user in users" :value="user.name + ' ' + user.lastname">
            {{ user.name + " " + user.lastname }}
          </option>
        </datalist>
        </div>

        <div class="flex flex-col lg:w-4/6 w-5/6 items-center mt-2">
          <input
            type="submit"
            value="تایید"
            class="mt-1 hover:cursor-pointer w-full rounded-lg h-8 bg-blue-500"
          />
        </div>
      </form>
      <send-product-store v-else
        :params="params"
      ></send-product-store>
      <!-- <div v-else>test</div> -->
    </div>
    <notifications
      classes="m-3 rounded-lg p-2 text-right bg-blue-500 text-md text-slate-900 shadow-lg shadow-blue-400/20 text-slate-100"
    />
  </div>
</template>

<script>
import { notify } from "@kyvg/vue3-notification";
import axios from "axios";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useCookies } from "vue3-cookies";
import router from "../router";
import sendProductToOtherStoreForm from "./sendProductToOtherStoreForm.vue";

export default {
  components: {
    sendProductStore: sendProductToOtherStoreForm,
  },
  name: "sendProductSection",
  setup() {
    const data = reactive({
      val: "",
    });
    const { params } = useRoute();
    const users = ref("");
    axios.get("http://localhost:8000/api/users/" + useCookies().cookies.get('_token')).then(function (re) {
      users.value = re.data.value;
    });
    function submit() {
      axios
        .post("http://localhost:8000/api/bag", input)
        .then(function () {
          router.push("/dashboard/products/");
        })
        .catch(function () {
          notify({
            title: "خطا در ارسال محصول",
            type: "error",
            text: "عملیات با خطا روبه رو شد، احتمالا فیلد هارا خالی گذاشتید :/",
          });
        });
    }
    const input = reactive({
      user: "",
      product_id: "",
      store_id: params.store_id,
      _token: useCookies().cookies.get("_token"),
    });
    const own = ref(null);
    axios
      .get(
        "http://localhost:8000/api/getproductinfo/" +
          useCookies().cookies.get("_token") +
          "/" +
          params.id
      )
      .then(function (response) {
        data.val = response.data.value;
        own.value = data.val.is_own;
        input.product_id = data.val.id;
      });

    const sp = ref("");
    sp.value = Boolean(useCookies().cookies.get("sp"));

    if(!sp.value) {
      router.push("/notFound");
    }
    return { data, submit, own, input, params, users };
  },
};
</script>
