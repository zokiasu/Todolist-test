<template>
  <div class="border rounded p-2 mb-2">
    <div class="flex items-center justify-between">
      <div>
        <input
          v-if="isEditing"
          v-model="editedName"
          @keyup.enter="saveTaskName"
          @blur="saveTaskName"
          class="border-b"
        />
        <p v-else @dblclick="editTaskName" :class="{ 'line-through': task.completed }">
          {{ task.name }}
        </p>
        <div class="text-xs">
            <span class="text-gray-500">Créée le {{ formattedCreatedAt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTaskStore } from '@/stores/taskStore';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const taskStore = useTaskStore();
const isEditing = ref(false);
const editedName = ref(props.task.name);

function editTaskName() {
  isEditing.value = true;
}

function saveTaskName() {
  taskStore.updateTaskName(props.task.id, editedName.value);
  isEditing.value = false;
}

const formattedCreatedAt = computed(() => {
  return new Date(props.task.createdAt).toLocaleString();
});
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
