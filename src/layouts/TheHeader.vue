<template>
  <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
    <q-toolbar>
      <q-btn flat dense round @click="toggleDrawerHandler" icon="menu" />

      <q-btn flat no-caps no-wrap class="q-ml-lg" v-if="$q.screen.gt.xs">
        <q-icon name="backup_table" color="primary" size="28px" />
        <q-toolbar-title shrink class="beausiteMedium">
          {{ t("productName") }}
        </q-toolbar-title>
      </q-btn>

      <q-space />

      <div class="YL__toolbar-input-container row no-wrap justify-center">
        <q-tabs
          class="text-grey-8 beausiteMedium"
          indicator-color="primary"
          :model-value="cardEditorStore.getActiveTab"
          @update:model-value="switchTab"
        >
          <q-tab
            v-for="layout in cardEditorStore.getCardEditorMetaData
              .productDesigns"
            :key="layout.id"
            class="text-black"
            :class="{ 'no-padding': $q.screen.width < 350 }"
            :icon="layout.icon"
            :label="$q.screen.width > 400 ? t(layout.name) : ''"
            :name="layout.name"
          />
        </q-tabs>
      </div>

      <q-space />
      <div class="q-gutter-sm row items-center no-wrap">
        <q-btn
          outline
          color="white"
          class="beausiteMedium"
          style="font-size: min(2.6vw, 14px)"
          text-color="primary"
          :label="t('btnLabels.cancel')"
          @click="redirectUser('error')"
        />
        <q-btn
          outline
          color="white"
          style="font-size: min(2.6vw, 14px)"
          class="beausiteMedium"
          text-color="primary"
          :label="t('btnLabels.submit')"
          @click="submitClickHandler"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useQuasar } from "quasar";
import { usecardEditorStore } from "src/stores/card-editor-store";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const $q = useQuasar();
const { t } = useI18n();
let { locale } = useI18n({ useScope: "global" });

/* get card editor store object */
const cardEditorStore = usecardEditorStore();

/* Get route object */
const route = useRoute();
const router = useRouter();

// set default locale
locale.value =
  route.query.hasOwnProperty("language") && route.query.language
    ? route.query.language
    : "en-US";

/* methods */
function switchTab(value) {
  cardEditorStore.changeTab(value);
}

function toggleDrawerHandler() {
  cardEditorStore.toggleDrawer();
}

function submitClickHandler() {
  router.push({ path: "/card-preview", query: route.query }); // redirect to preview component
}
</script>

<style lang="scss" scoped>
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

.no-padding {
  padding: 0px;
}
</style>
