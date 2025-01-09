import axios from 'axios';

const API_BASE_URL = 'http://localhost:5008/api/v1/gofishgames';



/**
 * POST: Create a new game
 * @returns {Promise<any>} - the game object
 */
export const createNewGame = async (): Promise<any> => {
    const response = await axios.post(API_BASE_URL);
    return response.data;
};

/**
 * GET: Get a game by id
 * 
 * @param {string} id 
 * @returns {Promise<any>} - the game object
 */
export const getGame = async (id: string): Promise<any> => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

/** 
 * PUT: Is called when a player asks for a card
 * 
 * @param {string} id - the id of the game
 * @param {string} value - the value of the card the player is asking for
 * @returns {Promise<any>} - the game object
 */
export const playerAskFor = async (id: string, value: string): Promise<any> => {
    const response = await axios.put(`${API_BASE_URL}/${id}?value=${value}`);
    return response.data;
};

/** 
 * DEL: intended to be called when a player wins the game to delete the game
 * 
 * @param {string} id - the id of the game
 * @returns {Promise<any>} - the game object
 */
export const deleteGame = async (id: string) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
};