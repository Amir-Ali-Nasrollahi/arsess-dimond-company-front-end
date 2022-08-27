<template>
  <div
    class="flex lg:flex-col p-1 flex-row justify-around items-center lg:h-screen h-fit"
  >
    <h1
      class="lg:block hidden mt-6 lg:text-3xl text-2xl text-center dark:text-slate-200 text-slate-900"
    >
      پرداخت کالا
    </h1>
    <!-- <div class="mt-5 flex-row w-screen"> -->
    <router-link
      active-class="text-blue"
      exact-active-class="text-blue"
      class="flex flex-col lg:w-full dark:text-slate-100 w-fit items-center lg:mt-12 outline-none hover:underline"
      :to="'/dashboard'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="md:h-10 md:w-10 w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
      <span>خانه</span>
    </router-link>

    <router-link
      active-class="text-blue"
      class="flex flex-col dark:text-slate-200 items-center lg:w-full w-fit outline-none hover:underline"
      :to="'/dashboard/products'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="md:dark:h-slate-100 md:w-9 md:h-9 w-6 h-6 text-center"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
      <span>محصولات</span>
    </router-link>
    <router-link
      active-class="text-blue"
      class="flex flex-col dark:text-slate-200 items-center outline-none hover:underline"
      :to="'/dashboard/report'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="md:dark:h-slate-100 md:w-9 md:h-9 w-6 h-6 "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
        />
      </svg>
      <span>گزارشات</span>
    </router-link>
    <router-link
      active-class="text-blue"
      class="flex flex-col dark:text-slate-200 items-center outline-none hover:underline"
      :to="'/dashboard/requests'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="md:dark:h-slate-100 md:w-9 md:h-9 w-6 h-6 "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
        />
      </svg>
      <span>درخواست ها</span>
    </router-link>

    <button
    @click="logout"
      active-class="text-blue"
      class="flex flex-col lg:mt-12 items-center transition-all duration-75 ease-linear text-red-500 outline-none hover:underline hover:bg-red-400/20 rounded-xl lg:w-1/2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="md:w-9 md:h-9 w-6 h-6 "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      <span>خروج</span>
    </button>
    <!-- </div> -->
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { useCookies } from "vue3-cookies";
import router from "../router";
export default {
  components: {
    RouterLink,
  },
  setup() {
    function logout() {
      useCookies().cookies.remove("_token");
      router.push("/");
    }
    return {logout}
  },
};
</script>
<style>
.text-blue {
  color: #3b82f6 !important;
}
</style>
