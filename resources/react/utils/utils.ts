import moment from 'moment';
import axiosConfig from './../config/axiosConfig';
import { toast } from 'react-toastify';

type taskDataType = {
    title: string
    description: string
    status: string
}

export const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error)
}

export const convertUtcTimeToLocalTime = (
    datetime: string,
    format: string = 'MMMM Do YYYY, hh:mm:ss A'
): string => {
    return moment(moment.utc(datetime).toDate()).local().format(format)
}

export const getTasks = async (page: number, size: number) => {
    try {
        const response = await axiosConfig.get(`/tasks?page=${page}&size=${size}`);
        const { data } = response.data;

        return data;
    } catch (err) {
        toast.error(getErrorMessage(err));
        return [];
    }
}

export const getTask = async (taskId: number) => {
    if (!taskId) {
        toast.error("Task id is required");
        return;
    }

    try {
        const response = await axiosConfig.get(`/tasks/${taskId}`);
        const { data } = response.data;

        return data;
    } catch (err) {
        toast.error(getErrorMessage(err));
        return;
    }
}

export const createTask = async (taskData: taskDataType) => {
    try {
        const response = await axiosConfig.post(`/tasks`, taskData);
        const { data, message } = response.data;
        toast.success(message);

        return data;
    } catch (err) {
        toast.error(getErrorMessage(err));
        return;
    }
}

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

export const deleteTask = async (taskId: number) => {
    if (!taskId) {
        toast.error("Task id is required");
        return;
    }

    try {
        const response = await axiosConfig.delete(`/tasks/${taskId}`);
        const { message } = response.data;
        toast.success('Task has been successfully deleted.');

        return true;
    } catch (err) {
        toast.error(getErrorMessage(err));
        return;
    }
}
