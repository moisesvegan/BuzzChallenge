export const TICKET_GIF_API = 'https://api.giphy.com/v1/gifs/search?api_key=XdV3BkdssPJi3dAIfxhE20MA6rWUmlK0&q=';

export const gifKeywords = {
  Baja: 'easy',
  Media: 'medium difficulty',
  Alta: 'hard challenge',
  Finalizados: 'completed task',
};

export const fetchGif = async (keyword) => {
  const response = await fetch(TICKET_GIF_API + encodeURIComponent(keyword));
  const data = await response.json();
  const randomGif = data.data[Math.floor(Math.random() * data.data.length)];
  return randomGif.images.fixed_height.url;
};
