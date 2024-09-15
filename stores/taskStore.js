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

    // Fonction pour récupérer toute la liste
    function getRootTasks() {
        return tasks.value;
    }

    // Fonction pour retrouver les tâches via leur id
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

    // Fonction pour mettre à jour une tâche
    function updateTaskName(id, newName) {
        const task = findTaskById(id);
        if (task) {
            task.name = newName;
        }
    }

    // Fonction pour supprimer une tâche
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

    // Fonction pour remplacer toute la liste
    function updateRootTasks(newTasks) {
        tasks.value = newTasks;
    }

    // Fonction pour mettre à jour une sous-tâche
    function updateSubTasks(parentId, newSubTasks) {
        const parentTask = findTaskById(parentId);
        if (parentTask) {
            parentTask.subTasks = newSubTasks;
        }
    }

    // Fonction pour valider une tâche
    function toggleTaskCompletion(id) {
        const task = findTaskById(id);
        if (task && canToggleCompletion(id)) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date() : null;

            // Mettre à jour l'état de complétion des tâches parentes si nécessaire
            if (task.parentId !== null) {
                updateParentCompletion(task.parentId);
            }

            // Si la tâche est marquée comme non complétée, marquer toutes les sous-tâches comme non complétées
            if (!task.completed && task.subTasks.length > 0) {
                markAllSubTasksIncomplete(task);
            }
        }
    }

    // Fonction pour vérifier que toute les sous tâches soient compléter 
    function canToggleCompletion(id) {
        const task = findTaskById(id);
        if (task) {
            if (task.subTasks.length === 0) {
                return true;
            } else {
                return task.subTasks.every(subTask => subTask.completed);
            }
        }
        return false;
    }

    // Fonction pour mettre à jour l'état de complétion des tâches parentes
    function updateParentCompletion(parentId) {
        const parentTask = findTaskById(parentId);
        if (parentTask) {
            if (parentTask.subTasks.every(subTask => subTask.completed)) {
                parentTask.completed = true;
                parentTask.completedAt = new Date();
                if (parentTask.parentId !== null) {
                    updateParentCompletion(parentTask.parentId);
                }
            } else {
                parentTask.completed = false;
                parentTask.completedAt = null;
                if (parentTask.parentId !== null) {
                    updateParentCompletion(parentTask.parentId);
                }
            }
        }
    }

    // Fonction pour marquer toute les sous tâches comme incomplète
    function markAllSubTasksIncomplete(task) {
        for (const subTask of task.subTasks) {
            subTask.completed = false;
            subTask.completedAt = null;
            if (subTask.subTasks.length > 0) {
                markAllSubTasksIncomplete(subTask);
            }
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
        toggleTaskCompletion,
        toggleTaskCompletion,
        updateParentCompletion,
        canToggleCompletion,
        markAllSubTasksIncomplete
    };
});
