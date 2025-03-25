<template>
  <picture class="picture inline-block">
    <source :srcset="srcset" type="image/svg+xml" />
    <img class="img" :src="src" width="85%" alt="tool LOGO" />
  </picture>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import picSvg from '@/assets/img/pic.svg'

defineProps({
  src: String,
  caption: String,
})

const srcset = ref(picSvg)
</script>

<style lang="less" scoped>
.picture {
  padding: 16px 0;
  text-align: center;
  animation: fadeIn 1.5s linear 0s infinite;
}

.img {
  margin: 0 auto;
}

@keyframes fadeIn {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }

  85% {
    opacity: 0.85;
  }
  100% {
    opacity: 0.95;
  }
}
</style>
