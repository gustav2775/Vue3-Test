<script setup lang="ts">
import { useDynamicComponent } from "@/shared/dynamicComponent";
import { useDynamicComponentBottomSheet } from "@/shared/dynamicBottomSheet";
import DialogForm from "@/shared/forms/DialogForm.vue";
import BottomSheetForm from "@/shared/forms/BottomSheetForm.vue";
import { ref } from "vue";

const submittedDialog = ref<{ firstName: string; lastName: string } | null>(null);
const submittedBottomSheet = ref<{ firstName: string; lastName: string } | null>(null);

const openDynamic = async () => {
  const { result, close } = useDynamicComponent.open<{
    firstName: string;
    lastName: string;
  }>(DialogForm);
  const dialogResult = await result;

  if (dialogResult?.firstName || dialogResult?.lastName) {
    submittedDialog.value = dialogResult;
  }
};

const openDynamicBottomSheet = async () => {
  const { result } = useDynamicComponentBottomSheet.open<{
    firstName: string;
    lastName: string;
  }>(BottomSheetForm);
  const dialogResult = await result;

  console.log(dialogResult);
  
  if (dialogResult?.firstName || dialogResult?.lastName) {
    submittedBottomSheet.value = dialogResult;
  }
};
</script>

<template>
  <div class="dynamic-panel">
    <button class="dynamic-button" @click="openDynamic">
      Открыть форму имени
    </button>

    <div v-if="submittedDialog" class="submitted-result">
      <strong>Введено:</strong>
      {{ submittedDialog.firstName }} {{ submittedDialog.lastName }}
    </div>

    <button class="dynamic-button" @click="openDynamicBottomSheet">
      Открыть Dynamic Bottom Sheet Form
    </button>

    <div v-if="submittedBottomSheet" class="submitted-result">
      <strong>Введено:</strong>
      {{ submittedBottomSheet.firstName }} {{ submittedBottomSheet.lastName }}
    </div>
  </div>
</template>

<style scoped>
.dynamic-button {
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  background: #42b983;
  color: #fff;
  border-radius: 0.5rem;
  cursor: pointer;
}

.dynamic-button:hover {
  background: #36956e;
}

.dynamic-panel {
  max-width: 320px;
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
  background: white;
  color: #333;
}
</style>
