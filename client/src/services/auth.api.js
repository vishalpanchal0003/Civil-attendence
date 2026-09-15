import { authApi } from "./api";

export const loginUser = async (userData) => {
    const response = await authApi.post('/login', userData)
    return response.data
}
export const registerUser = async (userData) => {
    const response = await authApi.post('/createuser', userData)
    return response.data
}
export const registerAdmin = async (userData) => {
    const response = await authApi.post('/createadmin', userData)
    return response.data
}

export const logOut = async () => {
    const response = await authApi.post("/logout")
    return response.data;
}


export const updateUserDetails = async (id, data) => {
    const response = await authApi.put(
        `/updateprofile/${id}`,
        data
    );

    return response.data;
};



export const updateDailyWage = async (id, dailyWage) => {
    const response = await authApi.patch(
        `/dailywage/${id}`, {dailyWage}
    );

    return response.data;
};


export const getUserProfile = async () => {
    const response = await authApi.get("/getprofile");
    return response.data;
};



export const getAllUsers = async () => {
    const response = await authApi.get("/getalluser");
    return response.data;
};

export const updateUserPassword = async (id, userData) => {
    const response = await authApi.put(`/updatepassword/${id}`, userData)
    return response.data
}
