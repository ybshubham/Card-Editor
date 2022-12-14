<template>
  <div
    class="card-container"
    style="position: relative; z-index: 2998"
    @contextmenu.prevent
  >
    <!-- Non-editable text config -->
    <div
      v-for="textConfig in layout.textConfigs"
      :style="textConfig.style"
      :key="textConfig.id"
      class="no-select"
      style="
        line-height: 5px;
        width: max-content;
        display: inline-block;
        position: absolute;
      "
    >
      {{ textConfig.text }}
    </div>

    <!-- Graphic config -->
    <div
      v-for="graphicConfig in layout.graphicConfigs"
      :key="graphicConfig.id"
      :style="graphicConfig.style"
      style="position: absolute"
      class="no-select"
    >
      <img
        :id="identity + '-' + activeTab + '-graphic-' + graphicConfig.id"
        draggable="false"
        :src="getGraphicSrc + graphicConfig.url"
        style="max-width: 100%; max-height: 100%"
      />
    </div>

    <!-- Editable-text config -->
    <QuillEditor
      :id="identity + '-' + activeTab + '-quill-' + textConfig.id"
      style="position: absolute"
      theme="bubble"
      v-for="textConfig in layout.editableTextConfigs"
      ref="editorRefs"
      :key="identity + '-' + activeTab + '-quill-' + textConfig.id"
      :toolbar="toolbarOptions"
      :style="[textConfig.style]"
      @ready="editorReadyHandler(textConfig)"
      @focus="editorFocusHandler(textConfig)"
      @blur="editorBlurHandler(textConfig)"
      @text-change="editorTextChangeHandler(textConfig)"
    />

    <!-- Image container config -->
    <div
      v-for="imgConfig in layout.imgConfigs"
      :id="identity + '-' + activeTab + '-imgContainer-' + imgConfig.id"
      :key="identity + '-' + activeTab + '-imgContainer-' + imgConfig.id"
      :style="[
        imgConfig.style,
        {
          'background-color': imgContainerStyles[imgConfig.id].bgColor,
          border: imgContainerStyles[imgConfig.id].border,
          cursor:
            cardEditorStore.getSelectedImages[activeTab][imgConfig.id]
              .croppedImg ||
            cardEditorStore.getSelectedImages[activeTab][imgConfig.id].img
              ? 'pointer'
              : 'default',
        },
      ]"
      style="
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
      "
      class="img1-container"
      @drop="
        dropHandler(imgConfig.id, imgConfig.db_id, props.activeTab, imgConfig)
      "
      @mouseenter.prevent="mouseEnterHandler(imgConfig.id)"
      @mouseleave.prevent="mouseLeaveHandler(imgConfig.id)"
      @click.stop="imgContainerClickHandler(imgConfig)"
      @dragover.prevent
      @dragenter.prevent="dragEnterHandler(imgConfig.id)"
      @dragleave.prevent="dragLeaveHandler(imgConfig.id)"
    >
      <template v-if="cardEditorStore.getIsMobileDevice">
        <!-- Mobile Device -->
        <q-spinner-oval
          color="primary"
          size="2em"
          v-if="
            isExistingImgPreferenceExist(activeTab, imgConfig.id) ||
            showImgLoader(activeTab, imgConfig.id)
          "
        />
        <template v-else>
          <img
            :id="identity + '-' + activeTab + '-img-' + imgConfig.id"
            :key="identity + '-' + activeTab + '-img-' + imgConfig.id"
            style="object-fit: cover; width: 100%; height: 100%"
            v-if="
              cardEditorStore.getSelectedImages[activeTab][imgConfig.id]
                .croppedImg ||
              cardEditorStore.getSelectedImages[activeTab][imgConfig.id].img
            "
            :src="
              identity === 'header'
                ? cardEditorStore.getSelectedImages[activeTab][imgConfig.id]
                    .croppedOriginalImg
                : cardEditorStore.getSelectedImages[activeTab][imgConfig.id]
                    .croppedImg
                ? cardEditorStore.getSelectedImages[activeTab][imgConfig.id]
                    .croppedImg
                : cardEditorStore.getSelectedImages[activeTab][imgConfig.id].img
            "
          />
          <div v-else style="text-align: center">
            <!-- <div class="material-icons over-text" style="margin-bottom: 3%">
              account_box
            </div> -->
            <div class="over-text beausiteLight">
              {{ t("imgActionLabels.uploadImgText") }}
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <!-- Desktop Device -->
        <q-spinner-oval
          color="primary"
          size="2em"
          v-if="
            isExistingImgPreferenceExist(activeTab, imgConfig.id) ||
            showImgLoader(activeTab, imgConfig.id)
          "
        />
        <template v-else>
          <img
            draggable="false"
            :id="identity + '-' + activeTab + '-img-' + imgConfig.id"
            style="object-fit: cover; width: 100%; height: 100%"
            v-if="
              cardEditorStore.getSelectedImages[activeTab][imgConfig.id]
                .croppedImg ||
              cardEditorStore.getSelectedImages[activeTab][imgConfig.id].img
            "
            :src="
              identity === 'header'
                ? cardEditorStore.getSelectedImages[activeTab][imgConfig.id]
                    .croppedOriginalImg
                : cardEditorStore.getSelectedImages[activeTab][imgConfig.id]
                    .croppedImg
                ? cardEditorStore.getSelectedImages[activeTab][imgConfig.id]
                    .croppedImg
                : cardEditorStore.getSelectedImages[activeTab][imgConfig.id].img
            "
          />
          <span
            v-else-if="
              imgContainerStyles[imgConfig.id].isOver &&
              !(
                cardEditorStore.getSelectedImages[activeTab].hasOwnProperty(
                  imgConfig.id
                ) &&
                cardEditorStore.getSelectedImages[activeTab][
                  imgConfig.id
                ].hasOwnProperty('img')
              )
            "
            class="over-text beausiteLight no-select"
          >
            {{ t("imgActionLabels.dropImgText") }}
          </span>
          <span v-else class="material-icons img-placeholder">
            crop_original
          </span>
          <div
            v-if="
              imgContainerStyles[imgConfig.id].isOver &&
              cardEditorStore.getSelectedImages[activeTab].hasOwnProperty(
                imgConfig.id
              ) &&
              cardEditorStore.getSelectedImages[activeTab][
                imgConfig.id
              ].hasOwnProperty('img')
            "
            class="over-text beausiteLight no-select"
            style="position: absolute; font-size: min(2.5vw, 14px)"
          >
            {{ t("imgActionLabels.editImgText") }}
          </div>
        </template>
      </template>
    </div>

    <q-dialog v-model="showImgEditModal" persistent>
      <q-card @contextmenu.prevent>
        <q-card-section class="row items-center">
          <div class="img-container">
            <img
              style="height: auto; width: min(50vh, 80vw)"
              @load="imgLoadHandler(currentActiveImgConfig)"
              ref="myImage"
              :src="
                cardEditorStore.getSelectedImages[activeTab][
                  currentActiveImgConfig
                ].img
              "
            />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            :label="t('btnLabels.cancel')"
            color="secondary"
            class="beausiteMedium"
            v-close-popup
            @click="
              showImgEditModal = false;
              isCropModalLoadedViaImgDrop = false;
            "
            v-if="!isCropModalLoadedViaImgDrop && !isImgBeingCropped"
          />
          <q-btn
            flat
            color="primary"
            class="beausiteMedium"
            :loading="isImgBeingCropped"
            :style="isImgBeingCropped ? 'width: 132px' : ''"
            @click="
              imgCropHandler(
                cardEditorStore.getSelectedImages[activeTab][
                  currentActiveImgConfig
                ],
                activeTab
              )
            "
          >
            {{ t("btnLabels.crop") }}
            <template v-slot:loading>
              <q-spinner-gears class="on-left" />
              {{ t("btnLabels.wait") }}
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showImgChangeModal">
      <q-card
        style="width: 100vw; max-width: 100vw"
        id="imgChangeModal"
        @contextmenu.prevent
      >
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            {{
              showImages
                ? t("imgActionLabels.selectImgText")
                : t("imgActionLabels.selectCategoryText")
            }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-btn
            v-if="showImages"
            color="black"
            icon="arrow_back"
            :label="t('btnLabels.back')"
            flat
            style="margin-bottom: 1vh; padding-left: 0"
            @click="showImages = false"
          />
        </q-card-section>
        <ModalImageCategories
          v-if="!showImages"
          @category-click="categoryClickHandler"
        />
        <ModalImages
          v-else
          :category="activeCategory"
          :img-config-id="currentActiveImgConfig"
          :img-config-db-id="currentActiveImgConfigDbId"
          @image-click="modalImageClickHandler"
          @image-convert="imageBase64ConvertHandler"
        />
      </q-card>
    </q-dialog>

    <q-dialog v-model="showImgEditChangeModal">
      <q-card style="width: 100%; max-width: 90vw">
        <q-card-section class="bg-primary text-white text-center">
          <div class="text-h5">
            <q-item-label>{{
              t("modalText.editChangeModal.title")
            }}</q-item-label>
          </div>
        </q-card-section>

        <q-list>
          <q-item
            clickable
            @click="
              showImgEditModal = true;
              showImgEditChangeModal = false;
            "
          >
            <q-item-section avatar>
              <q-icon color="primary" name="transform" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{
                t("modalText.editChangeModal.editLabel")
              }}</q-item-label>
              <q-item-label caption>{{
                t("modalText.editChangeModal.editContent")
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item
            clickable
            @click="
              showImgChangeModal = true;
              showImgEditChangeModal = false;
            "
          >
            <q-item-section avatar>
              <q-icon color="primary" name="add_photo_alternate" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{
                t("modalText.editChangeModal.changeLabel")
              }}</q-item-label>
              <q-item-label caption>{{
                t("modalText.editChangeModal.changeContent")
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
    <q-dialog
      class="bg-transparent"
      v-model="showLoaderDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card>
        <q-card-section class="flex flex-center">
          {{ t("modalText.loaderModal.content") }}
          <q-spinner-ios color="primary" class="q-ml-sm" size="2em" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { ref, nextTick, onMounted, computed } from "vue";
import { usecardEditorStore } from "src/stores/card-editor-store";
import { debouncer } from "src/utils/helper-methods";
import ModalImageCategories from "components/mobile/ModalImageCategories.vue";
import ModalImages from "components/mobile/ModalImages.vue";
import Cropper from "cropperjs";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { useI18n } from "vue-i18n";
import Quill from "quill";
import { toDataURL } from "src/utils/helper-methods";

const { t } = useI18n();

// store
const cardEditorStore = usecardEditorStore();
const isExistingImgPreferenceExist = cardEditorStore.getExistingImgPrefrence;
const fontFamilies = cardEditorStore.getCardEditorMetaData
  .textEditorFontFamilies
  ? cardEditorStore.getCardEditorMetaData.textEditorFontFamilies
  : [];

let Font = Quill.import("attributors/style/font");
Font.whitelist = fontFamilies.map((item) => item.name);
Quill.register(Font, true);

// props
const props = defineProps([
  "layout",
  "shape",
  "disableInteraction",
  "bgColor",
  "activeTab",
  "identity",
]);

// data
let imgBorder = ref("none");
let showImgChangeModal = ref(false);
let showImgEditModal = ref(false);
let showImgEditChangeModal = ref(false);
let showLoaderDialog = ref(false);

let cropper = ref({});
let isImgBeingCropped = ref(false);
let destination = ref({});
let myImage = ref(null);
let currentActiveImgConfig = ref(null);
let currentActiveImgConfigObj = ref(null);
let currentActiveImgConfigDbId = ref(null);
let isCropModalLoadedViaImgDrop = ref(false);
let fontSize = ref("1em");
let padding = ref("12px");

// mobile
let activeCategory = ref([]);
let showImages = ref(false);

// Text Editor
let editorRefs = ref([]);
let pointerEventVal = ref("auto");

let editorExpandedOptionsTop = ref("reset");
let editorExpandedOptionsBottom = ref("initial");

if (props.disableInteraction) {
  pointerEventVal.value = "none";
} else {
  pointerEventVal.value = "auto";
}

const toolbarOptions = [
  [
    {
      font: ["", ...fontFamilies.map((item) => item.name)],
    },
  ],
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  ["bold", "italic"],
  [{ align: [] }],
  [{ color: [] }], // dropdown with defaults from theme

  ["clean"], // remove formatting button
];

const imgContainerStyles = ref({
  1: {
    isOver: false,
    border: "none",
    bgColor: "#dddddd",
  },
  2: {
    isOver: false,
    border: "none",
    bgColor: "#dddddd",
  },
  3: {
    isOver: false,
    border: "none",
    bgColor: "#dddddd",
  },
  4: {
    isOver: false,
    border: "none",
    bgColor: "#dddddd",
  },
  5: {
    isOver: false,
    border: "none",
    bgColor: "#dddddd",
  },
  6: {
    isOver: false,
    border: "none",
    bgColor: "#dddddd",
  },
});

const getGraphicSrc = computed(() => {
  return process.env.DEV ? "/images/" : "images/";
});

// methods
function showImgLoader(activeTab, imgConfigId) {
  if (
    !cardEditorStore.getSelectedImages[activeTab][imgConfigId].hasOwnProperty(
      "img"
    )
  ) {
    return false;
  }

  return cardEditorStore.getSelectedImages[activeTab][imgConfigId].img
    ? false
    : true;
}

function dropHandler(imgConfigId, imgConfigDBId, activeTab, imgConfig) {
  showLoaderDialog.value = true;
  imgBorder.value = "none";

  const draggedImgData = cardEditorStore.getDraggedImgData;
  const category = cardEditorStore.getCardEditorMetaData.categories.find(
    (item) => item.id === draggedImgData.categoryId
  );
  const img =
    category && category.images.find((img) => img.id === draggedImgData.imgId);

  // reset data in store for current imgConfig & activeTab
  let metadata1 = {
    imgId: null,
    dbId: null,
    categoryId: null,
    imgContainerId: imgConfigId,
    section: activeTab,
    img: "",
    croppedImg: "",
    originalImg: "",
    croppedOriginalImg: "",
    cropBoxData: {},
    imgCropData: {},
  };
  cardEditorStore.updateCardImages(metadata1);

  // after drop : saving img medium & original image by converting into base64
  toDataURL(img.mediumImg, function (dataUrl1) {
    const croppedMediumImg = dataUrl1;
    toDataURL(img.originalImg, function (dataUrl2) {
      const croppedOriginalImg = dataUrl2;

      let metadata2 = {
        imgId: draggedImgData.imgId,
        dbId: imgConfigDBId,
        categoryId: draggedImgData.categoryId,
        imgContainerId: imgConfigId,
        section: activeTab,
        img: dataUrl1,
        croppedImg: "",
        originalImg: dataUrl2,
        croppedOriginalImg: "",
        cropBoxData: {},
        imgCropData: {},
      };
      cardEditorStore.updateCardImages(metadata2);

      isCropModalLoadedViaImgDrop.value = true;
      imgContainerClickHandler(imgConfig);
      showLoaderDialog.value = false;
      mouseLeaveHandler(imgConfig.id);
    });
  });
}

function dragEnterHandler(imgConfigId) {
  imgContainerStyles.value[imgConfigId].bgColor = "#afacac";
  imgContainerStyles.value[imgConfigId].border = "3px solid black";
  imgContainerStyles.value[imgConfigId].isOver = true;
}

function dragLeaveHandler(imgConfigId) {
  imgContainerStyles.value[imgConfigId].bgColor = "#dddddd";
  imgContainerStyles.value[imgConfigId].border = "none";
  imgContainerStyles.value[imgConfigId].isOver = false;
}

function mouseEnterHandler(imgConfigId) {
  imgContainerStyles.value[imgConfigId].isOver = true;
  imgContainerStyles.value[imgConfigId].border = "3px solid black";
}

function mouseLeaveHandler(imgConfigId) {
  imgContainerStyles.value[imgConfigId].isOver = false;
  imgContainerStyles.value[imgConfigId].border = "none";
}

// mobile
function categoryClickHandler(category) {
  activeCategory.value = category;
  showImages.value = true;

  // reset scroll to top
  const imgChangeModalEl = document.getElementById("imgChangeModal");
  imgChangeModalEl.scrollTop = 0;
}

function isImgPresentWithinConfig(imgConfigId) {
  return (
    cardEditorStore.getSelectedImages[props.activeTab].hasOwnProperty(
      imgConfigId
    ) &&
    cardEditorStore.getSelectedImages[props.activeTab][
      imgConfigId
    ].hasOwnProperty("img")
  );
}

function imgLoadHandler(imgConfigId) {
  setImgEditor(imgConfigId);
}

async function setImgEditor(imgConfigId) {
  await nextTick();

  const cropBoxData =
    cardEditorStore.getSelectedImages[props.activeTab][imgConfigId].cropBoxData;

  const containerEl = document.querySelector(
    `.q-page-class #${props.identity}-${props.activeTab}-imgContainer-${imgConfigId}`
  );

  cropper.value = new Cropper(myImage.value, {
    zoomable: false,
    scalable: false,
    minCropBoxWidth: myImage.value.width / 2,
    minCropBoxHeight: myImage.value.height / 2,
    aspectRatio: containerEl.clientWidth / containerEl.clientHeight,
    ready() {
      this.cropper.crop();
      this.cropper.setCropBoxData(cropBoxData);
    },
  });
}

async function imgContainerClickHandler(imgConfig) {
  currentActiveImgConfig.value = imgConfig.id;
  currentActiveImgConfigObj.value = imgConfig;
  currentActiveImgConfigDbId.value = imgConfig.db_id;
  if (cardEditorStore.getIsMobileDevice) {
    // Mobile device :
    showImages.value = false;
    if (isImgPresentWithinConfig(imgConfig.id)) {
      if (!isCropModalLoadedViaImgDrop.value) {
        showImgEditChangeModal.value = true;
      } else {
        showImgEditModal.value = true;
      }
    } else {
      showImgChangeModal.value = true;
    }
  } else {
    // Desktop device
    if (isImgPresentWithinConfig(imgConfig.id)) {
      showImgEditModal.value = true;
    }
  }
}

function imgCropHandler(existingImgData, activeTab) {
  isImgBeingCropped.value = true;

  let count = 1; // on crop click, the cropper's crop function gets called twice
  let imgCropFlag = true;

  isCropModalLoadedViaImgDrop.value = false;
  const canvas = cropper.value.getCroppedCanvas();
  destination.value = canvas.toDataURL("image/jpg", 1);

  const medImgEl = document.createElement("img");
  medImgEl.setAttribute("src", existingImgData.img);

  // Cropping originalImg along with mediumImg
  const OrgImgEl = document.createElement("img");
  OrgImgEl.setAttribute("src", existingImgData.originalImg);
  OrgImgEl.setAttribute("hidden", true);
  const body = document.getElementsByTagName("BODY")[0];
  body.append(OrgImgEl);

  OrgImgEl.onload = function () {
    const cropperData = JSON.parse(JSON.stringify(cropper.value.getData()));
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
        if (imgCropFlag & (count <= 2)) {
          // on window resize, crop function is being called automatically for last image container config, which was messing cropper and images
          // so added a flag to check if image is being cropped by user rather thatn window resize
          const canvas = cropper2.getCroppedCanvas();
          const croppedOriginalImg = canvas.toDataURL("image/jpg", 1);

          let metadata = {
            imgId: existingImgData.imgId,
            dbId: currentActiveImgConfigDbId.value,
            categoryId: existingImgData.categoryId,
            imgContainerId: currentActiveImgConfig.value,
            section: activeTab,
            img: existingImgData.img,
            croppedImg: destination.value,
            originalImg: existingImgData.originalImg,
            croppedOriginalImg: croppedOriginalImg,
            cropBoxData: cropper.value.getCropBoxData(),
            imgCropData: cropper.value.getData(),
          };
          cardEditorStore.updateCardImages(metadata);
          showImgEditModal.value = false;
          count++;
          if (count > 2) {
            imgCropFlag = false;
            isImgBeingCropped.value = false;
          }
        }
      },
    });
  };
  //
}

// editor
async function editorReadyHandler(textConfig) {
  if (
    !(
      cardEditorStore.getTextFormattingData[props.activeTab].hasOwnProperty(
        props.layout.id
      ) &&
      cardEditorStore.getTextFormattingData[props.activeTab][
        props.layout.id
      ].hasOwnProperty(textConfig.id)
    )
  ) {
    const metadata = {
      html: textConfig.html,
      section: props.activeTab,
      layoutId: props.layout.id,
      textConfigId: textConfig.id,
      dbId: textConfig.db_id,
    };
    cardEditorStore.updateTextFormattingData(metadata);
  }

  await nextTick();
  const quill = editorRefs.value[textConfig.id - 1];
  quill.setHTML(
    cardEditorStore.getTextFormattingData[props.activeTab][props.layout.id][
      textConfig.id
    ].html
  );
}

function editorTextChangeHandler(textConfig) {
  const editorRef = editorRefs.value[textConfig.id - 1];

  const metadata = {
    html: editorRef.getHTML(),
    section: props.activeTab,
    layoutId: props.layout.id,
    textConfigId: textConfig.id,
    dbId: textConfig.db_id,
  };
  cardEditorStore.updateTextFormattingData(metadata);
}

function editorBlurHandler(textConfig) {
  const editorRef = editorRefs.value[textConfig.id - 1];
  editorRef.editor.style.border = "none";
}

function editorFocusHandler(textConfig) {
  if (textConfig.style && textConfig.style.top.split("%")[0] > "25") {
    // check if textEditor top position is > 25%,
    // if yes, show dropdowns on top of the toolbar
    editorExpandedOptionsTop.value = "initial";
    editorExpandedOptionsBottom.value = "130%";
  } else {
    // check if textEditor top position is > 25%,
    // if no, show dropdowns below the toolbar
    editorExpandedOptionsTop.value = "reset";
    editorExpandedOptionsBottom.value = "initial%";
  }
  const editorRef = editorRefs.value[textConfig.id - 1];
  editorRef.editor.style.border = "1px solid black";
  editorRef.editor.style["z-index"] = "1000";
}

function modalImageClickHandler() {
  showLoaderDialog.value = true;
}

function imageBase64ConvertHandler() {
  // start new modal for loading purpose
  showLoaderDialog.value = false;
  showImgChangeModal.value = false;
  isCropModalLoadedViaImgDrop.value = true;
  imgContainerClickHandler(currentActiveImgConfigObj.value);
}

const getScale = () => {
  const container = document.getElementsByClassName("card-container")[0];
  const containerWidth = container.clientWidth;
  const layoutObj = cardEditorStore.getCardEditorMetaData[
    "productDesigns"
  ][0].layouts.find(
    (item) => item.id === cardEditorStore.getActiveFrontLayoutId
  );
  let [widthRatio] = layoutObj.aspectRatio.split("/").map(parseFloat);
  // the ratio is based off inches
  const pxPerInch = 72;
  const cardMaxWidth = widthRatio * pxPerInch;
  const scale = containerWidth / cardMaxWidth;
  // console.log({ containerWidth, widthRatio, cardMaxWidth, scale });
  return scale;
};

const getFontSize = (scale) => {
  const originalSize = 1; //at original size, our font size is 1em
  return scale * originalSize;
};

const getPadding = (scale) => {
  const originalSize = 12; //at original size, padding is 12
  return scale * originalSize;
};

onMounted(() => {
  fontFamilies.forEach((fontFamily) => {
    let style = document.createElement("style");
    style.innerHTML = `
    .ql-bubble .ql-picker.ql-font .ql-picker-label[data-value='${fontFamily.name}']::before,
    .ql-bubble .ql-picker.ql-font .ql-picker-item[data-value='${fontFamily.name}']::before {
      content: '${fontFamily.name}' !important;
      font-family: ${fontFamily.name} !important;
      text-transform: capitalize;
    }`;
    document.getElementsByTagName("body")[0].appendChild(style);

    setTimeout(() => {
      // getScale returning 0 sometimes when card is not loaded and
      // getScale is being called, so added a delay
      const scale = getScale();
      fontSize.value = getFontSize(scale) + "em";
      padding.value = getPadding(scale) + "px";
    });
    window.addEventListener("resize", () => {
      const scale = getScale();
      fontSize.value = getFontSize(scale) + "em";
      padding.value = getPadding(scale) + "px";
    });
  });
});
</script>

<style lang="scss">
@media (max-width: 540px) {
  .card-container {
    // --r: 2/3;
    --r: v-bind("layout.aspectRatio");
    aspect-ratio: var(--r);
    // height: min(90vw, 90vh * (var(--r)));
    width: 80vw;
    position: relative;
    background-color: v-bind("bgColor");
    filter: drop-shadow(0px 0px 3px rgb(83, 83, 83));
    border-radius: v-bind("shape.borderRadius");
    /* transform: scale(1.4); */
    // overflow: hidden;
    pointer-events: v-bind(pointerEventVal);
  }
  .card-container .ql-editor {
    font-size: v-bind(fontSize);
    padding: v-bind(padding);
  }
}
@media (min-width: 541px) {
  .card-container {
    // --r: 2/3;
    --r: v-bind("layout.aspectRatio");
    aspect-ratio: var(--r);
    // height: min(90vw, 90vh * (var(--r)));
    height: 65vh;
    position: relative;
    background-color: v-bind("bgColor");
    filter: drop-shadow(0px 0px 3px rgb(83, 83, 83));

    border-radius: v-bind("shape.borderRadius");

    // overflow: hidden;
    pointer-events: v-bind(pointerEventVal);
  }
  .card-container .ql-editor {
    font-size: v-bind(fontSize);
    padding: v-bind(padding);
  }
}

.img1-container {
  // background-color: v-bind(imgBgColor);
  // border: v-bind(imgBorder);
  &:hover {
    border: 3px solid black;
    content: "Drop";
  }
}

.img-placeholder {
  font-size: 40px;
}

.over-text {
  background-color: rgb(77, 75, 75);
  color: #fff;
  padding: 8px;
  padding: 4px 8px 4px 8px;
  border-radius: 4px;
  font-size: min(2vw, 14px);
}

.cropper {
  height: 600px;
  width: 600px;
  background: #ddd;
}

.img-container {
  // height: 100%;

  img {
    display: block;
    max-width: 100%;
  }
}

.img-preview {
  width: 200px;
  height: 200px;
  float: left;
  margin-left: 10px;
}

/** editor */
.ql-editor {
  overflow: hidden;
}

@media (max-width: 540px) {
  .ql-tooltip {
    width: 40vw;
  }
}
@media (min-width: 541px) {
  .ql-tooltip {
    width: 33vw;
  }
}

.ql-bubble .ql-picker.ql-expanded .ql-picker-options {
  // #top
  // top: initial;
  // bottom: 130% !important;

  // # bottom
  // top: reset;
  // bottom: initial;

  top: v-bind(editorExpandedOptionsTop);
  bottom: v-bind(editorExpandedOptionsBottom);
}

/* Set droplist names - -item is the currently selected font, -label is the font's appearance in the droplist*/
.ql-bubble .ql-picker.ql-font .ql-picker-label[data-value=""]::before,
.ql-bubble .ql-picker.ql-font .ql-picker-item[data-value=""]::before {
  content: "Default";
}

.ql-picker-label.ql-active,
.ql-picker.ql-expanded .ql-picker-label,
.ql-bubble .ql-picker-label {
  overflow: hidden !important;
}

.no-select {
  user-select: none;
}
</style>
