<template>
    <div class="pl-2 pb-1 mb-2 cursor-pointer bg-red-100">
        <div class="flex items-center justify-between" :class="task.subTasks && task.subTasks.length && showSubTasks ? 'pb-2':''">
            <div @click="toggleSubTasks" class="w-full">
                <div v-if="isEditing" class="flex gap-1">
                    <input
                        v-model="editedName"
                        @keyup.enter="saveTaskName"
                        @blur="saveTaskName"
                        class="border-b w-full rounded appearance-none outline-none pl-1"
                    />
                    <button @click="saveTaskName" class="bg-green-500 text-white px-2 rounded text-nowrap hover:bg-green-700">
                        Mettre à jour
                    </button>
                </div>
                <p v-else>
                    {{ task.name }}
                </p>
                <div class="text-xs">
                    <span class="text-gray-500">Créée le {{ formattedCreatedAt }}</span>
                </div>
            </div>
            <div class="flex items-center gap-1">
                <button
                    v-if="task.subTasks && task.subTasks.length"
                    @click="toggleSubTasks"
                    title="Afficher les sous tâches"
                    class="text-xl focus:outline-none"
                >
                    <IconMinus v-if="showSubTasks" title="Réduire toute les sous tâches" class="w-5 h-5" />
                    <IconPlus v-else title="Afficher toute les sous tâches" class="w-5 h-5" />
                </button>

                <TaskMenu
                    v-if="!isEditing"
                    :task="task"
                    @editTask="editTaskName"
                    @addSubTask="addSubTask"
                    @addTaskBefore="addTaskBefore"
                    @addTaskAfter="addTaskAfter"
                    @deleteTask="deleteTask"
                />
            </div>
        </div>

        <div v-if="showAddTaskBefore" class="mb-5">
            <AddTask
                :showCancel="true"
                placeholder="Ajouter une tâche avant celle-ci"
                @onAdd="handleAddTaskBefore"
                @onCancel="showAddTaskBefore = false"
            />
        </div>

        <div v-if="showAddTaskAfter" class="mb-5">
            <AddTask
                :showCancel="true"
                placeholder="Ajouter une tâche après celle-ci"
                @onAdd="handleAddTaskAfter"
                @onCancel="showAddTaskAfter = false"
            />
        </div>
        <div v-if="showAddSubTask" class="mb-5">
            <AddTask 
                :showCancel="true" 
                placeholder="Ajouter une sous tâche"
                @onAdd="handleAddSubTask" 
                @onCancel="showAddSubTask = false" 
            />
        </div>
        <!-- <div v-if="task.subTasks && task.subTasks.length" class="border-l divide-y divide-red-300 border-red-400 ml-3 pl-1">
            <TaskList :tasks="task.subTasks" />
        </div> -->
        <transition name="slide-toggle">
            <div
                v-if="showSubTasks && task.subTasks && task.subTasks.length"
                class="border-l divide-y divide-red-300 border-red-400 ml-3 pl-1"
            >
                <TaskList :tasks="task.subTasks" :parentTaskId="task.id" />
            </div>
        </transition>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useTaskStore } from '@/stores/taskStore';

    const props = defineProps({
        task: {
            type: Object,
            required: true,
        },
    });

    const taskStore = useTaskStore();
    const isEditing = ref(false);
    const editedName = ref(props.task.name);
    const showSubTasks = ref(false);
    const showAddSubTask = ref(false);
    const showAddTaskBefore = ref(false);
    const showAddTaskAfter = ref(false);

    function editTaskName() {
        isEditing.value = true;
    }

    function saveTaskName() {
        taskStore.updateTaskName(props.task.id, editedName.value);
        isEditing.value = false;
    }

    function addSubTask() {
        showAddSubTask.value = true;
    }

    function deleteTask() {
        taskStore.deleteTask(props.task.id);
    }

    function addTaskBefore() {
        showAddTaskBefore.value = true;
    }

    function addTaskAfter() {
        showAddTaskAfter.value = true;
    }
    // Gestion d'ajout de tâche avant
    function handleAddTaskBefore(name) {
        taskStore.addTaskBefore(props.task.id, name);
        showAddTaskBefore.value = false;
    }
    // Gestion d'ajout de tâche après
    function handleAddTaskAfter(name) {
        taskStore.addTaskAfter(props.task.id, name);
        showAddTaskAfter.value = false;
    }
    // Gestion d'ajout de sous tâche
    function handleAddSubTask(name) {
        taskStore.addTask(name, props.task.id);
        showAddTaskAfter.value = false;
    }
    // Fonction pour afficher/masquer les sous-tâches
    function toggleSubTasks() {
        showSubTasks.value = !showSubTasks.value;
    }

    const formattedCreatedAt = computed(() => {
        return new Date(props.task.createdAt).toLocaleString();
    });
</script>
