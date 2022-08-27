<template>
  <div>
    <button type="button" class="flex flex-row">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10 p-1 dark:bg-sky-900 bg-slate-100 rounded-xl dark:text-slate-100 text-slate-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        v-if="theme"
        @click="changeTheme"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10 p-1 dark:bg-sky-900 bg-slate-100 rounded-xl dark:text-slate-100 text-slate-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        v-else
        @click="changeTheme"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import { inject } from "vue";
import { useCookies } from "vue3-cookies";
export default {
  setup() {
    const { cookies } = useCookies();
    const theme = inject("theme");
    const themeCookies = cookies.isKey("theme");
    function changeTheme() {
      theme.value = !theme.value;
      if (themeCookies) {
        cookies.remove("theme");
        cookies.set("theme", theme.value, "30d");
      } else {
        cookies.set("theme", theme.value);
      }
    }
    return { theme, changeTheme };
  },
};
</script>
