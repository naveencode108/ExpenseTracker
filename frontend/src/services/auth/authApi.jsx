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

export const login = async () => {
    try {

    } catch (er) {
        return { success: false, message: er?.response?.data?.message }
    }
}

export const signup = async () => {
    try {

    } catch (er) {
        return { success: false, message: er?.response?.data?.message }
    }
}