<template>
    <div class="flex gap-2 my-2">
        <input
            v-model="taskName"
            type="text"
            :placeholder="placeholder"
            @keyup.enter="submitTask"
            @blur="submitTask"
            class="rounded px-3 py-1 w-full bg-gray-300 text-gray-950 outline-none placeholder:text-gray-500 focus:bg-gray-100"
        />
        <div class="flex space-x-2 text-gray-300">
            <button @click="submitTask" class="bg-blue-950 px-4 py-3 rounded flex items-center justify-center hover:opacity-80">
				<IconSend class="w-5 h-5" />
			</button>
            <button @click="cancel" v-if="showCancel" class="bg-red-900 px-4 py-2 rounded flex items-center justify-center hover:opacity-80">
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
