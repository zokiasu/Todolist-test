<template>
    <div class="container mx-auto max-w-4xl">
        <p class="text-center py-20 text-2xl font-semibold text-blue-500">
            To do List
        </p>
        <AddTask @onAdd="handleAddTask" />
        <TaskList :tasks="rootTasks" />
    </div>
</template>

<script setup>
    import { useTaskStore } from '@/stores/taskStore';

    const taskStore = useTaskStore();
    const rootTasks = computed(() => taskStore.getRootTasks());

    // Gestion d'ajout d'une tâche
    function handleAddTask(name) {
        taskStore.addTask(name);
    }

</script>