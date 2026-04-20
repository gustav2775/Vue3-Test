<script setup lang="ts" generic="T">
import { ref, onMounted, watch } from "vue";
import type { Component } from "vue";
import { VueBottomSheet } from "vue3-bottom-sheet";

const props = defineProps<{
  component: Component;
  componentProps?: Record<string, unknown>;
  onClose?: (value?: T) => void;
}>();

const isOpen = ref(false);
const isMounted = ref(false);

const closeSheet = (value?: T) => {
  isOpen.value = false;

  if (isMounted.value) {
    props.onClose?.(value);
    isMounted.value = false;
  }
};

// Если пользователь кликнул на overlay, isOpen станет false
watch(isOpen, (newVal) => {
  if (!newVal && isMounted.value) {
    props.onClose?.();
    isMounted.value = false;
  }
});

onMounted(() => {
  isMounted.value = true;
  isOpen.value = true;
});
</script>

<template>
  <VueBottomSheet v-model="isOpen" :swipe-down-to-close="true">
    <component
      :is="props.component"
      v-bind="{ ...props.componentProps, onClose: closeSheet }"
    />
  </VueBottomSheet>
</template>
