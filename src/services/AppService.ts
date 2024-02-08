import {Album, Photo, Post, User, Comment} from "../models/appModels";

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPhotos = async (query: string): Promise<Photo[]> => {
    const response = await fetch(`${API_BASE_URL}/photos?${query}`);
    if (!response.ok) {
        throw new Error('Failed to fetch photos');
    }
    return response.json();
};

export const fetchUsers = async (name?: string): Promise<User[]> => {
    let urlParams = ``
    if(name) {
        urlParams =`?name=${name}`;
    }
    const response = await fetch(`${API_BASE_URL}/users${urlParams}`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
};

export const fetchUserById = async (id: number): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users?id=${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    const users = await response.json(); // This is expected to be an array
    if (users.length === 0) {
        throw new Error('User not found');
    }
    return users[0];
};

export const fetchAlbums = async (userId?: number): Promise<Album[]> => {
    let urlParams = `?_limit=25`
    if(userId) {
        urlParams =`?userId=${userId}&_limit=25`;
    }
    const response = await fetch(`${API_BASE_URL}/albums${urlParams}`);
    if (!response.ok) {
        throw new Error('Failed to fetch albums');
    }
    return response.json();
};

export const fetchUserPosts = async (userId: number): Promise<Post[]> => {
    const response = await fetch(`${API_BASE_URL}/posts?userId=${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user posts');
    }
    return response.json();
};

export const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
        throw new Error('Failed to fetch all posts');
    }
    return response.json();
};

export const fetchComments = async (postId: number): Promise<Comment[]> => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
    if (!response.ok) {
        throw new Error('Failed to fetch comments');
    }
    return response.json();
};

export const fetchUserPhotos = async (userId: number): Promise<Photo[]> => {
    const response = await fetch(`${API_BASE_URL}/photos?userId=${userId}&_limit=25`);
    if (!response.ok) {
        throw new Error('Failed to fetch user photos');
    }
    return response.json();
};


