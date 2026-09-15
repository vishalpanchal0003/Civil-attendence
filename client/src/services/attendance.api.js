import {attendanceApi} from "./api";

export const signIn = async () => {
    const response = await attendanceApi.post("/signin");
    return response.data;
};

export const signOff = async () => {
    const response = await attendanceApi.post("/signout");
    return response.data;
};

export const getMyAttendance = async () => {
    const response = await attendanceApi.get("/getattendance");
    return response.data;
}; 

export const adminStats = async()=>{
    const response = await attendanceApi.get("/adminstats")
    return response.data
}

export const getAllAttendance = async () => {
    const response = await attendanceApi.get("/getallattendance");
    return response.data;
};
export const getMySalary = async (month) => {
    const response = await attendanceApi.post(
        "/getsalary",
        {},
        {
            params: {
                month,
            },
        }
    );

    return response.data;
};
export const getAllSalary = async (month) => {
    const response = await attendanceApi.get("/getallsalary", {
        params: {
            month,
        },
    });
    return response.data;
};