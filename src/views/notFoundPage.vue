<template>
    <div dir="rtl" class="w-full h-screen flex flex-col items-center justify-around dark:text-slate-50 text-slate-800 dark:bg-sky-900 bg-slate-100">
        <div class="w-full h-fit flex flex-col items-center">
            <h1 class="lg:text-[200px] text-9xl font-bold">404</h1>
            <h4 class="dark:text-sky-600 text-slate-500 text-3xl font-bold">اوه نه!صفحه پیدا نشد:(</h4>
        </div>
        <div class="w-full h-fit flex flex-col items-center">
            <h5 class="dark:text-slate-100 text-lgx text-slate-700 w-full text-center p-1">اینجا تنهایید!! پیشنهاد میکنم به صفحه اول برگردید و مسیری که اومدید رو دوباره برسی کنید، حتما جایی اشتباه کردید :)</h5>
            <router-link :to="'/dashboard'" class="hover:underline text-blue-400 mt-5">بازگشت به خانه</router-link>
        </div>
    </div>
</template>
<script setup>
import { RouterLink } from 'vue-router';
</script>