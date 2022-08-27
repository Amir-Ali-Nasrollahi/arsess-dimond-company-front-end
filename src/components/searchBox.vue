<template>
  <div>
    <form @submit.prevent="submit" class="flex flex-row items-center w-full justify-center">
      <input type="text" v-model="inputValue" placeholder="لطفا کد محصول را وارد کنید" class="w-3/5 px-1 h-10 rounded-r-lg transition-all duration-75 ease-linear dark:bg-sky-900 dark:text-slate-100 bg-slate-100" />
      <button type="submit" class="dark:bg-amber-400 bg-indigo-500 h-10 w-10 flex flex-row items-center justify-center transition-all duration-75 ease-linear hover:shadow-md rounded-l-lg text-slate-50">
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props:['data'],
  setup(p, {emit}) {
    const inputValue = ref("");
    function submit() {
      emit("updateName", inputValue.value);
    }
    return { submit, inputValue };
  },
};
</script>
