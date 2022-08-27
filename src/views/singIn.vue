<template>
  <section
    dir="rtl"
    class="bg-sky-900 w-full flex flex-col justify-between h-screen"
  >
    <div
      class="w-full grid lg:grid-cols-3 md:grid-cols-5 grid-cols-11 sm:grid-cols-7 h-fit text-slate-50 bg-sky-900"
    >
      <div
        class="flex flex-col lg:col-span-1 lg:col-start-2 md:col-span-3 sm:col-span-5 sm:col-start-2 md:col-start-2 col-start-2 col-span-9 items-center justify-around"
      >
        <div class="relative">
          <h1 class="text-4xl mt-10 text-center">پرداخت کالا</h1>
        </div>

        <form
          @submit.prevent="submit"
          class="p-1 rounded-2xl my-5 bg-sky-800 shadow-lg w-full flex flex-col items-center justify-center"
        >
          <div class="flex mt-5">
            <RouterLink
              :to="'/register'"
              class="flex flex-row items-center mx-1 h-10 text-xl bg-blue-500 text-slate-50 transition-all duration-75 ease-linear rounded-md px-auto cursor-pointer shadow-lg shadow-blue-500/40 text-center p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mx-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>

              <input type="button" class="mx-1" value="ثبت نام" />
            </RouterLink>

            <RouterLink
              :to="'/login'"
              class="mx-1 h-10 flex flex-row items-center justify-center text-xl text-blue-400 hover:bg-blue-500 hover:text-slate-50 transition-all duration-75 ease-linear rounded-md w-24 cursor-pointer"
            >
              ورود
            </RouterLink>
          </div>
          <h2 class="text-2xl mt-5">پنل ثبت نام</h2>

          <div class="md:w-3/4 w-5/6 mt-3">
            <label for="name" class="self-start my-2 mx-1"
              >نام<span class="text-red-500 text-3xl absolute">*</span></label
            >
            <input
              type="text"
              id="name"
              v-model="data.firstname"
              class="rounded-md w-full border-none bg-sky-900 h-10 md:px-2 px-1"
              placeholder="لطفا نام خود را وارد کنید"
            />
          </div>

          <div class="md:w-3/4 w-5/6 mt-3">
            <label for="lastname" class="self-start my-2 mx-1"
              >نام خانوادگی<span class="text-red-500 text-3xl absolute"
                >*</span
              ></label
            >
            <input
              type="text"
              id="lastname"
              v-model="data.lastname"
              class="rounded-md w-full border-none bg-sky-900 h-10 md:px-2 px-1"
              placeholder="لطفا نام خود را وارد کنید"
            />
          </div>

          <div class="md:w-3/4 w-5/6 mt-3">
            <label for="phone" class="self-start my-2 mx-1"
              >شماره تماس<span class="text-red-500 text-3xl absolute"
                >*</span
              ></label
            >
            <input
              type="text"
              id="phone"
              v-model="data.phone"
              class="rounded-md w-full border-none bg-sky-900 h-10 md:px-2 px-1"
              placeholder="09xxxxxxxxx"
              minlength="11"
              maxlength="11"
            />
          </div>

          <div class="md:w-3/4 w-5/6 mt-3">
            <label for="code" class="self-start my-2 mx-1"
              >کد ملی<span class="text-red-500 text-3xl absolute"
                >*</span
              ></label
            >
            <input
              type="text"
              id="code"
              v-model="data.code"
              class="rounded-md w-full border-none bg-sky-900 h-10 md:px-2 px-1"
              placeholder="1099999999"
              minlength="10"
              maxlength="10"
            />
          </div>

          <div class="md:w-3/4 w-5/6 mt-3">
            <label for="password" class="self-start my-2 mx-1"
              >رمز عبور<span class="text-red-500 text-3xl absolute"
                >*</span
              ></label
            >
            <input
              type="password"
              @change="getValue"
              id="password"
              v-model="data.password"
              class="rounded-md w-full border-none bg-sky-900 h-10 md:px-2 px-1"
              placeholder="لطفا رمز عبور خود را وارد کنید"
              minlength="8"
            />
          </div>

          <div class="md:w-3/4 w-5/6 mt-3">
            <label for="againPassowrd" class="self-start my-2 mx-1"
              >تکرار رمز عبور<span class="text-red-500 text-3xl absolute"
                >*</span
              ></label
            >
            <input
              type="password"
              @input="checkPassword"
              id="againPassowrd"
              v-model="data.name"
              class="rounded-md w-full border-2 bg-sky-900 h-10 md:px-2 px-1"
              :class="{ 'border-green-500': active, 'border-red-500': !active }"
              placeholder="مجددا رمز عبور خود را وارد کنید"
              minlength="8"
            />
          </div>
          <div class="md:w-3/4 w-5/6 mt-1 flex flex-row justify-start">
            <input
              type="submit"
              value="تایید"
              class="my-5 border-2 h-10 text-xl bg-blue-500 text-slate-50 transition-all duration-75 ease-linear rounded-xl w-20 cursor-pointer border-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
    <notifications classes="m-3 rounded-lg p-2 text-right bg-rose-500 text-md text-slate-900 shadow-lg shadow-rose-400/20" dir="rtl" position="top"  />
    <!-- <div v-if="res">hello world</div> -->
    <footer-vue></footer-vue>
  </section>
</template>

<script>
import { reactive, ref,onMounted } from "vue";
import axios from "axios";
import { RouterLink, RouterView } from "vue-router";
import { sha256 } from "js-sha256";
import footerVue from "../components/footer.vue";
import { useCookies } from "vue3-cookies";
import router from "../router";
import { notify } from "@kyvg/vue3-notification";
export default {
  components: {
    RouterLink,
    RouterView,
    footerVue,
  },
  setup() {
    const {cookies} = useCookies();

    onMounted(() => {
      if(cookies.isKey("_token")){
        router.push("/dashboard");
      }
    });


    const active = ref(false);
    let passwordValue;
    const res = ref(false);
    const data = reactive({
      firstname: "",
      lastname: "",
      phone: "",
      code: "",
      password: passwordValue,
      _token: "",
    });
    function getValue(event) {
      passwordValue = event.target.value;
    }

    function checkPassword(e) {
      if (e.target.value == passwordValue) {
        active.value = true;
      } else {
        active.value = false;
      }
    }
    const submit = () => {
      res.value = true;
      data._token = sha256(data.phone);
      axios
        .post("http://localhost:8000/api/user", data)
        .then(function () {
          router.push("/wait");
        })
        .catch(function () {
          notify({
            title: "خطا در ارتباط با سرور",
            type:"error",
            text: "عملیات ورود با خطا روبه رو شد.مجدد تلاش کنید.",
          });
        })
        .finally(function () {
          res.value = false;
        });
    };

    return { submit, getValue, checkPassword, active, data, res };
  },
};
</script>
