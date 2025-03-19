<template>
    <section class="img-kit-component">
        <h1 class="h1">{{ title }}</h1>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['data'])

const title = ref(props.data.title)

</script>

<style lang="less" scoped>
.img-kit-component {
    color: red;
}
</style>
