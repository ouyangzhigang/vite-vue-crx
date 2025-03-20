<template>
  <section class="img-kit-component">
    <h1 class="h3 text-center">{{ name }}</h1>
    <div class="img p-8">
      <PictureImg :src="src" />
    </div>
    <div class="description">{{ desc }}</div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PictureImg from '@/components/common/Pic.vue'

const props = defineProps(['data'])

const name = ref(props.data.name)
const src = ref(props.data.src)
const desc = ref(props.data.desc)
</script>

<style lang="less" scoped>
.img-kit-component {
  text-align: center;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.25);
  // backdrop-filter: blur(15px);
  width: 95px;
  height: 148px;
  overflow: hidden;
  .h3 {
    color: #666;
    font-size: 13px;
    font-weight: 600;
    line-height: 25px;
    background-color: white;
    opacity: 0.9;
    margin-bottom: 0;
  }
  .img {
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(100px);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px auto;
    width: calc(100% - 8px);
  }
  .description {
    color: white;
    font-size: 12px;
    font-weight: 400;
    line-height: 25px;
    transform: translateY(-5px);
  }
}
</style>
