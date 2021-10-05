import axios from 'axios';

export const fetchActu = async (options = {}) => {
  let defaultoptions = {
    lang: 'en',
    number: 3, // Max is 100
  };
  let opt = { ...defaultoptions, ...options };

  let articles = [];

  const response = await axios.get(
    `https://actu.epfl.ch/api/v1/channels/1/news/?lang=${opt.lang}&limit=${opt.number}`
  );
  const respdata: any = response.data;

  for (let i = 0; i != opt.number; i++) {
    let article: BotonewsItem = {
      src_channel: 'Actu EPFL',
      title: respdata.results[i].title,
      subtitle: respdata.results[i].subtitle,
      item_url: respdata.results[i].news_url,
      image_url: new URL(respdata.results[i].thumbnail_url),
      image_alt: respdata.results[i].visual_description,
      created_at: respdata.results[i].publish_date,
    };
    articles.push(article);
  }
  return articles;
};
