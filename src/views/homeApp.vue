<template>
  <section dir="rtl" class="dark w-full">
    <section
      class="bg-sky-900 text-slate-50 flex flex-row items-center justify-center text-center w-full h-screen"
    >
      <div class="lg:w-1/2 w-5/6 flex flex-col items-center justify-center">
        <h1 class="md:text-5xl font-medium text-4xl text-center">
            به وب سایت کنترل محصولات شرکت <p class="text-amber-400 font-extrabold drop-shadow-lg shadow-amber-400"> الماس تمدن آرسس </p> خوش آمدید .
        </h1>
        <div class="mt-10" v-if="active">
            <router-link :to="'/login'" class="bg-blue-500 mx-2 w-20 h-8 text-xl px-3 rounded-lg">ورود</router-link>
            <router-link :to="'/register'" class="bg-blue-500 mx-2 w-20 h-8 text-xl px-3 rounded-lg">ثبت نام</router-link>
        </div>
        <div v-else class="mt-10">
            <router-link :to="'/dashboard'" class="shadow-none transition duration-75 ease-linear hover:shadow-lg hover:shadow-amber-400/30 bg-amber-500 mx-2 w-20 h-8 text-xl px-3 rounded-lg">رفتن به داشبورد</router-link>
        </div>
      </div>
    </section>
    <notifications classes="m-3 rounded-lg p-2 text-right bg-rose-500 text-md text-slate-900 shadow-lg shadow-rose-400/20" dir="rtl" position="top" />
    <footer-vue></footer-vue>
  </section>
</template>
<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useCookies } from 'vue3-cookies';
import footerVue from '../components/footer.vue';

const active = ref(true);
const {cookies} = useCookies();
if(cookies.isKey('_token')) {
    active.value = false;
}
</script>
