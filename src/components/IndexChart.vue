<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="flex items-center justify-between">
          <span>订单统计</span>
          <div>
            <el-check-tag
              v-for="(item, index) in options"
              :key="index"
              style="margin-right: 8px"
              :checked="current === item.value"
              @click="handleChoose(item.value)"
              >{{ item.text }}</el-check-tag
            >
          </div>
        </div>
      </template>

      <div ref="el" id="chart" style="width: 100%; height: 300px"></div>
    </el-card>
  </div>
</template>

<script setup>
// ====== import ======
import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { getStatistics3 } from "~/api/index.js";
import { useResizeObserver } from "@vueuse/core";

const current = ref("week");

const options = [
  {
    text: "近1个月",
    value: "month",
  },
  {
    text: "近1周",
    value: "week",
  },
  {
    text: "近24小时",
    value: "hour",
  },
];

const handleChoose = (type) => {
  current.value = type;
  getData();
};

let myChart;
onMounted(() => {
  myChart = echarts.init(document.getElementById("chart"));
  getData();
});

onBeforeUnmount(() => {
  if (myChart) echarts.dispose(myChart);
});

const getData = () => {
  let echartsConfig = {
    xAxis: {
      type: "category",
      data: [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };
  // 让echart显示loading效果
  myChart.showLoading();
  getStatistics3(current.value)
    .then((res) => {
      echartsConfig.xAxis.data = res.x;
      echartsConfig.series[0].data = res.y;
      myChart.setOption(echartsConfig);
    })
    .finally(() => myChart.hideLoading());
};

const el = ref(null);
useResizeObserver(el, (entries) => myChart.resize());
</script>

<style scoped></style>
