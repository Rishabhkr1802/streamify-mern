import { axiosInstance } from "./Axios.js";

export async function auth() {
    const response = axiosInstance.get("/auth/me");
    return response.data;
}

export async function signUp(signupData) {
    const response = await axiosInstance.post('/auth/signup', signupData);
    return response.data;
}

export async function login(loginData) {
    const response = await axiosInstance.post('/auth/login', loginData);
    return response.data;
}

export async function logout() {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
}

export async function onboarding(onboardingData) {
    const response = await axiosInstance.post('/auth/onboarding', onboardingData);
    return response.data;
}

export async function getFriends() {
    const response = await axiosInstance.get('/users/friends');
    return response.data?.friends || [];
}

export async function getUsers() {
    const response = await axiosInstance.get("/users/get-recommended-user");
    return response.data?.recommendedUsers || [];
}

export async function getOutgoingRequests() {
    const response = await axiosInstance.get("/users/outgoing-friend-requests");
    return response.data?.recommendedUsers || [];
}

export async function sendFriendRequest(id) {
    const response = await axiosInstance.post(`/users/friend-request/${id}`);
    return response.data || [];
}

export async function getFriendRequest() {
    const response = await axiosInstance.get("/users/friend-requests");
    return response.data?.incomingRequest || [];
}

export async function acceptFriendRequest(id) {
    const response = await axiosInstance.put(`/users/friend-request/${id}/accept`);
    return response || [];
}