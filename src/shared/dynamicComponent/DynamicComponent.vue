<script setup lang="ts">
import type { Component } from 'vue'

const props = defineProps<{
  component: Component
  componentProps?: Record<string, unknown>
}>()
</script>

<template>
  <component :is="component" v-bind="props.componentProps ?? {}" />
</template>
