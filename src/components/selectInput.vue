<template>
  <div class="w-full">
    <div class="flex w-1/3">
      <h1
        class="px-2 bg-slate-100 font-normal dark:bg-sky-900 dark:text-slate-100 mx-1 rounded-md flex flex-row items-center"
        v-for="value in arr"
      >
        {{ value }}

        <span class="mr-1 cursor-pointer" @click="deleteFromArray(value)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
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
        </span>
      </h1>
    </div>
    <form @submit.prevent="pushToArray(data)">
      <input
        v-model="data"
        class="w-2/3 mt-1 rounded-lg text-base font-normal dark:bg-sky-700 px-2 h-8 bg-slate-100 mx-2"
        list="stores"
      />
      <datalist class="text-xl" id="stores">
        <option v-for="d in props" :value="d.name">
          {{ d.name }}
        </option>
      </datalist>
      <button type="submit" class="bg-blue-500 px-2 py-1 rounded-lg">
        انتخاب
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["data", "dataShow"],
  setup(p, {emit}) {
    const props = p.data;
    let inputData = ref([]);
    const arr = ref([]);
    if(p.dataShow) {
      for (const key in p.dataShow) {
        arr.value.push(p.dataShow[key].name)
      }
      emit("sendStoreValue", arr.value);
    }

    const data = ref("");
    function pushToArray(input) {
      for (const key in props) {
        if(props[key].name == input) {
          arr.value.push(input);
          emit("sendStoreValue", arr.value);
        }
      }
      data.value = null;
    }
    function deleteFromArray(input) {
      for (const i in arr.value) {
        if(arr.value[i] == input) {
          arr.value.splice(i, 1);
        }
      }
    }
    return { inputData, arr, data, pushToArray, props, deleteFromArray };
  },
};
</script>
