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

export const showToastMessage = (type: string, message: string) => {
    switch (type) {
        case 'success':
            toast.success(message);
            break;
        case 'error':
            toast.error(message);
            break;
    }
}

export const getTasks = async (page: number, size: number) => {
    try {
        const response = await axiosConfig.get(`/tasks?page=${page}&size=${size}`);
        const { data } = response.data;

        return data;
    } catch (err) {
        showToastMessage('error', getErrorMessage(err));
        return [];
    }
}

export const getTask = async (taskId: number) => {
    if (!taskId) {
        showToastMessage('error', "Task id is required");
        return;
    }

    try {
        const response = await axiosConfig.get(`/tasks/${taskId}`);
        const { data } = response.data;

        return data;
    } catch (err) {
        showToastMessage('error', getErrorMessage(err));
        return;
    }
}

export const createTask = async (taskData: taskDataType) => {
    try {
        const response = await axiosConfig.post(`/tasks`, taskData);
        const { data, message } = response.data;
        showToastMessage('success', message);

        return data;
    } catch (err) {
        showToastMessage('error', getErrorMessage(err));
        return;
    }
}

// export const updateTask = async (taskData: taskDataType) => {
//     try {
//         const response = await axiosConfig.put(`/tasks/${task.id}`, taskData);
//         const { data, message } = response.data;
//         showToastMessage('success', message);

//         return data;
//     } catch (err) {
//         showToastMessage('error', getErrorMessage(err));
//         return;
//     }
// }

export const deleteTask = async (taskId: number) => {
    if (!taskId) {
        showToastMessage('error', "Task id is required");
        return;
    }

    try {
        const response = await axiosConfig.delete(`/tasks/${taskId}`);
        const { message } = response.data;
        showToastMessage('success', 'Task has been successfully deleted.');

        return true;
    } catch (err) {
        showToastMessage('error', getErrorMessage(err));
        return;
    }
}
