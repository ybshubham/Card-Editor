<template>
  <q-img
    :src="category.featured_img"
    width="115px"
    height="80px"
    spinner-color="lime-5"
  >
    <div class="absolute-full text-subtitle2 flex flex-center">
      <div class="category-title ellipsis">{{ category.title }}</div>
    </div>
    <q-tooltip>
      {{ category.title }}
    </q-tooltip>
  </q-img>
</template>

<script setup>
const props = defineProps(["category"]);
</script>

<style lang="scss" scoped>
// .category-title {
// position: relative;
// top: 30%;
// width: 127%;
// right: 10%;
// }
</style>
