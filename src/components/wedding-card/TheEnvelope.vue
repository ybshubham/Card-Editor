<template>
  <div class="envelope-container pattern">
    <q-chip
      icon="add"
      size="1rem"
      color="white"
      text-color="black"
      class="return-address-chip"
      v-model="showReturnAddressChip"
      clickable
      :removable="returnAddressChipHover"
      @mouseenter.stop="returnAddressChipHover = true"
      @mouseleave.stop="returnAddressChipHover = false"
      @click.stop="chipClickHandler('return-address')"
      @remove.stop="chipRemoveHandler('return-address')"
    >
      <template v-if="returnAddressChipHover"> Add Return Address</template>
    </q-chip>
    <q-editor
      ref="retAddEditor"
      v-if="showReturnAddressEditor"
      class="return-address-editor"
      v-model="returnAddress"
      min-height="9rem"
      max-height="9rem"
      placeholder="Enter return address"
      toolbar-color="black"
      :flat="showRetAddrContainerFlat"
      @focus.stop="editorFocusHandler('return-address')"
      @blur.stop="editorBlurHandler('return-address')"
    />
    <q-chip
      icon="add"
      size="1rem"
      color="white"
      text-color="black"
      class="addressing-chip"
      v-model="showAddressingChip"
      clickable
      :removable="addressingChipHover"
      @mouseenter.stop="addressingChipHover = true"
      @mouseleave.stop="addressingChipHover = false"
      @click.stop="chipClickHandler('addressing')"
      @remove.stop="chipRemoveHandler('addressing')"
    >
      <template v-if="addressingChipHover"> Add Addressing</template>
    </q-chip>
    <q-editor
      ref="addressingEditor"
      v-if="showAddressingEditor"
      class="addressing-editor"
      v-model="addressing"
      min-height="9rem"
      max-height="9rem"
      placeholder="Enter return address"
      toolbar-color="black"
      :flat="showAddressingContainerFlat"
      @focus="editorFocusHandler('addressing')"
      @blur="editorBlurHandler('addressing')"
    />
  </div>
</template>
<script setup>
import { computed, ref, watch } from "vue";
import { usecardEditorStore } from "src/stores/card-editor-store";
import { debouncer } from "src/utils/helper-methods";

// store
const cardEditorStore = usecardEditorStore();

// data
let showReturnAddressChip = ref(true);
let returnAddressChipHover = ref(false);
let showReturnAddressEditor = ref(false);
let returnAddressEditorToolbarDisplay = ref("none");
let showRetAddrContainerFlat = ref(false);

let showAddressingChip = ref(true);
let addressingChipHover = ref(false);
let showAddressingEditor = ref(false);
let addressingEditorToolbarDisplay = ref("none");
let showAddressingContainerFlat = ref(false);

// computed
const returnAddress = computed({
  get() {
    return cardEditorStore.getReturnAddress;
  },
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    cardEditorStore.changeReturnAddress(newValue);
  },
});

const addressing = computed({
  get() {
    return cardEditorStore.getAddressing;
  },
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    cardEditorStore.changeAddressing(newValue);
  },
});

if (cardEditorStore.getReturnAddress) {
  showReturnAddressChip.value = false;
  showReturnAddressEditor.value = true;
  showRetAddrContainerFlat.value = true;
}
if (cardEditorStore.getAddressing) {
  showAddressingChip.value = false;
  showAddressingEditor.value = true;
  showAddressingContainerFlat.value = true;
}

// methods
function chipRemoveHandler(chip) {
  if (chip === "return-address") {
    returnAddressChipHover.value = false;
  } else {
    addressingChipHover.value = false;
  }
}

function chipClickHandler(chip) {
  console.log("In chip click handler");
  if (chip === "return-address") {
    showReturnAddressEditor.value = true;
    showReturnAddressChip.value = false;
    showRetAddrContainerFlat.value = false;
  } else {
    showAddressingEditor.value = true;
    showAddressingChip.value = false;
    showAddressingContainerFlat.value = false;
  }
}

function editorFocusHandler(editor) {
  setTimeout(() => {
    if (editor === "return-address") {
      returnAddressEditorToolbarDisplay.value = "flex";
      showRetAddrContainerFlat.value = false;
    } else {
      addressingEditorToolbarDisplay.value = "flex";
      showAddressingContainerFlat.value = false;
    }
  }, 200);
}

function editorBlurHandler(editor) {
  setTimeout(() => {
    if (editor === "return-address") {
      returnAddressEditorToolbarDisplay.value = "none";
      showRetAddrContainerFlat.value = true;
      returnAddressChipHover.value = false;
      if (!returnAddress.value) {
        showReturnAddressChip.value = true;
        showReturnAddressEditor.value = false;
      }
    } else {
      addressingEditorToolbarDisplay.value = "none";
      showAddressingContainerFlat.value = true;
      addressingChipHover.value = false;
      if (!addressing.value) {
        showAddressingChip.value = true;
        showAddressingEditor.value = false;
      }
    }
  }, 200);
}
</script>

<style lang="scss">
.q-textarea .q-field__native {
  resize: none;
  background-color: transparent;
  padding: 16px;
  &:hover {
    border: 3px solid black;
  }
}

.return-address-editor {
  width: 25vw;
  position: absolute;
  left: 3%;
  top: 2%;
  background-color: transparent;

  .q-editor__toolbars-container {
    display: v-bind(returnAddressEditorToolbarDisplay);
  }

  &:hover {
    border: 1px solid black;
  }
}

.return-address-chip {
  cursor: pointer;
  position: absolute;
  left: 3%;
  top: 2%;
  background-color: transparent;
}

// addressing-editor
.addressing-editor {
  width: 25vw;
  position: absolute;
  left: 43%;
  top: 53%;
  background-color: transparent;

  .q-editor__toolbars-container {
    display: v-bind(addressingEditorToolbarDisplay);
  }

  &:hover {
    border: 1px solid black;
  }
}

.addressing-chip {
  cursor: pointer;
  position: absolute;
  left: 48%;
  top: 53%;
  background-color: transparent;
}

.envelope-container {
  --r: 5/3;
  height: min(47vw, 35vh * (var(--r)));
  aspect-ratio: var(--r);
  background-color: v-bind("cardEditorStore.getActiveBgColor");
  filter: drop-shadow(0px 0px 3px rgb(83, 83, 83));
  overflow: hidden;
  position: relative;
}

.pattern {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.25),
    rgba(255, 255, 255, 0.25) 1px,
    transparent 1px,
    transparent 6px
  );
  background-size: 4px 4px;
}

.address-container {
  position: absolute;
  top: 5%;
  left: 5%;
  width: 50%;
  height: 30%;
}
</style>