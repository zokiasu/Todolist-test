<template>
    <button
        @click="downloadTasks"
        class="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-700"
    >
        Exporter des tâches
    </button>
</template>

<script setup>
    import { useTaskStore } from "@/stores/taskStore";

    const taskStore = useTaskStore();

    function downloadTasks() {
        const dataStr = JSON.stringify(taskStore.tasks, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "tasks.json";
        link.click();

        URL.revokeObjectURL(url);
    }
</script>
