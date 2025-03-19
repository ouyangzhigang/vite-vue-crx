<template>
  <main class="popup-main">
    <header class="header transparent-gradient">
      <img width="100%" :src="headerImg" class="header-img" alt="" />
    </header>
    <div class="context">
      <component
        v-for="tool in [tools[0]]"
        :key="tool.name"
        :is="component[tool.component]"
        :data="tool"
        @triggle="triggle"
      ></component>
    </div>
  </main>
  <footer></footer>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import ImgKit from '@/components/toolkits/ImgKit.vue'
import headBg from '@/assets/img/head-bg.png'
import { TOOLS } from '@/config/biz.ts'

const headerImg = ref(headBg)
const tools = ref(TOOLS)
const component = ref({ ImgKit })
const count = ref(0)

const triggle = (type) => {
  console.log('triggle', type)
  count.value++
}

onMounted(() => {
  chrome.storage.sync.get(['count'], (result) => {
    count.value = result.count ?? 0
  })
})

// watch(count, (newCount) => {
//   chrome.storage.sync.set({ count: newCount })

//   chrome.runtime.sendMessage({ type: 'COUNT', count: count.value })
// })
</script>

<style lang="less" scoped>
:root {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;

  color-scheme: light dark;
  background-color: #242424;
}

@media (prefers-color-scheme: light) {
  :root {
    background-color: #fafafa;
  }

  a:hover {
    color: #42b983;
  }
}

body {
  min-width: 20rem;
  padding: 0;
  margin: 0;
  font-size: 16px;
  color-scheme: light dark;
}

.popup-main {
  text-align: center;
  width: 375px;
  height: 600px;
  background: linear-gradient(
    rgba(255, 0, 128, 0.5),
    rgba(55, 55, 255, 0.5),
    rgba(0, 255, 255, 0.8)
  );
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 148px;
}

.context {
  border-radius: 35px 35px 0 0;
  min-height: calc(600px - 148px);
  display: flex;
  background-color: rgba(188, 188, 188, 0.5);
  backdrop-filter: blur(15px);
  z-index: 1;
}

.transparent-gradient {
  // background: linear-gradient(to right, rgba(255, 0, 128, 0.5), rgba(55, 55, 255, 0.5), rgba(0, 255, 255, 0.8));
  // background: url('../img/head-bg.png') 0 0 no-repeat;
  // background-size: cover;
}
</style>
