


const BASE_URL = import.meta.env.VITE_APP_BASE_URL

// AUTH ENDPOINTS
export const authEndpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}


export const taskEndPoints = {
    CREATE_TASK: BASE_URL + "/task/task-create",
    UPDATE_TASK: BASE_URL + "/task/task-update",
    DELETE_TASK: BASE_URL + "/task/task-delete"
}


export const postEndPoints = {
    NEW_POST: BASE_URL + "/post/new-post",
    GET_ALL_POST: BASE_URL + "/post/get-all-post",
}
