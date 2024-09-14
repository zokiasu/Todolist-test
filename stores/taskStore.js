import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTaskStore = defineStore('taskStore', () => {
    const tasks = ref([]);

    function addTask(name, parentId = null, position = null, relativeTaskId = null) {
        const newTask = {
            id: Date.now(),
            name,
            completed: false,
            createdAt: new Date(),
            completedAt: null,
            parentId,
            subTasks: [],
        };
    
        if (relativeTaskId !== null) {
            // Insérer la tâche avant ou après une tâche existante
            const result = findTaskByIdWithParent(relativeTaskId);
            if (result) {
                const { parentList, index } = result;
                if (position === 'before') {
                    parentList.splice(index, 0, newTask);
                } else if (position === 'after') {
                    parentList.splice(index + 1, 0, newTask);
                }
            }
        } else if (parentId !== null) {
            // Ajouter en tant que sous-tâche
            const parentTask = findTaskById(parentId);
            if (parentTask) {
                parentTask.subTasks.push(newTask);
            }
        } else {
            // Ajouter en racine
            tasks.value.push(newTask);
        }
    }
    

    // Fonction pour trouver une tâche et sa liste parente
    function findTaskByIdWithParent(id, taskList = tasks.value) {
        for (let index = 0; index < taskList.length; index++) {
            const task = taskList[index];
            if (task.id === id) {
                return { task, parentList: taskList, index };
            } else if (task.subTasks.length) {
                const result = findTaskByIdWithParent(id, task.subTasks);
                if (result) return result;
            }
        }
        return null;
    }

    // Fonction pour ajouter une tâche avant une tâche existante
    function addTaskBefore(id, name) {
        addTask(name, null, 'before', id);
    }

    // Fonction pour ajouter une tâche après une tâche existante
    function addTaskAfter(id, name) {
        addTask(name, null, 'after', id);
    }

    function getRootTasks() {
        return tasks.value;
    }

    function findTaskById(id, taskList = tasks.value) {
        for (const task of taskList) {
            if (task.id === id) {
                return task;
            } else if (task.subTasks.length) {
                const found = findTaskById(id, task.subTasks);
                if (found) return found;
            }
        }
        return null;
    }

    function updateTaskName(id, newName) {
        const task = findTaskById(id);
        if (task) {
            task.name = newName;
        }
    }

    function deleteTask(id, taskList = tasks.value) {
        const index = taskList.findIndex(task => task.id === id);

        if (index !== -1) {
            taskList.splice(index, 1);
        } else {
            for (const task of taskList) {
                if (task.subTasks.length) {
                    deleteTask(id, task.subTasks);
                }
            }
        }
    }

    function updateRootTasks(newTasks) {
        tasks.value = newTasks;
    }

    function updateSubTasks(parentId, newSubTasks) {
        const parentTask = findTaskById(parentId);
        if (parentTask) {
            parentTask.subTasks = newSubTasks;
        }
    }


    return {
        tasks,
        addTask,
        addTaskBefore,
        addTaskAfter,
        updateTaskName,
        deleteTask,
        getRootTasks,
        findTaskById,
        updateRootTasks,
        updateSubTasks,
    };
});
