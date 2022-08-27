<template>
  <div class="w-full h-full overflow-y-scroll lg:pb-0 pt-10">
    <windows-button></windows-button>
    <div class="w-full mt-5 h-fit dark:text-slate-50 text-slate-800">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import windowsButton from "../components/windowsButton.vue";
export default {
  components: {
    windowsButton,
    RouterView,
  },
};
</script>
