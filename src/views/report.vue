<template>
  <div
    class="h-full w-full flex flex-col items-center overflow-y-scroll lg:pt-0 pt-5"
  >
    <div class="h-1/2 lg:w-2/5 sm:w-2/3 w-full">
      <h1 class="text-3xl text-slate-800 text-center dark:text-slate-100">
        آمار تمامی محصولات
      </h1>
      <canvas id="pieChart" class="w-full h-fit mt-10"></canvas>
    </div>
    <br />
    <div class="h-full lg:w-2/3 w-full lg:mt-56 mt-32">
      <h1 class="text-3xl text-slate-800 text-center dark:text-slate-100">
        آمار محصول
      </h1>

      <form
        @submit.prevent="submit"
        class="flex my-3 flex-row items-center w-full justify-center"
      >
        <input
          type="text"
          v-model="input.code"
          placeholder="لطفا کد محصول را وارد کنید"
          class="w-1/3 px-1 h-10 rounded-r-lg transition-all duration-75 ease-linear dark:bg-sky-900 dark:text-slate-100 bg-slate-100"
          list="categories"
        />
        <datalist class="text-xl" id="categories">
          <option
            v-for="category in categories"
            :value="category.name"
          ></option>
        </datalist>
        <input
          type="text"
          v-model="input.store_name"
          placeholder="نام انبار وارد کنید"
          class="w-1/3 px-1 border-r-2 dark:border-sky-700 border-slate-300 h-10 transition-all duration-75 ease-linear dark:bg-sky-900 dark:text-slate-100 bg-slate-100"
          list="stores"
        />
        <datalist class="text-xl" id="stores">
          <option v-for="store in stores" :value="store.name">
            {{ store.name }}
          </option>
        </datalist>
        <button
          type="submit"
          class="dark:bg-amber-400 bg-indigo-500 h-10 w-10 flex flex-row items-center justify-center transition-all duration-75 ease-linear hover:shadow-md rounded-l-lg text-slate-50"
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
      <div class="mt-2 w-full flex flex-row justify-center">
        <button
          :class="{ 'bg-blue-500': active.active_1 }"
          @click="changeDateTime('active_1')"
          class="mx-1 hover:underline text-white px-2 py-1 text-lg rounded-lg"
        >
          روزانه
        </button>

        <button
          :class="{ 'bg-blue-500': active.active_4 }"
          @click="changeDateTime('active_4')"
          class="mx-1 hover:underline text-white px-2 py-1 text-lg rounded-lg"
        >
          هفتگی
        </button>

        <button
          :class="{ 'bg-blue-500': active.active_2 }"
          @click="changeDateTime('active_2')"
          class="mx-1 hover:underline text-white px-2 py-1 text-lg rounded-lg"
        >
          ماهانه
        </button>
        <button
          :class="{ 'bg-blue-500': active.active_3 }"
          @click="changeDateTime('active_3')"
          class="mx-1 hover:underline text-white px-2 py-1 text-lg rounded-lg"
        >
          سالانه
        </button>
      </div>
      <canvas id="myChart" class="h-full w-full text-white mt-10"></canvas>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";
import { onMounted, reactive, ref, watch } from "vue";
import { useCookies } from "vue3-cookies";
import LoadingSection from "../components/loadingSection.vue";
// import searchBox from "@/components/searchBox.vue";
export default {
  components: { LoadingSection },
  props: {
    msg: String,
  },
  setup(props) {
    const active = reactive({
      active_1: false,
      active_2: false,
      active_3: false,
      active_4: true,
    });

    function changeDateTime(dateName) {
      for (const i of Object.keys(active)) {
        active[i] = false;
        if (i == dateName) {
          active[i] = true;
        }
      }
      input.filter = active.active_1
        ? 1
        : active.active_2
        ? 30
        : active.active_3
        ? 365
        : 7;
    }
    const searchBoxData = ref(false);
    function test(res) {
      searchBoxData.value = res;
    }
    const input = reactive({
      code: "",
      store_name: "",
      filter: 7,
      _token: useCookies().cookies.get("_token"),
    });
    function submit() {
      searchBoxData.value = !searchBoxData.value;
    }
    onMounted(() => {
      watch(searchBoxData, function () {
        axios
          .post("http://localhost:8000/api/productDitails", input)
          .then(function (response) {
            const dataSendCount = ref([]);
            const dataGetCount = ref([]);
            const dataLabels = ref([]);
            const val = response.data.value;
            for (const i of Object.keys(val)) {
              dataSendCount.value.push(val[i].store_sender);
              dataGetCount.value.push(val[i].store_geter);
              dataLabels.value.push(new Date(val[i].firstTime).toLocaleDateString('fa-IR') + ' - ' + new Date(val[i].latestTime).toLocaleDateString('fa-IR'));
            }
            const data = {
              labels: dataLabels.value,
              datasets: [
                {
                  responsive: true,
                  label: "دریافت",
                  data: dataGetCount.value,
                  fill: true,
                  borderColor: "rgb(75, 192, 130)",
                  backgroundColor: "rgba(75, 192, 130,0.3)",
                  tension: 0.5,
                  borderWidth: 2,
                },
                {
                  responsive: true,
                  label: "ارسال",
                  data: dataSendCount.value,
                  fill: true,
                  borderColor: "rgb(219, 68, 68)",
                  backgroundColor: "rgba(219, 68, 68,0.3)",
                  tension: 0.5,
                  borderWidth: 2,
                },
              ],
            };
            new Chart(ctx, {
              type: "line",
              data: data,
              options: {
                plugins: {
                  legend: {
                    labels: { font: { size: 14, family: ["yekan"] } },
                    rtl: true,
                  },
                },
              },
            });
          });
      });
      const ctx = document.getElementById("myChart");
      axios
        .get(
          "http://localhost:8000/api/chartCategory/" +
            useCookies().cookies.get("_token")
        )
        .then(function (response) {
          const count = ref(response.data.value.count);
          const names = ref(response.data.value.names);

          function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
          const backgroundColor = ref([]);
          for (let index = 0; index < count.value.length; index++) {
            backgroundColor.value.push([
              "rgba(" +
                getRandomInt(255) +
                "," +
                getRandomInt(255) +
                "," +
                getRandomInt(255) +
                ")",
            ]);
          }

          const data2 = ref("");

          data2.value = {
            labels: names.value,
            datasets: [
              {
                label: "My First Dataset",
                responsive: true,
                data: count.value,
                backgroundColor: backgroundColor,
                hoverOffset: 5,
                hoverBackgroundColor: backgroundColor,
              },
            ],
          };

          new Chart(document.getElementById("pieChart"), {
            type: "doughnut",
            data: data2.value,
            options: {
              plugins: {
                legend: {
                  labels: { font: { size: 14, family: ["yekan"] } },
                  rtl: true,
                },
              },
            },
          });
        });
    });

    Chart.defaults.color = "#aaa";
    const stores = ref("");
    const categories = ref("");
    axios
      .get(
        "http://localhost:8000/api/getAllStores/" +
          useCookies().cookies.get("_token")
      )
      .then((res) => {
        stores.value = res.data.value;
      });
    axios
      .get(
        "http://localhost:8000/api/category/" +
          useCookies().cookies.get("_token")
      )
      .then(function (res) {
        categories.value = res.data.value;
      });

    return {
      searchBoxData,
      test,
      stores,
      active,
      changeDateTime,
      input,
      submit,
      categories,
    };
  },
};
</script>
