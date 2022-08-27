<template>
  <section dir="rtl" class="dark w-full">
    <section
      class="bg-sky-900 text-slate-50 flex flex-row items-center justify-center text-center w-full h-screen"
    >
      <div class="lg:w-1/2 w-5/6 flex flex-col items-center justify-center">
        <h1 class="sm:text-4xl font-bold text-4xl">خوش برگشتی !!</h1>
        <form
          @submit.prevent="submit"
          class="md:w-3/4 w-full mt-10 bg-sky-800 flex rounded-xl flex-col justify-center items-center"
        >
          <div class="flex mt-5">
            <router-link
              :to="'/register'"
              class="mx-1 h-10 flex flex-row items-center justify-center text-xl text-blue-400 hover:bg-blue-500 hover:text-slate-50 transition-all duration-75 ease-linear rounded-md w-24 cursor-pointer"
              >ثبت نام</router-link
            >

            <router-link
              :to="'/login'"
              class="flex flex-row items-center mx-1 h-10 text-xl bg-blue-500 text-slate-50 transition-all duration-75 ease-linear rounded-md px-auto cursor-pointer shadow-lg shadow-blue-500/40 text-center p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
              <button class="mx-1" type="submit">ورود</button>
            </router-link>
          </div>
          <h1 class="sm:text-2xl text-3xl mt-5">پنل ورود</h1>

          <div class="w-2/3 flex flex-col mt-5">
            <label for="phone" class="w-full text-right">شماره موبایل</label>
            <input
              type="text"
              id="phone"
              maxlength="11"
              v-model="data.phone"
              minlength="11"
              class="rounded-md h-10 bg-sky-900"
            />
          </div>

          <div class="w-2/3 flex flex-col">
            <label for="phone" class="w-full text-right mt-3">رمز عبور</label>
            <input
              type="password"
              id="phone"
              v-model="data.password"
              class="rounded-md h-10 bg-sky-900"
              minlength="8"
            />
          </div>

          <input
            type="submit"
            class="bg-blue-500 w-24 h-10 my-5 rounded-xl text-lg hover:cursor-pointer"
            value="ورود"
          />
        </form>
      </div>
    </section>
    <notifications classes="m-3 rounded-lg p-2 text-right bg-rose-500 text-md text-slate-900 shadow-lg shadow-rose-400/20" dir="rtl" position="top" />
    <footer-vue></footer-vue>
  </section>
</template>

<script>
import axios from "axios";
import { sha256 } from "js-sha256";
import { onMounted, reactive } from "vue";
import { RouterLink } from "vue-router";
import { useCookies } from "vue3-cookies";
import footerVue from "../components/footer.vue";
import router from "../router";
import { notify } from "@kyvg/vue3-notification";

export default {
  components: {
    RouterLink,
    footerVue,
  },
  setup() {
    const { cookies } = useCookies();
    const data = reactive({
      phone: "",
      password: "",
      _token: "",
    });
    onMounted(() => {
      if (cookies.isKey("_token")) {
        router.push("/dashboard");
      }
    });
    const submit = () => {
      data._token = sha256(data.phone);
      axios
        .post("http://localhost:8000/api/checkLogin", data)
        .then((response) => {
          if (response.data.value.status == false) {
            router.push("/wait");
          } else {
            cookies.set("_token", sha256(data.phone), "30d");
            router.push("/dashboard");
          }
        })
        .catch(function () {
          notify({
            title: "خطا در ارتباط با سرور",
            type:"error",
            text: "عملیات ورود با خطا روبه رو شد.مجدد تلاش کنید.",
          });
        });
    };
    return { submit, data };
  },
};
</script>

