<template>
    <draggable
        :list="tasks"
        :group="{ name: 'tasks', pull: true, put: true }"
        item-key="id"
        :animation="200"
        @end="onDragEnd"
    >
        <template #item="{ element }">
            <TaskItem :task="element" />
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
});

const taskStore = useTaskStore();

function onDragEnd() {
    console.log("props.parentTaskId");
    if (props.parentTaskId === null) {
        // Mettre à jour les tâches racines dans le store
        taskStore.updateRootTasks(props.tasks);
    } else {
        // Mettre à jour les sous tâches dans le store
        taskStore.updateSubTasks(props.parentTaskId, props.tasks);
    }
}
</script>
