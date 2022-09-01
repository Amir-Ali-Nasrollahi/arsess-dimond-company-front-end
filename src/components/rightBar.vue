<template>
  <section
    id="scroll"
    class="flex flex-col items-center overflow-y-scroll lg:justify-center"
  >
    <slot class=""></slot>
    <div class="flex flex-row justify-between items-center w-5/6 mx-auto">
      <h2 class="dark:text-slate-100 text-slate-900 text-2xl font-bold">
        {{ data.name + " " + data.lastname }}
      </h2>
      <div class="flex flex-row">
        <button
          type="button"
          class="flex flex-row mx-1"
          v-if="data.own.authProducts"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 p-1 dark:bg-sky-900 bg-slate-100 rounded-xl dark:text-slate-100 text-slate-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span
            v-if="activeTolTip"
            class="bg-red-500 h-4 w-4 text-sm rounded-full absolute mr-4 text-white"
          >
            {{ confirmGetCount }}
          </span>
        </button>
        <dark-mode-button></dark-mode-button>
      </div>
    </div>
    <div class="w-11/12 mt-10 flex flex-col items-center mx-auto">
      <h1
        class="text-lg text-bold dark:text-slate-100 self-start text-slate-900"
      >
        اطلاعات حساب کاربری شما
      </h1>
      <div class="flex flex-row flex-wrap">
        <div
          class="dark:text-slate-50 mx-1 text-lg rounded-lg mt-3 p-1 w-5/12"
          :class="{
            'bg-red-500': !data.own.makeStore,
            'bg-green-500': data.own.makeStore,
          }"
        >
          {{
            data.own.makeStore == 1
              ? "اجازه ساخت انبار را دارید"
              : "ساخت ارسال انبار را ندارید"
          }}
        </div>
        <div
          class="dark:text-slate-50 mx-1 text-lg rounded-lg mt-3 p-1 w-5/12"
          :class="{
            'bg-red-500': !data.own.addProducts,
            'bg-green-500': data.own.addProducts,
          }"
        >
          {{
            data.own.addProducts == 1
              ? "اجازه ساخت محصولات را دارید"
              : "اجازه ساخت محصولات را ندارید"
          }}
        </div>
        <div
          class="dark:text-slate-50 mx-1 text-lg rounded-lg mt-3 p-1 w-5/12"
          :class="{
            'bg-red-500': !data.own.authProducts,
            'bg-green-500': data.own.authProducts,
          }"
        >
          {{
            data.own.authProducts == 1
              ? "اجازه دریافت محصولات را دارید"
              : "اجازه دریافت محصولات را تدارید"
          }}
        </div>
        <div
          class="dark:text-slate-50 mx-1 text-lg rounded-lg mt-3 p-1 w-5/12"
          :class="{
            'bg-red-500': !data.own.authUser,
            'bg-green-500': data.own.authUser,
          }"
        >
          {{
            data.own.authUser == 1
              ? "اجازه مدیریت کاربران را دارید"
              : "اجازه مدیریت کاربران را ندارید"
          }}
        </div>
        <div
          class="dark:text-slate-50 mx-1 text-lg rounded-lg mt-3 p-1 w-5/12"
          :class="{
            'bg-red-500': !data.own.sendProducts,
            'bg-green-500': data.own.sendProducts,
          }"
        >
          {{
            data.own.sendProducts == 1
              ? "اجازه ارسال محصولات را دارید"
              : "اجازه ارسال محصولات را ندارید"
          }}
        </div>

        <div
          class="dark:text-slate-50 mx-1 text-lg rounded-lg mt-3 p-1 w-5/12"
          :class="{
            'bg-red-500': !data.own.loginProduct,
            'bg-green-500': data.own.loginProduct,
          }"
        >
          {{
            data.own.loginProduct == 1
              ? "اجازه ورود محصولات را دارید"
              : "اجازه ورود محصولات را ندارید"
          }}
        </div>
      </div>
      <div
        class="w-full bg-blue-500 flex flex-row flex-wrap items-center justify-center rounded-lg mt-1 py-1 text-lg text-white"
        v-if="Object.keys(data.store).length < 10"
      >
        <h1 v-if="Object.keys(data.store).length < 10">
          شما در انبار
          <span class="font-bold" v-for="storeName in data.store">{{
            storeName.name + " ، "
          }}</span>
          کار میکنید
        </h1>
        <h1 v-else>
          <span class="font-bold">شما در اکثر انبار ها کار میکنید</span>
        </h1>
      </div>
      <div class="w-full" v-else>
        <h1 class="dark:text-white text-slate-800 text-xl mt-5">
          لیست انبار هایی که شما در ان هستید
        </h1>
        <div
          class="dark:text-white text-slate-800 h-fit flex flex-row flex-wrap"
          v-if="Object.keys(data.store).length > 1"
        >
          <p
            class="my-2 dark:bg-sky-900 flex flex-row items-center mx-2 justify-center rounded-lg text-lg w-28 bg-slate-100"
            v-for="storeName in data.store"
          >
            {{ storeName.name }}
            <br />
          </p>
        </div>
      </div>
    </div>

    <div class="w-4/6 mt-10 flex flex-col items-center mx-auto">
      <h2
        class="text-lg text-bold dark:text-slate-100 self-start text-slate-900"
      >
        تغییر رمز عبور
      </h2>
      <form
        class="w-full flex flex-col items-center dark:text-slate-100 text-slate-800"
        v-on:submit.prevent="submit"
      >
        <div class="w-3/4">
          <label class="md:text-sm text-md" for="">پسورد قبلی</label>
          <input
            v-model="input.latestPassword"
            class="w-full mt-1 px-1 rounded-lg dark:bg-sky-700 h-10 bg-slate-100"
            type="text"
          />
        </div>
        <div class="w-3/4">
          <label class="md:text-sm text-md" for="">پسورد جدید</label>
          <input
            v-model="input.newPassword"
            class="w-full mt-1 px-1 rounded-lg dark:bg-sky-700 h-10 bg-slate-100"
            type="text"
          />
        </div>

        <div class="w-3/4">
          <label class="md:text-sm text-md" for="">تکرار پسورد</label>
          <input
            v-model="input.confirmPassword"
            class="w-full mt-1 px-1 rounded-lg dark:bg-sky-700 h-10 bg-slate-100"
            type="password"
          />
        </div>

        <button
          type="submit"
          class="bg-blue-500 w-2/3 px-2 py-1 text-white my-5 rounded-lg"
        >
          تایید
        </button>
      </form>
      <notifications :classes="cl" />
    </div>
  </section>
</template>
<script>
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import darkModeButton from "@/components/darkModeButton.vue";
import { useCookies } from "vue3-cookies";
import { notify } from "@kyvg/vue3-notification";
import axios from "axios";
export default {
  components: {
    RouterLink,
    darkModeButton,
  },
  props: {
    param: Object,
  },
  setup(p) {
    const data = p.param.data;
    const input = reactive({
      latestPassword: "",
      newPassword: "",
      confirmPassword: "",
      _token: useCookies().cookies.get("_token"),
    });
    const activeTolTip = ref(true);
    let confirmGetCount = ref(0);
    for (const confirm of data.user_geter) {
      if (confirm.confirm_get) {
        confirmGetCount.value += 1;
      }
    }

    let cl = ref(
      "m-3 rounded-lg p-2 text-right bg-rose-500 text-md text-slate-900 shadow-lg shadow-rose-400/20"
    );
    if (confirmGetCount.value == 0) {
      activeTolTip.value = false;
    }
    function submit() {

      if (input.confirmPassword == input.newPassword) {
        axios
          .post("http://localhost:8000/api/changePassword", input)
          .then((re) => {

            cl.value =
              "m-3 rounded-lg p-2 text-right bg-green-500 text-md text-slate-900 shadow-lg shadow-green-400/20";
            notify({
              type: "success",
              title: "پسورد با موفقیت تغییر کرد",
            });
          })
          .catch(() => {
            cl.value =
              "m-3 rounded-lg p-2 text-right bg-rose-500 text-md text-slate-900 shadow-lg shadow-rose-400/20";
            notify({
              type: "err",
              title: "رمز عبور قبلی صحیح نبود",
            });
          });
      } else {
        cl.value =
          "m-3 rounded-lg p-2 text-right bg-rose-500 text-md text-slate-900 shadow-lg shadow-rose-400/20";
        notify({
          type: "err",
          title: "تکرار پسورد صحیح نیست",
        });
      }
    }
    return { data, activeTolTip, confirmGetCount, input, submit, cl };
  },
};
</script>

<style scoped>
#scroll::-webkit-scrollbar {
  width: 1px;
}
</style>
