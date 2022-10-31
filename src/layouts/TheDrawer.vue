<template>
  <q-drawer
    v-model="cardEditorStore.isDrawerOpen"
    show-if-above
    bordered
    content-class="bg-grey-3"
  >
    <q-scroll-area class="fit">
      <q-tab-panels
        v-model="cardEditorStore.activePanel"
        animated
        class="bg-transparent"
      >
        <q-tab-panel name="home" class="no-padding">
          <q-list class="q-pt-sm">
            <template
              v-for="(menuItem, index) in cardEditorStore.getCardEditorMetaData
                .menuList"
              :key="index"
            >
              <q-item
                clickable
                @click="menuItemClickHandler(menuItem)"
                active-class="my-menu-link"
                class="text-grey-10"
                v-if="
                  !(
                    menuItem.name !== 'colors' &&
                    cardEditorStore.getActiveTab === 'envelope'
                  )
                "
              >
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon"></q-icon>
                </q-item-section>
                <q-item-section>
                  <!-- {{ menuItem.label }} -->
                  {{ t(menuItem.name) }}
                </q-item-section>
                <q-item-section avatar v-if="menuItem.child">
                  <q-icon name="chevron_right"></q-icon>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="colors" class="no-padding">
          <q-list>
            <q-item clickable @click="subMenuItemClickHandler">
              <q-item-section avatar>
                <q-icon name="chevron_left"></q-icon>
              </q-item-section>
              <q-item-section> {{ t("colors") }} </q-item-section>
            </q-item>
            <q-separator></q-separator>
            <q-item>
              <q-item-section avatar>
                <div class="dot-container">
                  <div
                    v-for="(color, idx) in cardEditorStore.getCardEditorMetaData
                      .colorsWidget"
                    :key="idx"
                    class="dot"
                    :style="{
                      'background-color': color.code.hex,
                    }"
                    @click="colorClickHandler(color.id)"
                  >
                    <div
                      class="checkmark"
                      v-if="
                        getActiveColourId(
                          cardEditorStore.getActiveTab,
                          cardEditorStore.getActiveTab === 'front'
                            ? cardEditorStore.getActiveFrontLayoutId
                            : cardEditorStore.getActiveBackLayoutId
                        ) === color.id
                      "
                    ></div>
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="shapes" class="no-padding">
          <q-list>
            <q-item clickable @click="subMenuItemClickHandler">
              <q-item-section avatar>
                <q-icon name="chevron_left"></q-icon>
              </q-item-section>
              <q-item-section> {{ t("shapes") }} </q-item-section>
            </q-item>
            <q-separator></q-separator>
            <q-item>
              <q-item-section avatar>
                <div class="shapes-container">
                  <div
                    class="shape"
                    :class="{
                      'active-shape':
                        shape.id === cardEditorStore.getActiveShapeId,
                    }"
                    v-for="shape in cardEditorStore.getCardEditorMetaData
                      .productShapes"
                    :key="shape.id"
                    @click="shapeClickHandler(shape.id)"
                  >
                    <span
                      class="material-icons heavy-checkmark"
                      v-if="shape.id === cardEditorStore.getActiveShapeId"
                    >
                      check
                    </span>
                    <div
                      :style="shape.style"
                      style="border: 1px solid black"
                    ></div>
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="layouts" class="no-padding">
          <q-list>
            <q-item clickable @click="subMenuItemClickHandler">
              <q-item-section avatar>
                <q-icon name="chevron_left"></q-icon>
              </q-item-section>
              <q-item-section> {{ t("SelectA_"+cardEditorStore.getActiveTab+"_Design") }} </q-item-section>
            </q-item>
            <q-separator></q-separator>
            <q-item style="justify-content: center">
              <q-item-section avatar style="height: 100%">
                <div class="layouts-container" :key="cardEditorStore.activeTab">
                  <div
                    class="layout-card-container"
                    v-for="layout in layouts"
                    :key="layout.id"
                    :class="{
                      'active-layout':
                        layout.id ===
                        (cardEditorStore.getActiveTab === 'front'
                          ? cardEditorStore.getActiveFrontLayoutId
                          : cardEditorStore.getActiveBackLayoutId),
                    }"
                    @click="cardClickHandler(layout)"
                  >
                    <span
                      class="material-icons heavy-checkmark"
                      v-if="
                        layout.id ===
                        (cardEditorStore.getActiveTab === 'front'
                          ? cardEditorStore.getActiveFrontLayoutId
                          : cardEditorStore.getActiveBackLayoutId)
                      "
                    >
                      check
                    </span>
                    <WeddingCard
                      :id="
                        'sidebar-' +
                        cardEditorStore.getActiveTab +
                        '-' +
                        layout.id
                      "
                      :identity="'sidebar' + layout.id"
                      :active-tab="cardEditorStore.getActiveTab"
                      :layout="layout"
                      class="card-transform"
                      :shape="activeShape"
                      :disable-interaction="true"
                      :bgColor="
                        getActiveBgColor(
                          cardEditorStore.getActiveTab,
                          layout.id
                        )
                      "
                    />
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { usecardEditorStore } from "src/stores/card-editor-store";
import WeddingCard from "src/components/wedding-card/WeddingCard.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// pinia store
const cardEditorStore = usecardEditorStore();
const getActiveColourId = cardEditorStore.getActiveColorId;
const getActiveBgColor = cardEditorStore.getActiveBgColor;

const emit = defineEmits([
  "menuItemClick",
  "subMenuItemClick",
  "setBackgroundColor",
]);

const activeShape = computed(() => {
  return cardEditorStore.getCardEditorMetaData.productShapes.find(
    (shape) => shape.id === cardEditorStore.getActiveShapeId
  );
});

const layouts = computed(() => {
  if (cardEditorStore.getActiveTab === "front") {
    return cardEditorStore.getCardEditorMetaData.productDesigns.find(
      (layout) => layout.name === "front"
    ).layouts;
  } else if (cardEditorStore.getActiveTab === "back") {
    return cardEditorStore.getCardEditorMetaData.productDesigns.find(
      (layout) => layout.name === "back"
    ).layouts;
  }
});

/* methods */
function menuItemClickHandler(item) {
  emit("menuItemClick", item);
}

function subMenuItemClickHandler() {
  emit("subMenuItemClick");
}

function colorClickHandler(id) {
  let color = cardEditorStore.getCardEditorMetaData.colorsWidget.find(
    (item) => item.id === id
  ).code.hex;

  // newly added code
  const activeTab = cardEditorStore.getActiveTab;
  const activeLayoutId =
    activeTab === "front"
      ? cardEditorStore.getActiveFrontLayoutId
      : cardEditorStore.getActiveBackLayoutId;
  cardEditorStore.setActiveColorId(activeTab, activeLayoutId, id);
}

function shapeClickHandler(id) {
  cardEditorStore.changeShapeId(id);
}

function cardClickHandler(layout) {
  cardEditorStore.getActiveTab === "front"
    ? (cardEditorStore.changeActiveFrontLayout(layout.id),
      cardEditorStore.changeActiveFrontLayoutDBId(layout.db_id))
    : (cardEditorStore.changeActiveBackLayout(layout.id),
      cardEditorStore.changeActiveBackLayoutDBId(layout.db_id));
}
</script>

<style lang="scss" scoped>
/* Color palette */
.dot-container {
  padding: 0px;

  .dot {
    height: 28px;
    width: 28px;
    border: 1px solid gray;
    border-radius: 50%;
    display: inline-block;
    margin: 1px 3px;
    position: relative;
    cursor: pointer;

    &:hover {
      box-shadow: rgb(136 165 191 / 48%) 0px 0px 0px 6px,
        rgb(255 255 255 / 80%) -6px -2px 16px 0px;
    }
  }
}

.q-item__section.column.q-item__section--side.justify-center.q-item__section--avatar {
  padding: 10px;
}

.checkmark {
  display: inline-block;
  transform: rotate(45deg);
  height: 18px;
  width: 9px;
  border-bottom: 4px solid #000;
  border-right: 4px solid #000;
  position: absolute;
  top: 3px;
  left: 8px;
}

/* shapes */
.no-fill {
  fill: none;
  stroke: gray;
  stroke-width: 1px;
  stroke-linejoin: round;
}

.shapes-container {
  margin: 16px 1px 1px 1px;
  display: flex;
  flex-wrap: wrap;

  .shape {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 8px 8px 0;
    cursor: "pointer";

    &:hover {
      background-color: #dcdcdc;
    }
  }

  .active-shape {
    background-color: #dcdcdc;
  }
}

.YL {
  &__toolbar-input-container {
    min-width: 100px;
    width: 55%;
  }

  &__toolbar-input-btn {
    border-radius: 0;
    border-style: solid;
    border-width: 1px 1px 1px 0;
    border-color: rgba(0, 0, 0, 0.24);
    max-width: 60px;
    width: 100%;
  }

  &:hover {
    color: #000;
  }
}

.layouts-container {
  width: 100%;
}

.layout-card-container {
  position: relative;
  width: 100%;
  height: 30vh !important;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px;

  &:hover {
    background-color: #dcdcdc;
    border-radius: 8px;
  }
}

.active-layout {
  background-color: #dcdcdc;
  border-radius: 16px;
}

.heavy-checkmark {
  position: absolute;
  left: -4px;
  top: -3px;
  color: white;
  background-color: black;
  border-radius: 50px;
  padding: 1px;
  z-index: 3000;
}

@media (max-width: 479px) {
  .card-transform {
    transform: scale(0.6);
    overflow: initial;
  }
}
@media (min-width: 480px) {
  .card-transform {
    transform: scale(0.4);
    overflow: initial;
  }
}
</style>
