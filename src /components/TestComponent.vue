<template>
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
</template>

<script setup>
import axios from "axios";
import { useQuasar } from "quasar";
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import download from "downloadjs";
import html2canvas from "html2canvas";
import { usecardEditorStore } from "src/stores/card-editor-store";
import WeddingCard from "src/components/wedding-card/WeddingCard.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const $q = useQuasar();

/* data */
let showSubmitModal = ref(true);
const cardEditorStore = usecardEditorStore();
const getActiveColourId = cardEditorStore.getActiveColorId;
const getActiveBgColor = cardEditorStore.getActiveBgColor;

let isUploading = ref(false);
let domImgFront = ref(null);
let domImgBack = ref(null);
let showConfirmModal = ref(false);

const route = useRoute();
const router = useRouter();

router.query = {
  token:
    "U2FsdGVkX1%2Fs5EJ9SZXDclaJ7ejyVd4tKXj10snwDgScvGB91QyCa%2FMeuTj7xFASKUJmtQEACNoKtrcKN5Wi7aQs0ff7Zoga4uynd194puMJ9Bej0VDfztSV4Fd7Uja0B5wq6Bjgv2S44F4krBhxQg%3D%3D",
  url: "http://secure.instaproofs.com",
  product_id: 528792607,
  option_id: 499531,
  cart_id: 9376541,
  cart_item_product_design_id: "",
  photo_id: "",
  return_success: "",
  return_cancel: "",
  language: "en-US",
};

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

/* watcher */
watch([domImgFront, domImgBack], ([newFront, newBack], [oldFront, oldBack]) => {
  if (newFront && newBack) {
    uploadCard();
  }
});

/* methods */
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

function proceedClickHandler() {
  isUploading.value = true;
  generateDomImage();
}

function generateDomImage() {
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
  generateCardFrontView(frontLayoutWidthRatio, frontLayoutHeightRatio);
  generateCardBackView(backLayoutWidthRatio, backLayoutHeightRatio);
}

function generateCardFrontView(frontLayoutWidthRatio, frontLayoutHeightRatio) {
  const frontNode = document.getElementById("card-front-view");
  html2canvas(frontNode, {
    // scale: 10,
    windowWidth: 1575,
    windowHeight: 2175,
  }).then(function (canvas) {
    const img = canvas.toDataURL("image/jpeg");
    domImgFront.value = img;
  });
}

function generateCardBackView(backLayoutWidthRatio, backLayoutHeightRatio) {
  const backNode = document.getElementById("card-back-view");
  html2canvas(backNode, {
    // scale: 10,
    windowWidth: 1575,
    windowHeight: 2175,
  }).then(function (canvas) {
    const img = canvas.toDataURL("image/jpeg");
    domImgBack.value = img;
  });
}

async function updateConfig(payload) {
  console.log("updateConfig: router.query:", router.query);
  return axios.put(
    `${process.env.API_BASE_URL}/designer/${route.query.cart_id}/${route.query.product_id}/${route.query.option_id}/${route.query.cart_item_product_design_id}?url=${route.query.url}&token=${route.query.token}`,
    {
      custom: payload,
    }
  );
}

async function uploadDesignImages(imgCount, cartId, cardItemProductDesignId) {
  return axios.post(
    `${process.env.API_BASE_URL}/designer/upload/9376541/499531/${cardItemProductDesignId}?url=http://demo.instaproofs.com&token=U2FsdGVkX1%2Fs5EJ9SZXDclaJ7ejyVd4tKXj10snwDgScvGB91QyCa%2FMeuTj7xFASKUJmtQEACNoKtrcKN5Wi7aQs0ff7Zoga4uynd194puMJ9Bej0VDfztSV4Fd7Uja0B5wq6Bjgv2S44F4krBhxQg%3D%3D`,
    {
      design_count: imgCount,
      design_1: domImgFront.value,
      design_2: domImgBack.value,
    }
  );
}

async function uploadCard() {
  download(domImgFront.value, "front.jpeg");
  download(domImgBack.value, "back.jpeg");

  // // creating response payload
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

async function createConfig(payload) {
  return axios.post(
    `${process.env.API_BASE_URL}/designer/9376541/528792607/499531?url=http://demo.instaproofs.com&token=U2FsdGVkX1%2Fs5EJ9SZXDclaJ7ejyVd4tKXj10snwDgScvGB91QyCa%2FMeuTj7xFASKUJmtQEACNoKtrcKN5Wi7aQs0ff7Zoga4uynd194puMJ9Bej0VDfztSV4Fd7Uja0B5wq6Bjgv2S44F4krBhxQg%3D%3D`,
    {
      custom: payload,
    }
  );
}
</script>

<style scoped>
</style>
