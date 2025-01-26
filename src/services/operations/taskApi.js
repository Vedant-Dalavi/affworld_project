import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { taskEndPoints } from "../apis";
import { setLoading, createNewTask, updateTaskStatus, deleteTask } from "../../redux/slices/taskSlice";

const { CREATE_TASK, UPDATE_TASK, DELETE_TASK } = taskEndPoints;

export function createTask(formData, token) {
    return async (dispatch) => {
        const toaster = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", CREATE_TASK, formData, {
                Authorization: `Bearer ${token}`,
            });

            console.log("CREATE_TASK API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("CREATE_TASK Successful");
            dispatch(createNewTask(response.data.task));
        } catch (error) {
            console.log("CREATE_TASK API ERROR............", error);
            toast.error("CREATE_TASK Failed");
        }

        dispatch(setLoading(false));
        toast.dismiss(toaster);
    };
}

export function changeTaskStatus(taskId, newStatus, token) {
    return async (dispatch) => {
        const toaster = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("PATCH", UPDATE_TASK, { taskId, newStatus }, {
                Authorization: `Bearer ${token}`,
            });

            console.log("UPDATE_TASK API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("UPDATE_TASK Successful");
            dispatch(updateTaskStatus({ taskId, newStatus }));
        } catch (error) {
            console.log("UPDATE_TASK API ERROR............", error);
            toast.error("UPDATE_TASK Failed");
        }

        dispatch(setLoading(false));
        toast.dismiss(toaster);
    };
}

export function deleteTaskAPI(taskId, token) {
    return async (dispatch) => {
        const toaster = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("DELETE", DELETE_TASK, { taskId }, {
                Authorization: `Bearer ${token}`,
            });

            console.log("DELETE_TASK API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("DELETE_TASK Successful");
            dispatch(deleteTask(taskId));
        } catch (error) {
            console.log("DELETE_TASK API ERROR............", error);
            toast.error("DELETE_TASK Failed");
        }

        dispatch(setLoading(false));
        toast.dismiss(toaster);
    };
}
