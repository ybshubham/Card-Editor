<template>
  <q-layout view="hHh lpR lFf" class="bg-grey-1">
    <div class="spinner" v-if="showLoader">
      <q-spinner-tail color="secondary" :thickness="5" size="10vw" />
    </div>
    <template v-else>
      <TheHeader />

      <TheDrawer
        @menu-item-click="sideNavMenuItemClickHandler"
        @sub-menu-item-click="sideNavSubMenuItemClickHandler"
        @contextmenu.prevent
      />

      <TheContent
        class="content"
        style="padding-bottom: 0px; padding-top: 0%"
        @contextmenu.prevent
      />

      <TheFooter
        v-if="!cardEditorStore.getIsMobileDevice"
        @contextmenu.prevent
      />

      <q-dialog v-model="showGetStartedModal">
        <q-card
          :style="
            cardEditorStore.getIsMobileDevice
              ? 'width: 90vw; max-width: 90vw'
              : 'width: 60vw; max-width: 60vw'
          "
        >
          <q-toolbar>
            <q-avatar>
              <q-icon name="backup_table" color="primary" size="28px" />
            </q-avatar>

            <q-toolbar-title
              ><span class="text-weight-bold">
                {{ t("getStartedText.welcomeText") }}</span
              ></q-toolbar-title
            >

            <q-btn flat round dense icon="close" v-close-popup />
          </q-toolbar>

          <q-card-section>
            <q-carousel
              style="box-shadow: none"
              class="bg-white shadow-1 rounded-borders"
              control-color="primary"
              navigation-icon="radio_button_unchecked"
              transition-prev="slide-right"
              transition-next="slide-left"
              swipeable
              animated
              infinite
              :autoplay="autoplay"
              arrows
              v-model="slide"
              navigation
              padding
              @mouseenter="autoplay = false"
              @mouseleave="autoplay = 8000"
            >
              <template v-slot:navigation-icon="{ active, btnProps, onClick }">
                <q-btn
                  v-if="active"
                  size="lg"
                  icon="check_circle"
                  color="primary"
                  flat
                  round
                  dense
                  @click="onClick"
                />
                <q-btn
                  v-else
                  size="sm"
                  :icon="btnProps.icon"
                  color="primary"
                  flat
                  round
                  dense
                  @click="onClick"
                />
              </template>
              <q-carousel-slide :name="1" class="column no-wrap flex-center">
                <p>
                  <img
                    src="/images/help_step7.png"
                    style="max-width: 100%; max-height: 200px"
                  />
                </p>
                <div class="q-mt-md text-center beausiteLight text-body1">
                  {{ t("getStartedText.step1") }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide :name="2" class="column no-wrap flex-center">
                <p>
                  <img
                    src="/images/help_step2.png"
                    srcset="
                      /images/help_step2.png    1x,
                      /images/help_step2@2x.png 2x
                    "
                    style="max-width: 100%; max-height: 200px"
                  />
                </p>
                <div class="q-mt-md text-center beausiteLight text-body1">
                  {{
                    cardEditorStore.getIsMobileDevice
                      ? t("getStartedText.step2_mobile")
                      : t("getStartedText.step2")
                  }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide :name="3" class="column no-wrap flex-center">
                <p v-if="!cardEditorStore.getIsMobileDevice">
                  <img
                    src="/images/help_step3_.gif"
                    style="max-width: 100%; max-height: 200px"
                  />
                </p>
                <p v-if="cardEditorStore.getIsMobileDevice">
                  <img
                    src="/images/help_step3@2x.png"
                    style="max-width: 100%; max-height: 200px"
                  />
                </p>
                <div class="q-mt-md text-center beausiteLight text-body1">
                  {{
                    cardEditorStore.getIsMobileDevice
                      ? t("getStartedText.step3_mobile")
                      : t("getStartedText.step3")
                  }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide :name="4" class="column no-wrap flex-center">
                <p>
                  <img
                    src="/images/help_step4@2x.png"
                    style="max-width: 100%; max-height: 200px"
                  />
                </p>
                <div class="q-mt-md text-center beausiteLight text-body1">
                  {{
                    cardEditorStore.getIsMobileDevice
                      ? t("getStartedText.step4_mobile")
                      : t("getStartedText.step4")
                  }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide :name="5" class="column no-wrap flex-center">
                <p>
                  <img
                    src="/images/help_step5.png"
                    srcset="
                      /images/help_step5.png    1x,
                      /images/help_step5@2x.png 2x
                    "
                    style="max-width: 100%; max-height: 200px"
                  />
                </p>
                <div class="q-mt-md text-center beausiteLight text-body1">
                  {{
                    cardEditorStore.getIsMobileDevice
                      ? t("getStartedText.step5_mobile")
                      : t("getStartedText.step5")
                  }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide :name="6" class="column no-wrap flex-center">
                <p>
                  <img
                    src="/images/help_step6.png"
                    srcset="
                      /images/help_step6.png    1x,
                      /images/help_step6@2x.png 2x
                    "
                    style="max-width: 100%; max-height: 200px"
                  />
                </p>
                <div class="q-mt-md text-center beausiteLight text-body1">
                  {{
                    cardEditorStore.getIsMobileDevice
                      ? t("getStartedText.step6_mobile")
                      : t("getStartedText.step6")
                  }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide :name="7" class="column no-wrap flex-center">
                <p>
                  <img
                    src="/images/help_step7.png"
                    style="max-width: 100%; max-height: 200px"
                  />
                </p>
                <div class="q-mt-md text-center beausiteLight text-body1">
                  {{
                    cardEditorStore.getIsMobileDevice
                      ? t("getStartedText.step7_mobile")
                      : t("getStartedText.step7")
                  }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide :name="8" class="column no-wrap flex-center">
                <p>
                  <img
                    src="/images/help_step8.png"
                    style="max-width: 100%; max-height: 200px"
                  />
                </p>
                <div class="q-mt-md text-center beausiteLight text-body1">
                  {{
                    cardEditorStore.getIsMobileDevice
                      ? t("getStartedText.step8_mobile")
                      : t("getStartedText.step8")
                  }}
                </div>
              </q-carousel-slide>
            </q-carousel>
          </q-card-section>
        </q-card>
      </q-dialog>
    </template>
  </q-layout>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import TheHeader from "./TheHeader.vue";
import TheFooter from "./TheFooter.vue";
import TheContent from "./TheContent.vue";
import TheDrawer from "./TheDrawer.vue";
import { usecardEditorStore } from "src/stores/card-editor-store";
import axios from "axios";
import Cropper from "cropperjs";
import { useI18n } from "vue-i18n";
import { toDataURL } from "src/utils/helper-methods";

const { t } = useI18n();

// pinia store
const cardEditorStore = usecardEditorStore();

// router
const router = useRouter();
const route = useRoute();

// check for mobile device
let isDeviceMobile = "ontouchstart" in document.documentElement;
cardEditorStore.changeDevice(isDeviceMobile);

/* data */
let showLoader = ref(true);
let showGetStartedModal = ref(true);
let slide = ref(1);
let autoplay = ref(true);

// show get started modal for first time
if (localStorage.getItem("showGetStartedGuide")) {
  showGetStartedModal.value = false;
} else {
  showGetStartedModal.value = true;
  localStorage.setItem("showGetStartedGuide", false);
}

/* methods */
function sideNavMenuItemClickHandler(mItem) {
  mItem.name === "layouts"
    ? cardEditorStore.updateDrawerWidth(400)
    : cardEditorStore.updateDrawerWidth(350);

  if (mItem.child) {
    cardEditorStore.changePanel(mItem.name);
  }
}

function sideNavSubMenuItemClickHandler() {
  cardEditorStore.changePanel("home");
  cardEditorStore.updateDrawerWidth(265);
}

function loadSavedCardEditor(editorData) {
  const data = editorData.savedCardEditorData;

  /* set shape */
  cardEditorStore.changeShapeId(data.shape_id);

  data.product_design.forEach((tab) => {
    /* set layout id & layout DB id*/
    if (tab.name === "front") {
      cardEditorStore.changeActiveFrontLayout(tab.layout.id);
      cardEditorStore.changeActiveFrontLayoutDBId(tab.layout.db_id);
    } else {
      cardEditorStore.changeActiveBackLayout(tab.layout.id);
      cardEditorStore.changeActiveBackLayoutDBId(tab.layout.db_id);
    }

    /* set background color id */
    cardEditorStore.setActiveColorId(
      tab.name,
      tab.layout.id,
      tab.layout.bg_Color_id
    );

    /* set editable text data */
    tab.layout.editable_text_configs &&
      tab.layout.editable_text_configs.forEach((text_config) => {
        const metadata = {
          section: tab.name,
          layoutId: tab.layout.id,
          textConfigId: text_config.id,
          html: text_config.html,
          dbId: text_config.db_id,
        };
        cardEditorStore.updateTextFormattingData(metadata);
      });

    /* set images */
    tab.layout.img_configs.forEach((img_config) => {
      cardEditorStore.updateExistingImgPreferences(
        tab.name,
        img_config.id,
        true
      );
      // extract image from api category_id & img_id
      const category = cardEditorStore.getCardEditorMetaData.categories.find(
        (category) => category.id === img_config.category_id
      );

      const imgObj = category.images.find(
        (img) => img.id === img_config.image_id
      );

      // convertinng mediumImg to base64
      toDataURL(imgObj.mediumImg, function (dataUrl1) {
        // convertinng originalImg to base64
        toDataURL(imgObj.originalImg, function (dataUrl2) {
          // cropping medium Image
          const medImgEl = document.createElement("img");
          medImgEl.setAttribute("src", dataUrl1);
          medImgEl.setAttribute("hidden", true);
          const body = document.getElementsByTagName("BODY")[0];
          body.append(medImgEl);

          medImgEl.onload = function () {
            let croppedImg = null;
            let cropper = new Cropper(medImgEl, {
              autoCrop: true,
              data: img_config.img_crop_data,
              crop: (event) => {
                cardEditorStore.updateExistingImgPreferences(
                  tab.name,
                  img_config.id,
                  false
                );
                const canvas = cropper.getCroppedCanvas();
                croppedImg = canvas.toDataURL("image/jpg", 1);

                // cropping original Img
                const OrgImgEl = document.createElement("img");
                OrgImgEl.setAttribute("src", dataUrl2);
                OrgImgEl.setAttribute("hidden", true);
                body.append(OrgImgEl);

                OrgImgEl.onload = function () {
                  const cropperData = JSON.parse(
                    JSON.stringify(img_config.img_crop_data)
                  );
                  const widthRatio = OrgImgEl.width / medImgEl.width;
                  const heightRatio = OrgImgEl.height / medImgEl.height;
                  cropperData.x = cropperData.x * widthRatio;
                  cropperData.y = cropperData.y * heightRatio;
                  cropperData.width = cropperData.width * widthRatio;
                  cropperData.height = cropperData.height * heightRatio;

                  let cropper2 = new Cropper(OrgImgEl, {
                    autoCrop: true,
                    data: cropperData,
                    crop: (event) => {
                      const canvas = cropper2.getCroppedCanvas();
                      const croppedOriginalImg = canvas.toDataURL(
                        "image/jpg",
                        1
                      );

                      const metadata = {
                        imgId: img_config.image_id,
                        dbId: img_config.db_id,
                        categoryId: img_config.category_id,
                        imgContainerId: img_config.id,
                        section: tab.name,
                        img: dataUrl1,
                        croppedImg: croppedImg,
                        originalImg: dataUrl2,
                        croppedOriginalImg: croppedOriginalImg,
                        cropBoxData: img_config.crop_box_data,
                        imgCropData: img_config.img_crop_data,
                      };
                      cardEditorStore.updateCardImages(metadata);
                    },
                  });
                };
              },
            });
          };
        });
      });
    });
  });
}

function getColorWidgetHashmap() {
  const hashMap = {};
  cardEditorStore.getCardEditorMetaData.colorsWidget.forEach((item) => {
    if (!hashMap.hasOwnProperty(item.id)) {
      hashMap[item.id] = true;
    }
  });
  return hashMap;
}

function fetchEditorConfig() {
  let apiEndpoints = [
    axios.get(
      `${process.env.API_BASE_URL}/designer/config/${route.query.product_id}/${route.query.option_id}?url=${route.query.url}&token=${route.query.token}`
    ),
    axios.get(
      `${process.env.API_BASE_URL}/designer/categories?url=${route.query.url}&token=${route.query.token}`
    ),
  ];

  if (
    route.query.hasOwnProperty("cart_id") &&
    route.query.hasOwnProperty("cart_item_product_design_id") &&
    route.query.cart_item_product_design_id
  ) {
    apiEndpoints.push(
      axios.get(
        `${process.env.API_BASE_URL}/designer/config/${route.query.cart_id}/${route.query.option_id}/${route.query.cart_item_product_design_id}?url=${route.query.url}&token=${route.query.token}`
      )
    );
  }

  Promise.all(apiEndpoints).then((resp) => {
    const editorConfig = resp[0].data.data;
    const categories = resp[1].data.data;

    editorConfig["categories"] = categories;

    if (resp[2]) {
      const savedCardEditorData = resp[2].data.data;
      editorConfig["savedCardEditorData"] = savedCardEditorData;
    }

    showLoader.value = false;
    cardEditorStore.setCardEditorMetadata(editorConfig);

    const bgColorsHashMap = getColorWidgetHashmap();

    // if no previous saved data, then execute ##
    editorConfig.productDesigns.forEach((cardLayout) => {
      cardLayout.layouts.forEach((layout) => {
        let bgColorId = layout.bgColorId;

        if (!bgColorsHashMap.hasOwnProperty(bgColorId)) {
          bgColorId = cardEditorStore.getCardEditorMetaData.colorsWidget[0].id;
        }
        cardEditorStore.setActiveColorId(cardLayout.name, layout.id, bgColorId);
      });
    });

    // chech for photo_id and populate card front/back with default image
    if (
      !route.query.cart_item_product_design_id &&
      route.query.category_id &&
      route.query.photo_id
    ) {
      // fetch img from categories
      const category = categories.find(
        (item) => item.id === parseInt(route.query.category_id)
      );
      const img = category.images.find(
        (item) => item.id === parseInt(route.query.photo_id)
      );

      if (img) {
        toDataURL(img.mediumImg, function (dataUrl1) {
          const croppedMediumImg = dataUrl1;
          toDataURL(img.originalImg, function (dataUrl2) {
            const croppedOriginalImg = dataUrl2;
            const metadata = {
              imgId: img.id,
              categoryId: category.id,
              dbId: null,
              imgContainerId: 1,
              section: "front",
              img: croppedMediumImg,
              croppedImg: "",
              originalImg: dataUrl2,
              croppedOriginalImg: croppedOriginalImg,
              cropBoxData: {},
              imgCropData: {},
            };
            cardEditorStore.updateCardImages(metadata);
            metadata.section = "back";
            cardEditorStore.updateCardImages(metadata);
          });
        });
      }
    }

    if (
      editorConfig.hasOwnProperty("savedCardEditorData") &&
      Object.keys(editorConfig.savedCardEditorData).length
    ) {
      loadSavedCardEditor(editorConfig);
    }
  });
}

function loadEditorFromMixedData() {
  let apiEndpoints = [
    axios.get("editor-config/design-configs.json"),
    axios.get(
      `${process.env.API_BASE_URL}/designer/categories?url=${route.query.url}&token=${route.query.token}`
    ),
  ];

  if (
    route.query.hasOwnProperty("cart_id") &&
    route.query.hasOwnProperty("cart_item_product_design_id") &&
    route.query.cart_item_product_design_id
  ) {
    apiEndpoints.push(
      axios.get("editor-config/existing-config-real-data.json")
    );
  }

  Promise.all(apiEndpoints).then((resp) => {
    // won't work for image as src is changed within components(<img>) from using local images to user images on web
    const editorConfig = resp[0].data;

    const categories = resp[1].data.data;
    editorConfig["categories"] = categories;

    if (resp[2]) {
      const savedCardEditorData = resp[2].data;
      editorConfig["savedCardEditorData"] = savedCardEditorData;
    }

    showLoader.value = false;
    cardEditorStore.setCardEditorMetadata(editorConfig);

    const bgColorsHashMap = getColorWidgetHashmap();

    // if no previous saved data, then execute ##
    editorConfig.productDesigns.forEach((cardLayout) => {
      cardLayout.layouts.forEach((layout) => {
        let bgColorId = layout.bgColorId;

        if (!bgColorsHashMap.hasOwnProperty(bgColorId)) {
          bgColorId = cardEditorStore.getCardEditorMetaData.colorsWidget[0].id;
        }
        cardEditorStore.setActiveColorId(cardLayout.name, layout.id, bgColorId);
      });
    });

    if (
      editorConfig.hasOwnProperty("savedCardEditorData") &&
      Object.keys(editorConfig.savedCardEditorData).length
    ) {
      loadSavedCardEditor(editorConfig);
    }
  });
}

onBeforeMount(async () => {
  fetchEditorConfig();
  // loadEditorFromMixedData();
});
</script>

<style lang="scss">
// aside bar
@media (max-width: 720px) {
  .q-drawer {
    width: min(300px, 70vw) !important;
  }
}

.q-scrollarea__content {
  width: 100%;
}

body {
  overflow: hidden;
  -webkit-touch-callout: none !important;
}

.content {
  height: 100vh;
}

/* width */
::-webkit-scrollbar {
  height: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  // box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(145, 145, 145);
  border-radius: 10px;
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

.spinner {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
