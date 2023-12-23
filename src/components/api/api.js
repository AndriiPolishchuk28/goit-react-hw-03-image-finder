import axios from 'axios';

export const fetchImages = async (query, page, perPage) => {
  const APIKEY = '40423678-d168429128686f2691e5973ea';
  const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
  const { data } = await axios.get(url);
  return data;
};
