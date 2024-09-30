const API_KEY = 'XdV3BkdssPJi3dAIfxhE20MA6rWUmlK0';
const BASE_URL = 'https://api.giphy.com/v1/gifs/search';

export const TICKET_GIF_API = `${BASE_URL}?api_key=${API_KEY}&q=`;

export const gifKeywords = {
  Baja: 'easy',
  Media: 'medium difficulty',
  Alta: 'hard challenge',
  Finalizados: 'completed task',
};

const buildGifUrl = (keyword) => `${TICKET_GIF_API}${encodeURIComponent(keyword)}`;

export const fetchGif = async (keyword) => {
  try {
    const response = await fetch(buildGifUrl(keyword));
    const { data } = await response.json();
    
    if (!data.length) return null;
    
    const randomGif = data[Math.floor(Math.random() * data.length)];
    return randomGif.images.fixed_height.url;
  } catch (error) {
    console.error('Error fetching GIF:', error);
    return null;
  }
};
