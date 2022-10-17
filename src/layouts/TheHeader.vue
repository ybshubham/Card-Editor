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

  <!-- confirm modal -->
  <q-dialog
    v-model="showConfirmModal"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card
      class="bg-primary text-white"
      style="width: 30%; min-width: 300px; max-width: 600px"
    >
      <q-card-section>
        <div class="text-h6 beausiteLight">
          {{ t("modalText.confirmModal.title") }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none text-body1 beausiteLight">
        {{ t("modalText.confirmModal.content") }}
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-primary">
        <q-btn
          flat
          class="beausiteLight"
          :label="t('btnLabels.cancel')"
          v-close-popup
        />
        <q-btn
          flat
          class="beausiteMedium"
          :label="t('btnLabels.proceed')"
          v-close-popup
          @click="proceedClickHandler"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Mobile Modals -->
  <template v-if="cardEditorStore.getIsMobileDevice">
    <q-dialog v-model="showSubmitModal" persistent>
      <q-card style="max-width: 90vw; width: 90vw" @contextmenu.prevent>
        <q-linear-progress
          stripe
          rounded
          indeterminate
          class="q-mt-xs"
          v-if="isUploading"
        />
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 beausiteMedium">{{ t("preview") }}</div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            v-if="!isUploading"
          />
        </q-card-section>
        <q-card-section class="flex flex-center">
          <WeddingCard
            identity="header"
            id="card-front-view"
            style="transform: scale(1); overflow: initial"
            active-tab="front"
            :layout="activeFrontLayout"
            :shape="activeShape"
            :disable-interaction="true"
            :key="activeFrontLayout.id"
            :bg-color="getActiveBgColor('front', activeFrontLayout.id)"
          />
        </q-card-section>
        <q-separator horizontal />
        <q-card-section class="flex flex-center">
          <WeddingCard
            identity="header"
            id="card-back-view"
            style="transform: scale(1); overflow: initial"
            active-tab="back"
            :layout="activeBackLayout"
            :shape="activeShape"
            :disable-interaction="true"
            :key="activeBackLayout.id"
            :bg-color="getActiveBgColor('back', activeBackLayout.id)"
        /></q-card-section>
        <q-card-actions align="right" class="q-mt-xl">
          <q-btn
            v-if="!isUploading"
            class="beausiteMedium"
            flat
            :label="t('btnLabels.cancel')"
            color="primary"
            v-close-popup
          />
          <!-- <q-btn
            flat
            label="Preview Image"
            color="primary"
            @click="previewImageClickHandler"
          /> -->
          <q-btn
            flat
            :loading="isUploading"
            color="primary"
            class="beausiteMedium"
            @click="uploadClickHandler"
          >
            {{ t("btnLabels.upload") }}
            <template v-slot:loading>
              <q-spinner-gears class="on-left" />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showPreviewModal">
      <q-card style="max-width: 90vw; width: 90vw" @contextmenu.prevent>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">DOM-Image</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-card-section id="front-preview"></q-card-section>
          <q-separator horizontal />
          <q-card-section id="back-preview"></q-card-section>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            :label="t('btnLabels.cancel')"
            color="primary"
            class="beausiteMedium"
            v-close-popup
          />
          <q-btn flat label="ok" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  <!-- Desktop Modals -->
  <template v-else>
    <q-dialog v-model="showSubmitModal" persistent>
      <q-card style="width: 60vw; max-width: 60vw" @contextmenu.prevent>
        <q-linear-progress
          stripe
          rounded
          indeterminate
          class="q-mt-xs"
          v-if="isUploading"
        />
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 beausiteMedium">{{ t("preview") }}</div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            v-if="!isUploading"
          />
        </q-card-section>
        <q-card-section
          id="preview-section"
          horizontal
          style="justify-content: space-between"
        >
          <q-card-section>
            <WeddingCard
              identity="header"
              id="card-front-view"
              active-tab="front"
              :layout="activeFrontLayout"
              :shape="activeShape"
              :disable-interaction="true"
              :key="activeFrontLayout.id"
              :bg-color="getActiveBgColor('front', activeFrontLayout.id)"
            />
          </q-card-section>
          <q-separator vertical />
          <q-card-section>
            <WeddingCard
              identity="header"
              id="card-back-view"
              active-tab="back"
              :layout="activeBackLayout"
              :shape="activeShape"
              :disable-interaction="true"
              :key="activeBackLayout.id"
              :bg-color="getActiveBgColor('back', activeBackLayout.id)"
          /></q-card-section>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            v-if="!isUploading"
            :label="t('btnLabels.cancel')"
            color="secondary"
            class="beausiteMedium"
            v-close-popup
          />
          <!-- <q-btn
            flat
            label="Preview Image"
            color="primary"
            @click="previewImageClickHandler"
          /> -->
          <q-btn
            flat
            :loading="isUploading"
            color="primary"
            class="beausiteMedium"
            @click="uploadClickHandler"
            :style="isUploading ? 'width: 130px' : ''"
          >
            {{ t("btnLabels.upload") }}
            <template v-slot:loading>
              <q-spinner-gears class="on-left" />
              {{ t("btnLabels.uploading") }}
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showPreviewModal">
      <q-card style="width: 652px; max-width: 80vw" @contextmenu.prevent>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">DOM-Image</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section horizontal>
          <q-card-section id="front-preview"></q-card-section>
          <q-separator vertical />
          <q-card-section id="back-preview"></q-card-section>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            :label="t('btnLabels.cancel')"
            color="primary"
            v-close-popup
          />
          <q-btn flat label="ok" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
</template>

<script setup>
import axios from "axios";
import { useQuasar } from "quasar";
import { ref, computed } from "vue";
import { usecardEditorStore } from "src/stores/card-editor-store";
import WeddingCard from "src/components/wedding-card/WeddingCard.vue";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import download from "downloadjs";

const $q = useQuasar();
const { t } = useI18n();
let { locale } = useI18n({ useScope: "global" });

/* get card editor store object */
const cardEditorStore = usecardEditorStore();
const getActiveColourId = cardEditorStore.getActiveColorId;
const getActiveBgColor = cardEditorStore.getActiveBgColor;

/* Get route object */
const route = useRoute();

// set default locale
locale.value =
  route.query.hasOwnProperty("language") && route.query.language
    ? route.query.language
    : "en-US";

/* data */
let showSubmitModal = ref(false);
let showPreviewModal = ref(false);
let showConfirmModal = ref(false);
let isUploading = ref(false);
let domImgFront = ref(null);
let domImgBack = ref(null);

/* computed */
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

/* methods */
function switchTab(value) {
  cardEditorStore.changeTab(value);
}

function toggleDrawerHandler() {
  cardEditorStore.toggleDrawer();
}

function submitClickHandler() {
  showSubmitModal.value = true;
}

async function generateDomImage() {
  const frontLayoutId = cardEditorStore.getActiveFrontLayoutId;
  const backLayoutId = cardEditorStore.getActiveBackLayoutId;
  const frontLayoutObj = cardEditorStore.getCardEditorMetaData[
    "productDesigns"
  ][0].layouts.find((item) => item.id === frontLayoutId);
  const backLayoutObj = cardEditorStore.getCardEditorMetaData[
    "productDesigns"
  ][1].layouts.find((item) => item.id === backLayoutId);

  let [frontLayoutWidthRatio, frontLayoutHeightRatio] =
    frontLayoutObj.aspectRatio.split("/");
  let [backLayoutWidthRatio, backLayoutHeightRatio] =
    backLayoutObj.aspectRatio.split("/");
  // Generate image from card front view
  const frontNode = document.getElementById("card-front-view");

  console.log(
    "canvasHeight:",
    Math.floor(parseFloat(frontLayoutWidthRatio) * 300)
  );
  console.log(
    "canvasHeight:",
    Math.floor(parseFloat(frontLayoutHeightRatio) * 300)
  );

  await htmlToImage.toJpeg(frontNode);

  await htmlToImage
    .toJpeg(frontNode, {
      canvasWidth: Math.floor(parseFloat(frontLayoutWidthRatio) * 300),
      canvasHeight: Math.floor(parseFloat(frontLayoutHeightRatio) * 300),
    })
    .then(function (dataUrl) {
      // const previewEl = document.getElementById("front-preview");
      // let img = new Image();
      // img.src = dataUrl;
      // img.style.width = "300px";
      // img.style.height = "400px";
      // previewEl.appendChild(img);
      domImgFront.value = dataUrl;
      download(dataUrl, "front.jpeg");
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });

  const backNode = document.getElementById("card-back-view");

  await htmlToImage.toJpeg(backNode);

  await htmlToImage
    .toJpeg(backNode, {
      canvasWidth: Math.floor(parseFloat(backLayoutWidthRatio) * 300),
      canvasHeight: Math.floor(parseFloat(backLayoutHeightRatio) * 300),
    })
    .then(function (dataUrl) {
      // const previewEl = document.getElementById("back-preview");
      // let img = new Image();
      // img.src = dataUrl;
      // img.style.width = "300px";
      // img.style.height = "400px";
      // previewEl.appendChild(img);
      domImgBack.value = dataUrl;
      download(dataUrl, "back.jpeg");
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}

function previewImageClickHandler() {
  /**
   * Generates image from DOM
   */
  showPreviewModal.value = true;
  generateDomImage();
}

function createEditableTextConfigsJson(tab, layoutId) {
  return Object.keys(cardEditorStore.getTextFormattingData[tab][layoutId]).map(
    (key) => {
      return {
        id: parseInt(key),
        db_id:
          cardEditorStore.getTextFormattingData[tab][layoutId][key]["dbId"],
        html: cardEditorStore.getTextFormattingData[tab][layoutId][key]["html"],
      };
    }
  );
}

function createImgConfigsJson(tab) {
  return Object.keys(cardEditorStore.getSelectedImages[tab])
    .map((key) => {
      // add check if key is an empty object
      if (!Object.keys(cardEditorStore.getSelectedImages[tab][key]).length) {
        return;
      }

      return {
        id: parseInt(key),
        db_id: cardEditorStore.getSelectedImages[tab][key]["dbId"],
        image_id: cardEditorStore.getSelectedImages[tab][key]["imgId"],
        category_id: cardEditorStore.getSelectedImages[tab][key]["categoryId"],
        crop_box_data:
          cardEditorStore.getSelectedImages[tab][key]["cropBoxData"],
        img_crop_data:
          cardEditorStore.getSelectedImages[tab][key]["imgCropData"],
      };
    })
    .filter((item) => item);
}

async function createConfig(payload) {
  return axios.post(
    `${process.env.API_BASE_URL}/designer/${route.query.cart_id}/${route.query.product_id}/${route.query.option_id}?url=${route.query.url}&token=${route.query.token}`,
    {
      custom: payload,
    }
  );
}

async function updateConfig(payload) {
  return axios.put(
    `${process.env.API_BASE_URL}/designer/${route.query.cart_id}/${route.query.product_id}/${route.query.option_id}/${route.query.cart_item_product_design_id}?url=${route.query.url}&token=${route.query.token}`,
    {
      custom: payload,
    }
  );
}

async function uploadDesignImages(imgCount, cartId, cardItemProductDesignId) {
  return axios.post(
    `${process.env.API_BASE_URL}/designer/upload/${cartId}/${route.query.option_id}/${cardItemProductDesignId}?url=${route.query.url}&token=${route.query.token}`,
    {
      design_count: imgCount,
      design_1: domImgFront.value,
      design_2: domImgBack.value,
    }
  );
}

function redirectUser(action) {
  if (
    action === "success" &&
    route.query.hasOwnProperty("return_success") &&
    route.query.return_success
  ) {
    window.location.href = route.query.return_success;
  } else if (
    action === "error" &&
    route.query.hasOwnProperty("return_cancel") &&
    route.query.return_cancel
  ) {
    window.location.href = route.query.return_cancel;
  } else {
    window.history.back();
  }
}

function createDesignEditorPayload() {
  const response = {};
  response["shape_id"] = cardEditorStore.getActiveShapeId;
  response["product_design"] = cardEditorStore.getCardEditorMetaData[
    "productDesigns"
  ].map((tab) => {
    const layoutId =
      tab.name === "front"
        ? cardEditorStore.getActiveFrontLayoutId
        : cardEditorStore.getActiveBackLayoutId;
    const layoutDBId =
      tab.name === "front"
        ? cardEditorStore.getActiveFrontLayoutDBId
        : cardEditorStore.getActiveBackLayoutDBId;

    const layoutObj = tab.layouts.find((item) => item.id === layoutId);
    return {
      id: tab.id,
      db_id: tab.db_id,
      name: tab.name,
      layout: {
        id: layoutId,
        db_id: layoutDBId,
        bg_Color_id: getActiveColourId(tab.name, layoutId),
        ...(layoutObj.editableTextConfigs.length && {
          editable_text_configs: createEditableTextConfigsJson(
            tab.name,
            layoutId
          ),
        }),
        img_configs: createImgConfigsJson(tab.name),
      },
    };
  });
  return response;
}

function apiSettlementCleanup(
  apiResult,
  notificationType,
  notificationMessage,
  timeoutLimit
) {
  showSubmitModal.value = false;
  $q.notify({
    progress: true,
    position: "top",
    type: notificationType,
    message: notificationMessage,
    timeout: timeoutLimit,
  });
  redirectUser(apiResult);
}

function validateCard() {
  // front
  const frontLayoutId = cardEditorStore.getActiveFrontLayoutId;
  const frontLayout =
    cardEditorStore.getCardEditorMetaData.productDesigns[0].layouts.find(
      (layout) => {
        if (layout.id === frontLayoutId) {
          return layout;
        }
      }
    );
  const totalFrontImgConfigs = frontLayout.imgConfigs.length;

  // back
  const backLayoutId = cardEditorStore.getActiveBackLayoutId;
  const backLayout =
    cardEditorStore.getCardEditorMetaData.productDesigns[1].layouts.find(
      (layout) => layout.id === backLayoutId
    );
  const totalBackImgConfigs = backLayout.imgConfigs.length;

  // validate with selected images so far
  const selectedImages = cardEditorStore.getSelectedImages;
  let flag = true;

  for (let i = 1; i <= totalFrontImgConfigs; i++) {
    if (!Object.keys(selectedImages.front[i]).length) {
      flag = false;
      break;
    }
  }

  if (flag) {
    for (let i = 1; i <= totalBackImgConfigs; i++) {
      if (!Object.keys(selectedImages.back[i]).length) {
        flag = false;
        break;
      }
    }
  }

  return flag;
}

function uploadClickHandler() {
  const isValid = validateCard();

  if (!isValid) {
    $q.notify({
      progress: true,
      position: "top",
      type: "negative",
      message: t("validationText.cardValidationText"),
      timeout: 4000,
    });
  } else {
    showConfirmModal.value = true;
  }
}

async function proceedClickHandler() {
  isUploading.value = true;
  await generateDomImage();

  // creating response payload
  // const payload = createDesignEditorPayload();

  // // calling create/update config api
  // const configResponse =
  //   (await route.query.hasOwnProperty("cart_item_product_design_id")) &&
  //   route.query.cart_item_product_design_id
  //     ? updateConfig(payload)
  //     : createConfig(payload);

  // configResponse
  //   .then((resp) => {
  //     if (resp.data.status === 200) {
  //       const { cart_id, cart_item_product_design_id } = resp.data.data;
  //       uploadDesignImages(2, cart_id, cart_item_product_design_id)
  //         .then((response) => {
  //           if (response.data.status === 200) {
  //             apiSettlementCleanup(
  //               "success",
  //               "positive",
  //               t("apiResponseText.uploadSuccessText"),
  //               2000
  //             );
  //           } else {
  //             apiSettlementCleanup(
  //               "error",
  //               "negative",
  //               t("apiResponseText.uploadErrorText"),
  //               4000
  //             );
  //           }
  //         })
  //         .catch((err) => {
  //           apiSettlementCleanup(
  //             "error",
  //             "negative",
  //             t("apiResponseText.uploadErrorText"),
  //             4000
  //           );
  //         });
  //     } else {
  //       apiSettlementCleanup(
  //         "error",
  //         "negative",
  //         t("apiResponseText.uploadErrorText"),
  //         4000
  //       );
  //     }
  //   })
  //   .catch((err) => {
  //     apiSettlementCleanup(
  //       "error",
  //       "negative",
  //       t("apiResponseText.uploadErrorText"),
  //       3000
  //     );
  //   });
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
