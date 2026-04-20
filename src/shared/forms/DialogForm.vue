<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useDynamicComponent } from "../dynamicComponent/composables/useDynamicComponent";
import NameFormDialog from "./DialogForm.vue";

const props = defineProps<{
  onClose: (value: { firstName: string; lastName: string }) => void;
}>();

const firstName = ref("");
const lastName = ref("");

const submit = () => {
  props.onClose({
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
  });
};

const cancel = () => {
  props.onClose({ firstName: "", lastName: "" });
};

const openNestedDynamic = async () => {
  const { result } = useDynamicComponent.open<{
    firstName: string;
    lastName: string;
  }>(NameFormDialog, {
    onClose: (result: { firstName: string; lastName: string }) => {
      console.log("Nested result:", result);
    },
  });
  await result;
};

onMounted(() => {
  console.warn("NameFormDialog mounted");
});

onUnmounted(() => {
  console.warn("NameFormDialog Unmounted");
});
</script>

<template>
  <div class="name-form-overlay" @click.self="cancel">
    <div class="name-form-card">
      <h2>Введите имя и фамилию</h2>

      <form @submit.prevent="submit">
        <label>
          Имя
          <input v-model="firstName" type="text" placeholder="Иван" required />
        </label>

        <label>
          Фамилия
          <input v-model="lastName" type="text" placeholder="Иванов" required />
        </label>

        <div class="actions">
          <button type="button" class="nested" @click="openNestedDynamic">
            Открыть вложенный
          </button>
          <button type="submit">Сохранить</button>
          <button type="button" class="secondary" @click="cancel">
            Отмена
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.name-form-overlay {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(15, 23, 42, 0.55);
  padding: 1rem;
  z-index: 1000;
}

.name-form-card {
  width: min(100%, 420px);
  background: #ffffff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
}

.name-form-card h2 {
  margin: 0 0 1rem;
  font-size: 1.25rem;
}

.name-form-card label {
  display: block;
  margin-bottom: 0.9rem;
  font-size: 0.95rem;
  color: #111827;
}

.name-form-card input {
  width: 100%;
  margin-top: 0.35rem;
  padding: 0.75rem 0.85rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  font-size: 1rem;
}

.actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;
  justify-content: flex-end;
}

.actions button {
  padding: 0.85rem 1.25rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
}

.actions button.secondary {
  background: #f3f4f6;
  color: #111827;
}

.actions button.nested {
  background: #10b981;
  color: #ffffff;
}

.actions button:not(.secondary):not(.nested) {
  background: #2563eb;
  color: #ffffff;
}
</style>
