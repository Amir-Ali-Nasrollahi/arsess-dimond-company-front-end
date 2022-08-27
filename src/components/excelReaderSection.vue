<template>
  <div class="w-full flex flex-col items-center">
    <slot></slot>
    <form
      class="flex flex-col w-full items-center justify-center my-5"
      @submit.prevent="submit"
    >
      <div class="lg:w-2/5 w-3/4 flex flex-col my-5">
        <p class="dark:text-slate-100 text-slate-800">ارسال محصولات</p>
        <label
          for="file"
          class="mt-1 dark:text-slate-100 bg-slate-100 rounded-lg z-10 dark:bg-sky-900 w-full px-2 py-1 text-slate-800 flex flex-row justify-start"
        >
          <h2
            class="dark:bg-sky-700 bg-slate-200 w-fit px-2 py-1 rounded-md cursor-pointer font-bold lg:text-base text-lg"
          >
            {{ fileInputValue }}
          </h2>
        </label>
        <input
          type="file"
          id="file"
          accept=".xlsx"
          @change="test"
          class="dark:bg-sky-900 mt-1 bg-slate-100 px-2 py-1 rounded-lg opacity-0 overflow-hidden hidden z-0"
        />
        <div
          class="bg-blue-500 shadow-lg dark:shadow-blue-600/50 shadow-blue-500/50 mt-2 p-2 rounded-lg font-bold text-blue-100"
        >
          <h2 class="text-blue-900 font-bold text-xl">دقت کنید !!</h2>
          فایل انتخاب شده باید پسوند ' xlsx. ' داشته باشد. پسوندی غیر از این
          <span
            class="text-blue-900 drop-shadow-md shadow-sky-900/50 cursor-pointer hover:underline font-bold"
            >غیر قابل قبول</span
          >
          است
        </div>
      </div>
      <button
        type="submit"
        class="lg:text-lg bg-blue-500 lg:w-20 w-28 rounded-lg text-white h-8 text-xl"
      >
        تایید
      </button>
    </form>
  </div>
</template>
<script>
import { ref } from "vue";
import { useCookies } from "vue3-cookies";

export default {
  setup(p, { emit }) {
    const formData = new FormData();
    const fileInputValue = ref("فایل را انتخاب کنید");

    const test = (e) => {
      formData.append("file", e.target.files[0]);
      fileInputValue.value = e.target.files[0].name;
    };

    function submit() {
      formData.append("_token", useCookies().cookies.get("_token"));
      formData.append("groupAdd", 1);
      emit('sendData', formData);
    }
    return { submit, test, fileInputValue };
  },
};
</script>
