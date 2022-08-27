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
    <!-- <div class="h-full lg:w-2/3 w-full lg:mt-56 mt-32">
      <h1 class="text-3xl text-slate-800 text-center dark:text-slate-100">
        آمار محصول
      </h1>
      <search-box
        class="mt-10"
        :data="searchBoxData"
        @updateName="test"
      ></search-box>
      <div class="mt-2 w-full flex flex-row justify-center">
        <button
          :class="{ 'bg-blue-500': active.active_1 }"
          @click="changeDateTime('active_1')"
          class="mx-1 hover:underline text-white px-2 py-1 text-lg rounded-lg"
        >
          روزانه
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
        <button
          :class="{ 'bg-blue-500': active.active_4 }"
          @click="changeDateTime('active_4')"
          class="mx-1 hover:underline text-white px-2 py-1 text-lg rounded-lg"
        >
          بدون محدودیت
        </button>
      </div>
      <canvas id="myChart" class="h-full w-full text-white mt-10"></canvas>
    </div> -->
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
    }
    const searchBoxData = ref(null);
    function test(res) {
      searchBoxData.value = res;
    }

    onMounted(() => {
      // watch(searchBoxData, function () {
      //   if (searchBox.value != "") {
      //     axios
      //       .post("http://localhost:8000/api/chartCategory", {
      //         _token: useCookies().cookies.get("_token"),
      //         category_name: searchBoxData.value,
      //       })
      //       .then(function (response) {
      //         console.log(response)
      //         const dataSendCount = ref([]);
      //         const dataGetCount = ref([]);
      //         const dataLabels = ref([]);
      //         const val = response.data.value.data[0].product.store_ditails;
      //         for (const i of Object.keys(val)) {
      //           if (
      //             val[i].store_geter_id == response.data.value.data[0].store_id
      //           ) {
      //             dataSendCount.value.push(0);
      //             dataGetCount.value.push(val[i].count);
      //           } else {
      //             dataGetCount.value.push(0);
      //             dataSendCount.value.push(val[i].count);
      //           }
      //           dataLabels.value.push(
      //             val[i].created_at.replace("T", " ").replace(".000000Z", " ")
      //           );
      //         }
      //         const data = {
      //           labels: dataLabels.value,
      //           datasets: [
      //             {
      //               responsive: true,
      //               label: "دریافت",
      //               data: dataGetCount.value,
      //               fill: true,
      //               borderColor: "rgb(75, 192, 130)",
      //               backgroundColor: "rgba(75, 192, 130,0.3)",
      //               tension: 0.5,
      //               borderWidth: 2,
      //             },
      //             {
      //               responsive: true,
      //               label: "ارسال",
      //               data: dataSendCount.value,
      //               fill: true,
      //               borderColor: "rgb(219, 68, 68)",
      //               backgroundColor: "rgba(219, 68, 68,0.3)",
      //               tension: 0.5,
      //               borderWidth: 2,
      //             },
      //           ],
      //         };
      //         new Chart(ctx, {
      //           type: "line",
      //           data: data,
      //           options: {
      //             plugins: {
      //               legend: {
      //                 labels: { font: { size: 14, family: ["yekan"] } },
      //                 rtl: true,
      //               },
      //             },
      //           },
      //         });
      //       });
      //   }
      // });
      const ctx = document.getElementById("myChart");
      axios
        .get(
          "http://localhost:8000/api/chartCategory/" +
            useCookies().cookies.get("_token")
        )
        .then(function (response) {
          const count = ref([]);
          const names = ref([]);

          for (const i of Object.keys(response.data.value)) {
            count.value.push(response.data.value[i]);
            names.value.push(i);
          }
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
                hoverBackgroundColor:backgroundColor
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

    return { searchBoxData, test, active, changeDateTime };
  },
};
</script>
