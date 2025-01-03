import axios from 'axios';

const API_BASE_URL = 'http://localhost:5008/api/v1/gofishgames';

export const createNewGame = async () => {
    const response = await axios.post(API_BASE_URL);
    return response.data;
};

export const getGame = async (id: string) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

export const playerAskFor = async (id: string, value: string) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, { value });
    return response.data;
};

export const deleteGame = async (id: string) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
};