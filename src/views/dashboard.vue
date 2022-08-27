<template>
  <section dir="rtl" class="w-full h-screen" v-if="active">
    <div
      class="h-full w-full grid grid-cols-12 bg-white dark:bg-sky-900 lg:grid-rows-1 grid-rows-4"
    >
      <right-bar
        :param="value"
        class="lg:col-span-3 md:col-span-4 w-full md:block lg:row-span-1 row-span-4 p-1 border-r-4 border-y-4 dark:border-sky-900 border-slate-50 dark:bg-sky-800 bg-slate-200 rounded-tr-xl md:pt-10 rounded-br-xl"
        :class="{ hidden: activeValue, 'col-span-full': !activeValue }"
      >
        <div
          class="w-fit dark:text-slate-50 text-slate-800 md:hidden ml-auto h-16 flex flex-row items-start row-span-1"
        >
          <button class="" @click="changeActiveValue">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </right-bar>
      <div
        class="md:col-span-8 md:block lg:row-span-1 row-span-4 p-2 dark:bg-sky-800 bg-slate-200 border-y-4 md:pt-10 rounded-tl-xl lg:border-l-0 border-l-4 rounded-bl-xl dark:border-sky-900 border-slate-50"
        :class="{ hidden: !activeValue, 'col-span-full': activeValue }"
      >
        <button
          class="md:hidden dark:text-slate-50 text-slate-800 block absolute"
          @click="changeActiveValue"
        >
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
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <router-view
          class="w-full md:pt-5"
          v-if="load"
          :data="value"
        ></router-view>
        <loading-section-vue v-else></loading-section-vue>
      </div>
      <left-bar
        class="lg:col-span-1 col-span-12 row-span-1 dark:bg-sky-900 bg-slate-50 w-full"
      >
      </left-bar>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { RouterView } from "vue-router";
import { useCookies } from "vue3-cookies";
import router from "@/router";
import leftBar from "@/components/leftBar.vue";
import rightBar from "@/components/rightBar.vue";
import loadingSectionVue from "../components/loadingSection.vue";
export default {
  components: {
    RouterView,
    leftBar,
    rightBar,
    loadingSectionVue,
  },
  setup() {
    const { cookies } = useCookies();
    const active = ref(false);
    const activeValue = ref(true);
    const load = ref(false);
    const value = reactive({
      data: "",
    });

    function changeActiveValue() {
      activeValue.value = !activeValue.value;
    }

    onMounted(() => {
      if (cookies.isKey("_token")) {
        const data = reactive({
          _token: cookies.get("_token"),
        });
        axios
          .post("http://localhost:8000/api/validate", data)
          .then(function (response) {
            load.value = true;

            if (cookies.isKey("sp")) {
              cookies.remove("sp");
            }
            cookies.set("sp", response.data.value.own.sendProducts, "30d");
            value.data = response.data.value;
          })
          .catch(function () {
            router.push("/wait");
          })
          .finally(function () {
            active.value = true;
          });
      } else {
        cookies.remove("_token");
        router.push("/wait");
      }
    });

    return { active, value, changeActiveValue, activeValue, load };
  },
};
</script>
