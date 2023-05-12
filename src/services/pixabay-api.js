import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const perPage = 12;

export const getImages = async (query, page = 1) => {
  const searchParams = new URLSearchParams({
    key: '34105026-760e87e01f05ad85b03df7d04',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
  });

  const response = await axios.get(`?q=${query}&page=${page}&${searchParams}`);

  return response.data;
};
