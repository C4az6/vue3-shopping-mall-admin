<template>
  <div>
    {{ d.num.toFixed(0) }}
  </div>
</template>

<script setup>
// ====== import ======
import { ref, reactive, computed, watch } from "vue";
// import { useRouter } from "vue-router";
// import { useStore } from "vuex";
import gsap from "gsap";

// ====== composition api init ======
// const router = useRouter();
// const store = useStore();
// ====== state ======
const d = reactive({ num: 0 });

// ====== method ======
const AnimateToValue = () => {
  /**
   * 从0通过1.5s的过渡时长逐渐累加到props.value值
   */
  gsap.to(d, { duration: 1.5, num: props.value });
};

AnimateToValue();

// ====== computed ======

// ====== other ======
const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
});

watch(
  () => props.value,
  () => AnimateToValue()
);
</script>

<style scoped></style>
