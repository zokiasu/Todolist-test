<template>
    <button
        @click="triggerFileUpload"
        class="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-700"
    >
        Importer des tâches
    </button>
    <input
        type="file"
        ref="fileInput"
        @change="handleFileUpload"
        class="hidden"
        accept=".json"
		title="Importer des tâches"
    />
</template>

<script setup>
    import { useTaskStore } from "@/stores/taskStore";

    const fileInput = ref(null);
    const taskStore = useTaskStore();

    function triggerFileUpload() {
        fileInput.value.click();
    }

    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                try {
                    const data = JSON.parse(e.target.result);
                    if (Array.isArray(data)) {
                        taskStore.updateRootTasks(data);
                    } else {
                        alert("Fichier JSON invalide : la racine doit être un tableau");
                    }
                } catch (error) {
                    alert("Fichier JSON invalide");
                }
            };
            reader.readAsText(file);
        }
    }
</script>
