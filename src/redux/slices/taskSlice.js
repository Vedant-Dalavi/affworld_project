import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: {
        pending: localStorage.getItem("pending")
            ? JSON.parse(localStorage.getItem("pending"))
            : [],
        completed: localStorage.getItem("completed")
            ? JSON.parse(localStorage.getItem("completed"))
            : [],
        done: localStorage.getItem("done")
            ? JSON.parse(localStorage.getItem("done"))
            : [],
    },
    loading: false,
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        createNewTask: (state, action) => {
            const newTask = { id: Date.now().toString(), ...action.payload };
            state.tasks.pending.push(newTask);
            localStorage.setItem("pending", JSON.stringify(state.tasks.pending));
        },
        updateTaskOrder: (state, action) => {
            const { source, destination, taskId } = action.payload;

            // Remove task from the source column
            const sourceColumn = state.tasks[source.droppableId];
            const taskIndex = sourceColumn.findIndex((task) => task._id === taskId);
            const [movedTask] = sourceColumn.splice(taskIndex, 1);

            // Add the task to the destination column
            const destinationColumn = state.tasks[destination.droppableId];
            destinationColumn.splice(destination.index, 0, movedTask);

            // Sync the updated columns with localStorage
            localStorage.setItem(source.droppableId, JSON.stringify(sourceColumn));
            localStorage.setItem(destination.droppableId, JSON.stringify(destinationColumn));
        },
        updateTaskStatus: (state, action) => {
            const { taskId, newStatus } = action.payload;

            // Find the task in the current state and move it to the new status column
            Object.keys(state.tasks).forEach((status) => {
                const taskIndex = state.tasks[status].findIndex((task) => task._id === taskId);
                if (taskIndex !== -1) {
                    const [task] = state.tasks[status].splice(taskIndex, 1);
                    task.status = newStatus; // Update the task's status
                    state.tasks[newStatus].push(task); // Add the task to the new status column
                }
            });

            // Sync updated tasks with localStorage
            Object.keys(state.tasks).forEach((status) => {
                localStorage.setItem(status, JSON.stringify(state.tasks[status]));
            });
        },
        deleteTask: (state, action) => {
            const taskId = action.payload;
            Object.keys(state.tasks).forEach((status) => {
                state.tasks[status] = state.tasks[status].filter((task) => task._id !== taskId);
            });

            // Sync updated tasks with localStorage
            Object.keys(state.tasks).forEach((status) => {
                localStorage.setItem(status, JSON.stringify(state.tasks[status]));
            });
        },
    },
});

// Export actions
export const { setLoading, createNewTask, updateTaskOrder, updateTaskStatus, deleteTask } = taskSlice.actions;

// Export reducer
export default taskSlice.reducer;