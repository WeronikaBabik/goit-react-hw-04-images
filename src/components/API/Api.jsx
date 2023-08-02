import axios from 'axios';
import Notiflix from 'notiflix';
const API_URL = 'https://pixabay.com/api/';
const API_KEY = '36880371-89cd0a5013ff4a3497b5a0fcd';

axios.defaults.baseURL = API_URL;

const DEFAULT_PIXABAY_PARAMS = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
  safesearch: 'true',
});

export const dataFromPixabay = async (q, page = 1) => {
  try {
    const images = await axios.get(
      `?q=${q}&page=${page}&${DEFAULT_PIXABAY_PARAMS}`
    );
    return images.data;
  } catch {
    return Notiflix.Notify.failure('Nothing was found');
  }
};
export default dataFromPixabay;
