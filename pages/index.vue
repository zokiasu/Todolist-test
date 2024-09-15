<template>
    <div class="container mx-auto max-w-4xl space-y-4">
        <p class="text-center py-20 text-2xl font-bold text-blue-500 lg:text-5xl 2xl:text-8xl">
            To-Do List
        </p>
        <AddTask @onAdd="handleAddTask" />
        <TaskList :tasks="rootTasks" />
		<div class="flex space-x-2">
			<UploadTasks />
			<DownloadTasks />
		</div>
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