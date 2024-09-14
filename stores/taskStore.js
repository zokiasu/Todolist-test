import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([]);

  function addTask(name, parentId = null) {
    const newTask = {
      id: Date.now(),
      name,
      completed: false,
      createdAt: new Date(),
      completedAt: null,
      parentId,
      subTasks: [],
    };
    if (parentId) {
      const parentTask = findTaskById(parentId);
      if (parentTask) {
        parentTask.subTasks.push(newTask);
      }
    } else {
      tasks.value.push(newTask);
    }
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

  return {
    tasks,
    addTask,
    updateTaskName,
    deleteTask,
    getRootTasks,
    findTaskById,
  };
});
