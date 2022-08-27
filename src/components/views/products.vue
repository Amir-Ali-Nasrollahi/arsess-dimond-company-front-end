<template>
  <div class="h-full w-full overflow-y-scroll lg:pt-0 pt-5">
    <h1
      class="w-fit mx-auto p-2 rounded-xl dark:bg-sky-900 dark:text-slate-50 text-center text-xl bg-slate-100 mb-10"
    >
      در انبار <span v-for="store in props.store" class="font-bold">{{ store.name + " ، " }}</span> جستجو کنید
    </h1>
    <search-box :data="data" @updateName="test"></search-box>
    <product-section class="mt-12" :val="value"></product-section>
  </div>
</template>

<script>
import searchBox from "../searchBox.vue";
import productSection from "../productSection.vue";
import { reactive, ref } from "vue";
// import { useRoute } from "vue-router";
export default {
  components: {
    searchBox,
    productSection,
  },
  props: {
    data: Object,
  },
  setup(p) {
    const props = p.data.data;
    const data = ref(null);
    const value = reactive({
      store_id: [],
      search:""
    });
    for (const key in props.store) {
      value.store_id.push(props.store[key].id);
    }
    function test(res) { 
      value.search = res;
    }
    return { data, test, value,props };
  },
};
</script>
