<template>
    <div class="flex gap-2 my-2">
        <input
            v-model="taskName"
            type="text"
            placeholder="Nouvelle tâche"
            class="rounded px-2 py-1 w-full"
        />
        <div class="flex space-x-2">
            <button @click="submitTask" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Ajouter</button>
            <button @click="cancel" v-if="showCancel" class="bg-gray-500 text-white px-4 py-2 rounded">Annuler</button>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        showCancel: {
            type: Boolean,
            default: false,
        },
    });

    const emits = defineEmits(['onAdd', 'onCancel']);

    const taskName = ref('');

    function submitTask() {
        if (taskName.value.trim() !== '') {
            emits('onAdd', taskName.value.trim());
            taskName.value = '';
        }
    }

    function cancel() {
        emits('onCancel');
    }
</script>
