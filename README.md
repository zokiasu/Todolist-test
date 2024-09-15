# To-do List

## Stack

- **Vue.js 3**
- **Nuxt.js 3**
- **Pinia**
- **TailwindCSS**

## Features

- **Create Tasks from an Empty List**: Users can start adding tasks even when the list is empty.
- **Mark Tasks as Completed or Not**: Users can indicate whether a task is completed.
- **View Creation and Completion Dates**: Users can see when a task was created and when it was completed.
- **Edit Task Names**: Users can change the name of a task.
- **Delete Tasks**: Users can remove tasks from the list.
- **Reorder Tasks**: Users can reorder tasks to organize them according to their preferences.
- **Access Actions via a Menu**: Users have access to applicable actions on a task through a contextual menu.
- **Add Tasks Before or After Existing Tasks**: Users can insert new tasks before or after existing ones.
- **Add Sub-tasks with Unlimited Depth**: Users can add one or more sub-tasks to a task, which can also have their own sub-tasks, and so on, with no limit to depth.
- **Manipulate Sub-tasks Like Base Tasks**: Users can manipulate sub-tasks in the same way as base tasks, including editing, deleting, and reordering.
- **Parent Task Completion Logic**:
  - Users cannot complete a parent task if all its sub-tasks are not completed.
  - If all sub-tasks of a task are completed, the parent task is automatically indicated as complete.
- **Import Tasks from JSON File**: Users can upload a list of tasks from a JSON file.
- **Export Tasks to JSON File**: Users can download their current list of tasks as a JSON file.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```