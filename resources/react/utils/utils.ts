import moment from 'moment';
import axiosConfig from './../config/axiosConfig';
import { toast } from 'react-toastify';

export type TaskDataType = {
    title: string
    description: string
    status: string
}

/**
 * Get error message from error object.
 *
 * @param error
 * @returns string
 */
export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;

    return String(error)
}

/**
 * Convert given UTC time to local timezone with given format.
 *
 * @param datetime
 * @param format
 * @returns string
 */
export const convertUtcTimeToLocalTime = (
    datetime: string,
    format: string = 'MMMM Do YYYY, hh:mm:ss A'
): string => {
    return moment(moment.utc(datetime).toDate()).local().format(format)
}

/**
 * Show toast message for given type and message.
 *
 * @param type
 * @param message
 */
export const showToastMessage = (type: string, message: string): void => {
    switch (type) {
        case 'success':
            toast.success(message);
            break;
        case 'error':
            toast.error(message);
            break;
    }
}

/**
 * Get all tasks.
 *
 * @param page
 * @param size
 * @returns Promise
 */
export const getTasks = async (page: number, size: number): Promise<any> => {
    try {
        const response = await axiosConfig.get(`/tasks?page=${page}&size=${size}`);
        const { data } = response.data;

        return data;
    } catch (err) {
        showToastMessage('error', getErrorMessage(err));

        return [];
    }
}

/**
 * Get task details for given task id.
 *
 * @param taskId
 * @returns Promise
 */
export const getTask = async (taskId: number): Promise<any> => {
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

/**
 * Create task with input data.
 *
 * @param taskData
 * @returns Promise
 */
export const createTask = async (taskData: TaskDataType): Promise<any> => {
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

/**
 * Delete task for given id.
 *
 * @param taskId
 * @returns Promise
 */
export const deleteTask = async (taskId: number): Promise<any> => {
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
