<template>
  <q-footer class="footer">
    <q-toolbar>
      <q-toolbar-title>
        <CategoryList />
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<script setup>
import CategoryList from "components/images/CategoryList.vue";
</script>

<style lang="scss" scoped>
.q-footer {
  background-color: transparent;
}

.footer {
  border: 0.5px solid lightgrey;
  padding-top: 4px;
}
</style>
