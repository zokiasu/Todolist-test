<template>
    <div class="flex gap-2 my-2">
        <input
            v-model="taskName"
            type="text"
            :placeholder="placeholder"
            @keyup.enter="submitTask"
            class="w-full px-3 py-1 bg-gray-300 rounded outline-none text-gray-950 placeholder:text-gray-500 focus:bg-gray-100"
        />
        <div class="flex space-x-2 text-gray-300">
            <button @click="submitTask" class="flex items-center justify-center px-4 py-3 rounded bg-blue-950 hover:opacity-80">
				<IconSend class="w-5 h-5" />
			</button>
            <button @click="cancel" v-if="showCancel" class="flex items-center justify-center px-4 py-2 bg-red-900 rounded hover:opacity-80">
				<IconClose class="w-5 h-5" />
			</button>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        showCancel: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: "Nouvelle tâche"
        }
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
