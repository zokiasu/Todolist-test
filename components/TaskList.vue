<template>
    <draggable
        :list="tasks"
        :key="draggableKey"
        :group="{ name: 'tasks', pull: true, put: true }"
        item-key="id"
        :animation="200"
        @end="onDragEnd"
    >
        <template #item="{ element }">
            <TaskItem :task="element" :isSubTask="isSubTask"/>
        </template>
    </draggable>
</template>

<script setup>
import draggable from "vuedraggable";
import { useTaskStore } from "@/stores/taskStore";

const props = defineProps({
    tasks: {
        type: Array,
        required: true,
    },
    parentTaskId: {
        type: Number,
        default: null,
    },
	isSubTask: {
		type: Boolean,
		default: false
	}
});

const taskStore = useTaskStore();
const draggableKey = ref(Date.now());

function onDragEnd() {
    if (props.parentTaskId === null) {
        // Mettre à jour les tâches racines dans le store
        taskStore.updateRootTasks(props.tasks);
    } else {
        // Mettre à jour les sous tâches dans le store
        taskStore.updateSubTasks(props.parentTaskId, props.tasks);
    }
}

// Watcher pour réinitialiser la clé lorsque les tâches changent
watch(() => props.tasks, () => {
	draggableKey.value = Date.now();
}, { deep: true });
</script>
