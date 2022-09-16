import {http} from './htpp'

export const getProfile = async () => {
    try {
        const response = await fetch(`${http}auth/me`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        });
        const resJson = await response?.json();
        return resJson;
    } catch (error) {
        console.log(error);
    }
};

export const logOut = async () => {
    try {
        const response = await fetch(`${http}auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};