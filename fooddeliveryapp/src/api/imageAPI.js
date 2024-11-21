import axios from "axios";
const baseURL = "http://localhost:5000";

const api = axios.create({
  baseURL: `${baseURL}/`,
});

const getImageById = async (imageId) => {
  try {
    const response = await api.get(`/image/?imageId=${imageId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching image:", error);
  }
};

const getImageByContainer = async (container) => {
  try {
    const response = await api.get(`/image/?container=${container}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching image:", error);
  }
};

const getImageByAltText = async (altText) => {
  try {
    const response = await api.get(`/image/?altText=${altText}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching image:", error);
  }
};

const getImageByPage = async (page) => {
  try {
    const response = await api.get(`/image/?page=${page}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching image:", error);
  }
};
export {
  getImageById,
  getImageByContainer,
  getImageByAltText,
  getImageByPage,
};
