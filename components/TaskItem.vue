<template>
    <div class="mb-2 bg-gray-800 pb-1 pr-2 text-white rounded" :class="{'pr-0 bg-blue-900' : isSubTask, 'opacity-50' : task.completed}">
        <div 
			class="flex items-center justify-between py-2 pl-3" 
			:class="{ 'pb-0 pr-0' : isSubTask }"
		>
			<div @click="toggleSubTasks" class="w-full space-y-1" :class="{ 'cursor-pointer': task.subTasks && task.subTasks.length }">
				<div class="flex items-center gap-2 w-full">
					<input
						type="checkbox"
						:checked="task.completed"
						@change="toggleTaskCompletion"
						:disabled="!canToggleCompletion"
						class="cursor-pointer"
					/>
					<div v-if="isEditing" class="flex gap-1 w-full">
						<input
							v-model="editedName"
							@keyup.enter="saveTaskName"
							class="rounded px-3 py-1 w-full bg-gray-300 text-gray-950 outline-none placeholder:text-gray-500 focus:bg-gray-100"
						/>
						<button @click="saveTaskName" class="bg-blue-950 px-4 py-3 rounded flex items-center justify-center hover:opacity-80">
							<IconCheck class="w-5 h-5" />
						</button>
					</div>
					<p v-else>
						{{ task.name }}
					</p>
				</div>
				<div class="text-xs text-blue-300">
					<span>Créée le {{ formattedCreatedAt }}</span>
					<span v-if="task.completedAt"> • Complétée le {{ formattedCompletedAt }}</span>
				</div>
			</div>
            <div class="flex items-center gap-1">
                <button
                    v-if="task.subTasks && task.subTasks.length"
                    @click="toggleSubTasks"
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

        <div v-if="showAddTaskBefore" class="mb-5 ml-6" :class="{'mb-0' : (isSubTask || task.subTasks.length < 1)}">
            <AddTask
                :showCancel="true"
                placeholder="Ajouter une tâche avant celle-ci"
                @onAdd="handleAddTaskBefore"
                @onCancel="showAddTaskBefore = false"
            />
        </div>

        <div v-if="showAddTaskAfter" class="mb-5 ml-6" :class="{'mb-0' : (isSubTask || task.subTasks.length < 1)}">
            <AddTask
                :showCancel="true"
                placeholder="Ajouter une tâche après celle-ci"
                @onAdd="handleAddTaskAfter"
                @onCancel="showAddTaskAfter = false"
            />
        </div>

        <div v-if="showAddSubTask" class="mb-5 ml-6" :class="{'mb-0' : (isSubTask || task.subTasks.length < 1)}">
            <AddTask 
                :showCancel="true" 
                placeholder="Ajouter une sous tâche"
                @onAdd="handleAddSubTask" 
                @onCancel="showAddSubTask = false" 
            />
        </div>
		
        <transition name="slide-toggle">
            <div
                v-if="showSubTasks && task.subTasks && task.subTasks.length"
                class="border-l border-blue-300 ml-6 pl-2"
				:class="{ 'mt-2' : isSubTask }"
            >
                <TaskList :tasks="task.subTasks" :parentTaskId="task.id" :isSubTask="true" />
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
		isSubTask: {
			type: Boolean,
			default: false
		}
    });

    const taskStore = useTaskStore();
    const isEditing = ref(false);
    const editedName = ref(props.task.name);
    const showSubTasks = ref(true);
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
		nextTick(() => {
			showSubTasks.value = true;
		});
    }
    // Fonction pour afficher/masquer les sous-tâches
    function toggleSubTasks() {
        showSubTasks.value = !showSubTasks.value;
    }

	function toggleTaskCompletion() {
		taskStore.toggleTaskCompletion(props.task.id);
	}

    const formattedCreatedAt = computed(() => {
        return new Date(props.task.createdAt).toLocaleString();
    });

	const formattedCompletedAt = computed(() => {
		return props.task.completedAt ? new Date(props.task.completedAt).toLocaleString() : null;
	});

	const canToggleCompletion = computed(() => {
		return taskStore.canToggleCompletion(props.task.id);
	});
</script>
