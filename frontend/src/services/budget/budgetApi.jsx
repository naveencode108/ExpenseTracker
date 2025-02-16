import { apiCall } from "../apiCall";

export const createBudget = async (data) => {
    try {
        let result;
        result=await apiCall('POST','/api/budget/',null,data);
        return result;

    } catch (er) {
        return { success: false, message: er?.response?.data?.message }
    }
}


export const updateBudget = async (id,data) => {
    try {
        let result;
        result=await apiCall('PUT',`/api/budget/${id}`,null,data);
        return result;
        
    } catch (er) {
        return { success: false, message: er?.response?.data?.message }
    }
}

export const deleteBudget = async (id) => {
    try {
      
        let result;
        result=await apiCall('DELETE',`/api/budget/${id}`,null);
        return result;

    } catch (er) {
        return { success: false, message: er?.response?.data?.message }
    }
}

export const getBudget = async (token) => {
    try {
        let headers={
            Authorization:`Bearer${token}`
        }
        let result;
        result=await apiCall('GET','/api/budget/',headers);
        return result;

    } catch (er) {
        return { success: false, message: er?.response?.data?.message }
    }
}