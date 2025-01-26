import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
    createTask,
    changeTaskStatus,
    deleteTaskAPI,
} from "../services/operations/taskApi"; // Update import path if needed

const Task = () => {
    const { token } = useSelector((state) => state.auth);
    const { tasks, loading } = useSelector((state) => state.tasks);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setError("Task name is required");
            return;
        }
        dispatch(createTask(formData, token));
        setFormData({
            name: "",
            description: "",
        });
    };

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return; // If dropped outside a droppable area, do nothing
        if (source.droppableId === destination.droppableId && source.index === destination.index) return; // If dropped in the same position, do nothing

        // Dispatch action to update the task status in the backend
        dispatch(changeTaskStatus(draggableId, destination.droppableId, token));

        // Dispatch action to update the task order in the local state
        // dispatch(updateTaskOrder({
        //     source: {
        //         droppableId: source.droppableId,
        //         index: source.index,
        //     },
        //     destination: {
        //         droppableId: destination.droppableId,
        //         index: destination.index,
        //     },
        //     taskId: draggableId,
        // }));
    };

    const handleStatusChange = (taskId, newStatus) => {
        dispatch(changeTaskStatus(taskId, newStatus, token));
    };

    const handleDelete = (taskId) => {
        dispatch(deleteTaskAPI(taskId, token));
    };

    return (
        <div className="min-h-screen bg-richblack-900 overflow-hidden">
            <div className="max-w-maxContent mx-auto px-4 py-16">
                <div className="max-w-[600px] mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="font-inter text-3xl font-bold text-richblack-5 mb-2">Create New Task</h1>
                        <p className="font-inter text-richblack-100">Add a new task to your workflow</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-pink-25 border border-pink-200 text-pink-900 px-4 py-3 rounded-lg">
                                <p className="font-inter text-sm">{error}</p>
                            </div>
                        )}

                        {/* Task Name */}
                        <div>
                            <label htmlFor="name" className="block font-inter text-sm font-medium text-richblack-5 mb-2">
                                Task Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-richblack-800 border border-richblack-700 rounded-lg
                            text-richblack-5 placeholder-richblack-400 font-inter
                            focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent
                            transition duration-200"
                                placeholder="Enter task name"
                            />
                        </div>

                        {/* Task Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block font-inter text-sm font-medium text-richblack-5 mb-2"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-richblack-800 border border-richblack-700 rounded-lg
                            text-richblack-5 placeholder-richblack-400 font-inter
                            focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent
                            transition duration-200 resize-none"
                                placeholder="Enter task description"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate("/dashboard")}
                                className="flex-1 px-6 py-3 rounded-lg font-inter font-medium
                            bg-richblack-800 text-richblack-5 border border-richblack-700
                            hover:bg-richblack-700 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-3 rounded-lg font-inter font-medium
                            bg-blue-200 text-richblack-900
                            hover:bg-blue-100 transition duration-200
                            disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? "Creating..." : "Create Task"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Drag-and-Drop Section */}
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid lg:grid-cols-3 gap-4 mt-8">
                    {["pending", "completed", "done"].map((status) => (
                        <Droppable droppableId={status} key={status}>
                            {(provided) => (
                                <div
                                    className="bg-richblack-800 p-4 rounded-lg"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <h2 className="text-xl font-bold text-richblack-5 capitalize mb-4">{status}</h2>
                                    <div>
                                        {tasks[status]?.map((task, index) => (
                                            <Draggable draggableId={task._id} index={index} key={task._id}>
                                                {(provided) => (
                                                    <div
                                                        className="bg-richblack-700 p-3 space-x-3 rounded-lg mb-2 flex justify-between items-center"
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                    >
                                                        <div>
                                                            <p className="text-richblack-5 font-bold">{task.name}</p>
                                                            <p className="text-richblack-400">{task.description}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <select
                                                                className="px-1 py-1 bg-richblack-600 text-richblack-5 rounded"
                                                                value={status}
                                                                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                                            >
                                                                <option value="pending">Pending</option>
                                                                <option value="completed">Completed</option>
                                                                <option value="done">Done</option>
                                                            </select>
                                                            <button
                                                                className="px-2 py-1 bg-pink-500 text-white rounded"
                                                                onClick={() => handleDelete(task._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default Task; 