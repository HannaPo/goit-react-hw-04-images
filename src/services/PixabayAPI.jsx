import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '34887920-69520c8eb03b7d32c829f5519';
export const perPage = 12;

export const fetchImages = async (query, page = 1) => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
  }).toString();
  
  const response = await axios.get(`?${searchParams}&page=${page}`);
  
  return response.data;
};

export const normalizedImg = images =>
  images.map(({ id, webformatURL, largeImageURL, tags }) => {
    return { id, webformatURL, largeImageURL, tags };
  });
