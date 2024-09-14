<template>
    <div class="container mx-auto">
        <div class="text-blue-500">
            Hello, Tailwind!
        </div>
        <AddTask :parentId="null" />
        <div v-for="task in allTasks" :key="task.id" class="flex items-center gap-3">
            <input
                v-model="task.name"
                type="text"
                placeholder="Nouvelle tâche"
                class="border rounded px-2 py-1"
            />
            <button @click="updateTask(task.id, task.name)" class="px-2 py-1 bg-yellow-500 text-white">Update</button>
            <button @click="deleteTask(task.id)" class="px-2 py-1 bg-red-500 text-white">Delete</button>
        </div>
        <pre>
            {{ rootTasks }}
        </pre>
    </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();
const rootTasks = computed(() => taskStore.getRootTasks());
const allTasks = taskStore.getRootTasks();


function updateTask(id, newName) {
    taskStore.updateTaskName(id, newName);
}

function deleteTask(id) {
    taskStore.deleteTask(id)
}

</script>