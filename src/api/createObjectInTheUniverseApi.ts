import axios from 'axios';

const apiUrlPolyanets = 'https://challenge.crossmint.io/api/';

export const createObjectInTheUniverse = async (data: object, endPoint: string) => {
  try {
    const response = await axios.post(`${apiUrlPolyanets}${endPoint}`, data);
    return response;
  } catch (error: any) {
    throw error;
  }
};