<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps<{
  onClose: (value?: { firstName: string; lastName: string }) => void;
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

onMounted(() => {
  console.warn("DynamicBottomSheetForm Mounted");
});

onUnmounted(() => {
  console.warn("DynamicBottomSheetForm Unmounted");
});
</script>

<template>
  <div class="bottom-sheet-form">
    <div class="form-header">
      <h3>Введите данные</h3>
      <button class="close-btn" @click="cancel">✕</button>
    </div>

    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="firstName">Имя</label>
        <input
          id="firstName"
          v-model="firstName"
          type="text"
          placeholder="Иван"
          required
        />
      </div>

      <div class="form-group">
        <label for="lastName">Фамилия</label>
        <input
          id="lastName"
          v-model="lastName"
          type="text"
          placeholder="Иванов"
          required
        />
      </div>

      <div class="form-actions">
        <button type="button" class="btn-secondary" @click="cancel">
          Отмена
        </button>
        <button type="submit" class="btn-primary">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.bottom-sheet-form {
  padding: 1.5rem;
  width: 100%;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.form-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: #f3f4f6;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.form-group input {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  justify-content: flex-end;
}

.btn-primary,
.btn-secondary {
  padding: 0.625rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-primary:active {
  background-color: #1d4ed8;
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}

.btn-secondary:active {
  background-color: #d1d5db;
}
</style>
