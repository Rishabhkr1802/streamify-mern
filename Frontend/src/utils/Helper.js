import { redirect } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export function setLocalStorageData(data) {
    localStorage.setItem("user", JSON.stringify(data));
    return null;
}

export function getLocalStorageData() {
    const data = localStorage.getItem("user");
    const user = JSON.parse(data);
    return user;
}

export function generateRandomNumberUpto100() {
    return  Math.floor(Math.random() * 100) + 1;
}

export function hasAuthenticated() {
    const token = localStorage.getItem("user");
    const user  = localStorage.getItem("token");

    if (!token || !user) return redirect("/login");
    return null;
}

// export function hasOnboardAccessible() {
//     const token = localStorage.getItem("token");
//     const user  = localStorage.getItem("user");

//     if (!token || !user) return redirect("/login");

//     const { isOnboarded } = JSON.parse(user);
//     if (token &&  isOnboarded === true ) return redirect("/");
//     return null;
// }