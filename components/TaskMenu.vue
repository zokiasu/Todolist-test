<template>
    <div class="relative flex items-center text-gray-500" ref="menuContainer">
        <button @click="toggleMenu" title="Ouvrir menu">
            <IconVerticalDotMenu class="w-5 h-5 text-white" />
        </button>
        <div
            v-if="isMenuOpen"
            class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10"
        >
            <ul>
                <li>
                    <button
                        @click="editTask"
                        class="block w-full text-left px-4 py-2 hover:bg-zinc-100"
                    >
                        Modifier
                    </button>
                </li>
                <li>
                    <button
                        @click="addSubTask"
                        class="block w-full text-left px-4 py-2 hover:bg-zinc-100"
                    >
                        Ajouter une sous-tâche
                    </button>
                </li>
                <li>
                    <button
                        @click="addTaskBefore"
                        class="block w-full text-left px-4 py-2 hover:bg-zinc-100"
                    >
                        Ajouter une tâche avant
                    </button>
                </li>
                <li>
                    <button
                        @click="addTaskAfter"
                        class="block w-full text-left px-4 py-2 hover:bg-zinc-100"
                    >
                        Ajouter une tâche après
                    </button>
                </li>
                <li>
                    <button
                        @click="deleteTask"
                        class="block w-full text-left px-4 py-2 text-red-500 hover:bg-zinc-100"
                    >
                        Supprimer
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
    task: {
        type: Object,
        required: true,
    },
});

const emits = defineEmits([
    "editTask",
    "addSubTask",
    "deleteTask",
    "addTaskBefore",
    "addTaskAfter",
]);

const isMenuOpen = ref(false);
const menuContainer = ref(null);

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
}

function handleClickOutside(event) {
    if (menuContainer.value && !menuContainer.value.contains(event.target)) {
        isMenuOpen.value = false;
    }
}

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

function editTask() {
    emits("editTask");
    isMenuOpen.value = false;
}

function addSubTask() {
    emits("addSubTask");
    isMenuOpen.value = false;
}

function deleteTask() {
    emits("deleteTask");
    isMenuOpen.value = false;
}

function addTaskBefore() {
    emits("addTaskBefore");
    isMenuOpen.value = false;
}

function addTaskAfter() {
    emits("addTaskAfter");
    isMenuOpen.value = false;
}
</script>
