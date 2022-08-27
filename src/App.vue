<script setup>
import { provide, ref } from "vue";
import { RouterView } from "vue-router";
import { useCookies } from "vue3-cookies";
const theme = ref(false);
const { cookies } = useCookies();
if (cookies.isKey("theme")) {
  theme.value = cookies.get("theme") === "false" ? false : true;
}
provide("theme", theme);
</script>

<template>
  <section :class="{ dark: theme }">
    <RouterView />
  </section>
</template>
