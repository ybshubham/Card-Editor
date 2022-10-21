import { defineStore } from "pinia";

export const usecardEditorStore = defineStore("cardEditor", {
  state: () => ({
    // config data from api
    cardEditorMetaData: null,

    isMobileDevice: false,
    isDrawerOpen: false,
    drawerWidth: 265,
    activePanel: "home",
    activeTab: "front",
    activeShapeId: 1,

    activeColorId: {},

    // card
    activeFrontLayoutId: 1,
    activeBackLayoutId: 1,
    activeFrontLayoutDBId: 1,
    activeBackLayoutDBId: 1,

    selectedImages: {
      front: {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
      },
      back: {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
      },
    },
    textFormattingData: {
      front: {},
      back: {},
    },
    draggedImgData: {
      imgId: null,
      categoryId: null,
    },

    existingImgPreferences: {
      front: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
      },
      back: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
      },
    },
  }),
  getters: {
    getIsMobileDevice: (state) => state.isMobileDevice,
    getIsDrawerOpen: (state) => state.isDrawerOpen,
    getDrawerWidth: (state) => state.drawerWidth,
    getActivePanel: (state) => state.activePanel,
    getActiveShapeId: (state) => state.activeShapeId,
    getActiveTab: (state) => state.activeTab,
    getActiveFrontLayoutId: (state) => state.activeFrontLayoutId,
    getActiveBackLayoutId: (state) => state.activeBackLayoutId,
    getActiveFrontLayoutDBId: (state) => state.activeFrontLayoutDBId,
    getActiveBackLayoutDBId: (state) => state.activeBackLayoutDBId,
    getSelectedImages: (state) => state.selectedImages,
    getTextFormattingData: (state) => state.textFormattingData,
    getDraggedImgData: (state) => state.draggedImgData,
    getCardEditorMetaData: (state) => state.cardEditorMetaData,
    getActiveColorId: (state) => {
      return (tab, layoutId) => state.activeColorId[tab][layoutId].colorId;
    },
    getActiveBgColor: (state) => {
      return (tab, layoutId) => {
        const colorId = state.activeColorId[tab][layoutId].colorId;
        const color = state.getCardEditorMetaData.colorsWidget.find(
          (item) => item.id === colorId
        );
        return color.code.hex;
      };
    },
    getExistingImgPrefrence(state) {
      return (section, imgConfigId) =>
        state.existingImgPreferences[section][imgConfigId];
    },
  },
  actions: {
    setCardEditorMetadata(data) {
      this.cardEditorMetaData = data;
    },
    changeDevice(val) {
      this.isMobileDevice = val;
    },
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
    updateDrawerWidth(width) {
      this.drawerWidth = width;
    },
    changePanel(panel) {
      this.activePanel = panel;
    },
    changeTab(tab) {
      this.activeTab = tab;
    },
    changeShapeId(shapeId) {
      this.activeShapeId = shapeId;
    },
    changeActiveFrontLayout(id) {
      this.activeFrontLayoutId = id;
    },
    changeActiveBackLayout(id) {
      this.activeBackLayoutId = id;
    },
    changeActiveFrontLayoutDBId(id) {
      this.activeFrontLayoutDBId = id;
    },
    changeActiveBackLayoutDBId(id) {
      this.activeBackLayoutDBId = id;
    },
    setActiveColorId(tab, layoutId, colorId) {
      if (this.activeColorId.hasOwnProperty(tab)) {
        if (this.activeColorId[tab].hasOwnProperty(layoutId)) {
          this.activeColorId[tab][layoutId].colorId = colorId;
        } else {
          this.activeColorId[tab][layoutId] = {
            colorId: colorId,
          };
        }
      } else {
        this.activeColorId[tab] = {
          [layoutId]: {
            colorId: colorId,
          },
        };
      }
    },
    updateCardImages(data) {
      /* Check if key exists, if not add one */
      if (!this.selectedImages.hasOwnProperty(data.section)) {
        this.selectedImages[data.section] = {};
      }
      if (
        !this.selectedImages[data.section].hasOwnProperty(data.imgContainerId)
      ) {
        this.selectedImages[data.section][data.imgContainerId] = {};
      }

      /* add image id */
      if (data.hasOwnProperty("imgId")) {
        this.selectedImages[data.section][data.imgContainerId].imgId =
          data.imgId;
      }

      /* add database id */
      if (data.hasOwnProperty("dbId")) {
        this.selectedImages[data.section][data.imgContainerId].dbId = data.dbId;
      }

      /* add category id */
      if (data.hasOwnProperty("categoryId")) {
        this.selectedImages[data.section][data.imgContainerId].categoryId =
          data.categoryId;
      }

      /* add image */
      if (data.hasOwnProperty("img")) {
        this.selectedImages[data.section][data.imgContainerId].img = data.img;
      }

      /* add cropped image */
      if (data.hasOwnProperty("croppedImg")) {
        this.selectedImages[data.section][data.imgContainerId].croppedImg =
          data.croppedImg;
      }

      // originalImg
      if (data.hasOwnProperty("originalImg")) {
        this.selectedImages[data.section][data.imgContainerId].originalImg =
          data.originalImg;
      }

      // croppedOriginalImg
      if (data.hasOwnProperty("croppedOriginalImg")) {
        this.selectedImages[data.section][
          data.imgContainerId
        ].croppedOriginalImg = data.croppedOriginalImg;
      }

      /* add crop box data */
      if (data.hasOwnProperty("cropBoxData")) {
        this.selectedImages[data.section][data.imgContainerId].cropBoxData =
          data.cropBoxData;
      }

      /* add img crop data */
      if (data.hasOwnProperty("imgCropData")) {
        this.selectedImages[data.section][data.imgContainerId].imgCropData =
          data.imgCropData;
      }
    },
    updateTextFormattingData(data) {
      if (this.textFormattingData[data.section].hasOwnProperty(data.layoutId)) {
        this.textFormattingData[data.section][data.layoutId][
          data.textConfigId
        ] = {
          html: data.html,
          dbId: data.dbId,
        };
      } else {
        this.textFormattingData[data.section][data.layoutId] = {
          [data.textConfigId]: {
            html: data.html,
            dbId: data.dbId,
          },
        };
      }
    },
    setDraggedImgData(data) {
      this.draggedImgData.imgId = data.imgId;
      this.draggedImgData.categoryId = data.categoryId;
    },
    updateExistingImgPreferences(section, imgConfigId, value) {
      /* add image id */
      this.existingImgPreferences[section][imgConfigId] = value;
    },
  },
});
