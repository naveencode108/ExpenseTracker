import { apiCall } from "../apiCall";

export const createExpense = async (data) => {
    try {
        let result;
        result = await apiCall('POST', '/api/expense', null, data);
        return result;

    } catch (er) {
        return { success: false, message: er?.response?.data?.message }
    }
}

export const updateExpense = async (id,data) => {
    try {

        let result;
        result = await apiCall('PUT', `/api/expense/${id}`, null,data);
        return result;

    } catch (er) {
        return { success: false, message: er?.response?.data?.message }
    }
}

export const deleteExpense = async (id) => {
    try {
        let result;
        result = await apiCall('DELETE', `/api/expense/${id}`, null);
        return result;

    } catch (er) {
        return { success: false, message: er?.response?.data?.message }
    }
}

export const getExpense = async (id) => {
    try {

        let result;
        result = await apiCall('GET', `/api/expense/${id}`, null);
        return result;

    } catch (er) {
        console.log(er);
        return { success: false, message: er?.response?.data?.message }
    }
}