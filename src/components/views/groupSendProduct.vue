<template>
  <div>
    
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCookies } from "vue3-cookies";
import router from "../../router";

onMounted(() => {
  const { cookies } = useCookies();
  const sp = ref("");
  sp.value = Boolean(cookies.get("sp"));
  if (sp.value == false) {
    router.push("notFound")
  }
});
</script>
