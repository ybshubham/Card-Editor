<template>
  <q-card-section class="row flex flex-center">
    <q-card
      class="my-card"
      v-for="img in category.images"
      :key="img.id"
      @click="imageClickHandler(img, category)"
    >
      <q-img :src="img.thumbnail" style="width: 100%; height: 100%"> </q-img>
    </q-card>
  </q-card-section>
</template>

<script setup>
import { usecardEditorStore } from "src/stores/card-editor-store";
import { toDataURL } from "src/utils/helper-methods";

const cardEditorStore = usecardEditorStore();

/* events */
const emit = defineEmits(["imageClick"]);

/* Props */
const props = defineProps(["category", "imgConfigId", "imgConfigDbId"]);

/* methods */
function imageClickHandler(img, category) {
  // reset data in store for current imgConfig & activeTab
  let metadata1 = {
    dbId: null,
    imgId: null,
    categoryId: null,
    imgContainerId: props.imgConfigId,
    section: cardEditorStore.getActiveTab,
    img: "",
    croppedImg: "",
    originalImg: "",
    croppedOriginalImg: "",
    cropBoxData: {},
    imgCropData: {},
  };
  cardEditorStore.updateCardImages(metadata1);

  // convertinng mediumImg to base64
  toDataURL(img.mediumImg, function (dataUrl1) {
    const croppedMediumImg = dataUrl1;
    // convertinng originalImg to base64
    toDataURL(img.originalImg, function (dataUrl2) {
      const croppedOriginalImg = dataUrl2;
      let metadata2 = {
        dbId: props.imgConfigDbId,
        imgId: img.id,
        categoryId: category.id,
        imgContainerId: props.imgConfigId,
        section: cardEditorStore.getActiveTab,
        img: croppedMediumImg,
        croppedImg: "",
        originalImg: dataUrl2,
        croppedOriginalImg: croppedOriginalImg,
        cropBoxData: {},
        imgCropData: {},
      };
      cardEditorStore.updateCardImages(metadata2);
    });
  });
  emit("imageClick");
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 250px;
  height: 250px;
  margin: 1%;
}
</style>
