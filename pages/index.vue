<template>
    <div class="container max-w-4xl p-5 mx-auto space-y-4">
        <p class="py-20 text-5xl font-bold text-center text-blue-500 2xl:text-8xl">
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