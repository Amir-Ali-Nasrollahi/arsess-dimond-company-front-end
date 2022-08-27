<template>
  <section dir="rtl">
    <div
      class="bg-sky-900 h-screen w-full flex flex-col items-center justify-around"
    >
      <h1 class="text-amber-400 md:text-8xl sm:text-7xl text-5xl">صفحه انتظار :(</h1>
      <h5 class="sm:text-3xl text-2xl font-bold text-blue-400">درخواست شما ثبت شد</h5>
      <div class="flex flex-col items-center text-center w-5/6">
          <h4 class="text-white sm:text-2xl text-xl">
            اگر مشخصات شما با مشخصات فرد مورد نظر در شرکت یکی باشد حساب شما تایید
            شده و میتوانیید به صفحه ورود مراجعه کنید
            (احتمالا این کار یک روز کاری طول بکشد!)
          </h4>
          <router-link :to="'/login'" class="text-blue-400 mt-2 hover:text-blue-300 transition-all duration-75 text-lg ease-in">صفحه ورود</router-link>
      </div>
    </div>
    <footer-vue />
  </section>
</template>
<script>
import footerVue from "../components/footer.vue";
import { RouterLink } from "vue-router";
export default {
  components: {
    footerVue,
    RouterLink
  },
};
</script>
