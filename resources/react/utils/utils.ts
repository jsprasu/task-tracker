import axiosConfig from './../config/axiosConfig';
import { toast } from 'react-toastify';

export const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error)
}

export const getTasks = async (page: number, size: number) => {
    try {
        const response = await axiosConfig.get(`/tasks?page=${page}&size=${size}`);
        const { success, tasks, message } = response.data;

        if (success) {
            return tasks;
        } else {
            toast.error(message);
            return [];
        }
    } catch (err) {
        toast.error(getErrorMessage(err));
        return [];
    }
}

// export const getTask = async (taskId: number) => {
//     if (!taskId) {
//         toast.error("Task id is required");
//         return;
//     }

//     try {
//         const response = await axiosConfig.post(`/tasks?project_id=${projectId}`, {
//             title: task.title,
//             description: task.description,
//         });
//         const { success, message } = response.data;

//         toast[success ? 'success' : 'error'](message);
//     } catch (err) {
//         toast.error(getErrorMessage(err));
//     }
// }

// export const createTask = async (task, projectId) => {
//     if (!projectId) {
//         toast.error("Project is required!");
//         return;
//     }
//     if (!task.title) {
//         toast.error("Title is required!");
//         return;
//     }

//     try {
//         const response = await axiosConfig.post(`/tasks?project_id=${projectId}`, {
//             title: task.title,
//             description: task.description,
//         });
//         const { success, message } = response.data;

//         toast[success ? 'success' : 'error'](message);
//     } catch (err) {
//         toast.error(getErrorMessage(err));
//     }
// }

// export const updateTask = async (task) => {
//     if (!task.id) return;
//     if (!task.title) {
//         toast.error("Title is required!");
//         return;
//     }

//     try {
//         const response = await axiosConfig.put(`/tasks/${task.id}`, {
//             title: task.title,
//             description: task.description,
//         });
//         const { success, message } = response.data;

//         toast[success ? 'success' : 'error'](message);
//     } catch (err) {
//         toast.error(getErrorMessage(err));
//     }
// }

// export const deleteTask = async (id) => {
//     if (!id) {
//         toast.error("Invalid task!");
//         return;
//     }

//     try {
//         const response = await axiosConfig.delete(`/tasks/${id}`);
//         const { success, message } = response.data;

//         toast[success ? 'success' : 'error'](message);
//     } catch (err) {
//         toast.error(getErrorMessage(err));
//     }
// }
