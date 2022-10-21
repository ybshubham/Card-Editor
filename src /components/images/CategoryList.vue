<template>
  <div class="flex-display">
    <q-icon
      v-if="scrollLeftVisible"
      name="arrow_left"
      color="primary"
      size="3rem"
      class="scroll-left"
      @click.stop="leftScrollHandler"
    />
    <div id="category-list" class="category-list" @scroll="debounce">
      <div
        class="category-container"
        v-for="(item, index) in categoryList"
        :key="item.id"
      >
        <CategoryItem
          @click.stop="categoryClickHandler(index)"
          :category="item"
          v-if="!isSingleCategory"
          :class="{
            'active-category': activeCategory && activeCategory.id === item.id,
          }"
        />
        <CategoryData
          v-if="activeCategory && activeCategory.id === item.id"
          :categoryId="activeCategory.id"
          :imageList="activeCategory.images"
          :showBackBtn="backBtnVisible"
          @hide-images="hideImagesHandler"
        />
      </div>
    </div>
    <q-icon
      v-if="scrollRightVisible"
      name="arrow_right"
      color="primary"
      size="3rem"
      class="scroll-right"
      @click.stop="rightScrollHandler"
    />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import CategoryItem from "src/components/images/CategoryItem.vue";
import CategoryData from "components/images/CategoryData.vue";
import { debouncer } from "src/utils/helper-methods";
import { usecardEditorStore } from "src/stores/card-editor-store";

/* Store */
const cardEditorStore = usecardEditorStore();

/* data */
let scrollLeftVisible = ref(false);
let scrollRightVisible = ref(true); // shows right arrow even if categories are not overflowing
let isSingleCategory = ref(false);
let backBtnVisible = ref(true);
let categoryList = ref(cardEditorStore.getCardEditorMetaData.categories);
let activeCategory = ref(null);
const debounce = ref(null);

/* methods */
function getCategoryListElement() {
  return document.getElementById("category-list");
}

function moveCategoryToStart(index) {
  const item = categoryList.value.splice(index, 1);
  categoryList.value.unshift(item[0]);
  activeCategory.value = categoryList.value[0];
}

function categoryClickHandler(index) {
  // shift selected cateory to start
  moveCategoryToStart(index);

  const categoryListElement = getCategoryListElement();
  categoryListElement.scrollLeft = 0; // scroll to initial position
}

function hideImagesHandler() {
  activeCategory.value = null;
}

function leftScrollHandler() {
  const categoryListElement = getCategoryListElement();
  categoryListElement.scrollLeft -= window.innerWidth / 2;
}

function rightScrollHandler() {
  const categoryListElement = getCategoryListElement();
  categoryListElement.scrollLeft += window.innerWidth / 2;
}

function detectOverflow() {
  const categoryListElement = getCategoryListElement();

  // left end : show left arrow icon
  if (categoryListElement.scrollLeft > 0) {
    scrollLeftVisible.value = true;
  } else {
    scrollLeftVisible.value = false;
  }

  // right end : hide right arrow icon
  if (
    categoryListElement.scrollLeft + 1 >=
    categoryListElement.scrollWidth - categoryListElement.offsetWidth
  ) {
    scrollRightVisible.value = false;
  } else {
    scrollRightVisible.value = true;
  }
}

// lifecycle hook
onBeforeMount(() => {
  // # Default Category : Provide id for default active category (if any) : replace 3312038 with category id
  // const idx = categoryList.value.findIndex((item) => item.id === 3312038);
  // moveCategoryToStart(idx);

  // check for single category
  if (categoryList.value.length === 1) {
    isSingleCategory.value = true;
    activeCategory.value = categoryList.value[0];
    backBtnVisible.value = false;
  }

  debounce.value = debouncer(detectOverflow, 100);
});
</script>

<style lang="scss" scoped>
.flex-display {
  display: flex;
}

.category-container {
  display: inline-block;
  margin-right: 12px;
  cursor: pointer;
}

.active-category {
  border-radius: 10px;
  border: 4px solid orange;
  box-shadow: 10px 0 6px -2px #888;
}

.scroll-left,
.scroll-right {
  margin-top: 18px;
  cursor: pointer;
}

.category-list {
  overflow: auto;
  width: 98%;
  overflow: auto;
  scroll-behavior: smooth;
}
</style>
