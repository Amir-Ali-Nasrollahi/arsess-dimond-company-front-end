<template>
  <section class="w-full flex flex-col items-center">
    <div class="lg:w-4/6 w-5/6">
      <form
        @submit.prevent="submit"
        class="bg-slate-100 dark:bg-sky-900 flex lg:flex-row flex-col justify-between items-center p-2 mt-5 rounded-lg w-full lg:h-12 h-fit"
      >
        <div class="flex flex-row lg:w-4/6 w-5/6 h-full justify-start items-center">
          <label for="user" class="w-32">به کدام انبار ؟</label>
          <input
            id="user"
            v-model="sendData.store_geter_name"
            class="w-full rounded-lg text-lg dark:bg-sky-800 px-2 h-9 bg-slate-300"
            list="store_geter"
          />
          <datalist class="text-xl" id="store_geter">
            <option
              v-for="value in data.value.value"
              :value="value.name"
            >
              {{ value.name }}
            </option>
          </datalist>
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-3 lg:w-fit w-full text-lg rounded-lg lg:mt-0 mt-3"
        >
          ارسال
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { onMounted, reactive } from "vue";
import { useCookies } from "vue3-cookies";
import router from "../router";

export default {
  props: ["params"],
  setup(props) {
    const p = props.params;

    const data = reactive({
      value: "",
    });
    onMounted(() => {
      axios
        .get(
          "http://localhost:8000/api/getAllStores/" +
            useCookies().cookies.get("_token")
        )
        .then(function (re) {
          data.value = re.data;
        });
    });
    const sendData = reactive({
      store_sender_id: Number(p.store_id),
      store_geter_name:"",
      product_id: Number(p.id),
      _token: useCookies().cookies.get("_token"),
    });
    function submit() {
      axios
        .post("http://localhost:8000/api/sendtootherstore", sendData)
        .then(function (re) {
          router.push('/dashboard/products');
        });
    }
    return { data, p, submit, props, sendData };
  },
};
</script>
