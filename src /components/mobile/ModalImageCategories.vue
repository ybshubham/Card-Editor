<template>
  <q-card-section class="row flex flex-center">
    <q-card
      class="my-card"
      v-for="(category, idx) in categoryList"
      :key="category.id"
      @click="categoryClickHandler(idx)"
    >
      <q-img :src="category.featured_img" style="width: 100%; height: 100%">
        <div class="absolute-bottom text-subtitle2 text-center">
          {{ category.title }}
        </div>
      </q-img>
    </q-card>
  </q-card-section>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { usecardEditorStore } from "src/stores/card-editor-store";

/* Store */
const cardEditorStore = usecardEditorStore();

// events
const emit = defineEmits(["categoryClick", "submit"]);

/* data */
let isSingleCategory = ref(false);
let categoryList = ref(cardEditorStore.getCardEditorMetaData.categories);

/* methods */

function categoryClickHandler(index) {
  emit("categoryClick", categoryList.value[index]);
}

// lifecycle hook
onBeforeMount(() => {
  // Provide id for default active category (if any)
  //   activate category with given id
  //   const providedId = 1
  //   const defaultActiveCategory = categoryList.value.filter((item) => {
  //     return item.id === providedId;
  //   });
  //   emit("categoryClick", defaultActiveCategory);

  // check for single category
  if (categoryList.value.length === 1) {
    isSingleCategory.value = true;
    emit("categoryClick", categoryList.value[0]);
  }
});
</script>

<style lang="scss" scoped>
.my-card {
  width: 250px;
  height: 250px;
  margin: 1%;
}
</style>
