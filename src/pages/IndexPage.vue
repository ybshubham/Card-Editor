<template>
  <q-page class="q-page-class" style="min-height: 100vh">
    <q-btn
      round
      flat
      color="primary"
      icon="arrow_back_ios"
      class="indicator-btn-left"
      style="margin: 1%"
      @click="previousLayoutHandler"
    />
    <WeddingCard
      id="idxpg-frnt"
      identity="main"
      v-if="cardEditorStore.activeTab === 'front'"
      :active-tab="cardEditorStore.getActiveTab"
      :layout="activeFrontLayout"
      :shape="activeShape"
      :disable-interaction="false"
      :key="activeFrontLayout.id"
      :bgColor="
        getActiveBgColor(cardEditorStore.activeTab, activeFrontLayout.id)
      "
    />
    <WeddingCard
      id="idxpg-bck"
      identity="main"
      v-else-if="cardEditorStore.activeTab === 'back'"
      :active-tab="cardEditorStore.getActiveTab"
      :layout="activeBackLayout"
      :shape="activeShape"
      :disable-interaction="false"
      :key="activeBackLayout.id"
      :bgColor="
        getActiveBgColor(cardEditorStore.activeTab, activeBackLayout.id)
      "
    />
    <!-- <TheEnvelope v-else /> -->
    <q-btn
      round
      flat
      color="primary"
      icon="arrow_forward_ios"
      class="indicator-btn-right"
      style="margin: 1%"
      @click="nextLayoutHandler"
    />
  </q-page>
</template>
<script setup>
import { computed } from "@vue/runtime-core";
import WeddingCard from "src/components/wedding-card/WeddingCard.vue";
import TheEnvelope from "src/components/wedding-card/TheEnvelope.vue";
import { usecardEditorStore } from "src/stores/card-editor-store";

const cardEditorStore = usecardEditorStore();
const getActiveBgColor = cardEditorStore.getActiveBgColor;

const activeFrontLayout = computed(() => {
  return cardEditorStore.getCardEditorMetaData.productDesigns
    .find((layout) => layout.name === "front")
    .layouts.find(
      (layout) => layout.id === cardEditorStore.getActiveFrontLayoutId
    );
});

const activeBackLayout = computed(() => {
  return cardEditorStore.getCardEditorMetaData.productDesigns
    .find((layout) => layout.name === "back")
    .layouts.find(
      (layout) => layout.id === cardEditorStore.getActiveBackLayoutId
    );
});

const activeShape = computed(() => {
  return cardEditorStore.getCardEditorMetaData.productShapes.find(
    (shape) => shape.id === cardEditorStore.getActiveShapeId
  );
});

// methods
function nextLayoutHandler() {
  cardEditorStore.changeTab("back");
}

function previousLayoutHandler() {
  cardEditorStore.changeTab("front");
}
</script>

<style lang="scss">
.indicator-btn-left {
  margin-right: 32px !important;
}
.indicator-btn-right {
  margin-left: 32px !important;
}

@media (max-width: 539px) {
  .indicator-btn-left {
    position: absolute;
    bottom: 0px;
    margin-right: 56px !important;
  }

  .indicator-btn-right {
    position: absolute;
    bottom: 0px;
    margin-left: 56px !important;
  }
}

.q-page-class {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>