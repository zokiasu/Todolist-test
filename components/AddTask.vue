<template>
    <div class="flex gap-2 my-2">
        <input
            v-model="taskName"
            type="text"
            placeholder="Nouvelle tâche"
            class="border rounded px-2 py-1 w-full"
        />
        <div class="flex space-x-2">
            <button @click="addTask" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Ajouter</button>
        </div>
    </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore';

const props = defineProps({
    parentId: {
        type: Number,
        default: null,
    },
});

const taskName = ref('');
const taskStore = useTaskStore();

function addTask() {
    if (taskName.value.trim() !== '') {
        taskStore.addTask(taskName.value, props.parentId);
        taskName.value = '';
    }
}
</script>
