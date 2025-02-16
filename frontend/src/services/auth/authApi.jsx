import { apiCall } from "../apiCall";

export const googleLogin = async (googleToken) => {
    try {
        let result;
        let headers = {
            Authorization: `Bearer${googleToken}`
        }

        result = await apiCall('GET', '/api/auth/google_login', headers);
        return result;

    } catch (er) {
        console.log(er.message);
        return { success: false, message: er?.response?.data?.message }
    }
}

export const login = async (data) => {
    try {

        let result;

        result = await apiCall('POST', '/api/auth/login', null, data);
        return result;


    } catch (er) {
        return { success: false, message: er?.response?.data?.message }
    }
}

export const signup = async (data) => {
    try {

        let result;

        result = await apiCall('POST', '/api/auth/signup', null, data);
        return result;

    } catch (er) {
        return { success: false, message: er?.response?.data?.message }
    }
}


export const dashboardOverview = async (token) => {
    try {

        let headers = {
            Authorization: `Bearer${token}`
        }

        let result = await apiCall('GET', '/api/auth/dashboard_overview', headers);
        return result;

    } catch (er) {
        return { success: false, message: er?.response?.data?.message };
    }
}