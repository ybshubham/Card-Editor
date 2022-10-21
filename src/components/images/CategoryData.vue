<template>
  <div class="btn-container" v-if="showBackBtn">
    <q-btn
      round
      color="primary"
      icon="navigate_before"
      class="back-btn"
      @click.stop="btnClickHander"
    />
  </div>
  <q-intersection
    class="img-container"
    transition="scale"
    :once="true"
    v-for="(item, idx) in imageList"
    :key="idx"
  >
    <q-img
      class="category-img"
      :src="item.thumbnail"
      width="115px"
      height="80px"
      :draggable="true"
      spinner-color="primary"
      @dragstart="imgDragHandler(item.id)"
      @click.stop="imgClickHandler"
    >
    </q-img>
    <span class="material-icons heavy-checkmark" v-if="showCheckmark(item)">
      check
    </span>
  </q-intersection>
</template>

<script setup>
import { useQuasar } from "quasar";
import { computed } from "@vue/runtime-core";
import { usecardEditorStore } from "src/stores/card-editor-store";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const $q = useQuasar();
// pinia store
const cardEditorStore = usecardEditorStore();

const props = defineProps(["imageList", "showBackBtn", "categoryId"]);
const emits = defineEmits(["hideImages"]);

const showCheckmark = (item) => {
  let bool = false;
  if (cardEditorStore.getActiveTab === "front") {
    for (let idx in cardEditorStore.selectedImages.front) {
      if (cardEditorStore.selectedImages.front[idx].imgId === item.id) {
        bool = true;
      }
    }
  } else if (cardEditorStore.getActiveTab === "back") {
    for (let idx in cardEditorStore.selectedImages.back) {
      if (cardEditorStore.selectedImages.back[idx].imgId === item.id) {
        bool = true;
      }
    }
  }
  return bool;
};

function btnClickHander() {
  emits("hideImages");
}

function imgDragHandler(imgId) {
  cardEditorStore.setDraggedImgData({
    imgId: imgId,
    categoryId: props.categoryId,
  });
}

function imgClickHandler() {
  $q.notify({
    timeout: 2000,
    progress: true,
    position: "center",
    type: "info",
    classes: "notify-grey",
    message: t("imgActionLabels.imgDragText"),
  });
}
</script>

<style lang="scss" scoped>
.img-container {
  display: inline-block;
  margin-right: 12px;
  cursor: pointer;
}

.btn-container {
  height: 3.8rem;
  display: inline-block;
  margin: 1.5rem 2rem 0 1rem;
}

.category-img:hover {
  filter: drop-shadow(4px -1px 2px rgb(83, 83, 83));
}

.heavy-checkmark {
  position: absolute;
  font-size: 69%;
  left: -5px;
  top: -4px;
  color: white;
  background-color: black;
  border-radius: 50px;
  padding: 1px;
}
</style>
