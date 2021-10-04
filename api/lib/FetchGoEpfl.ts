import axios from 'axios';

export const fetchGoEpfl = async (options = {}) => {
  let defaultoptions = {
    number: 3, // Max is 30
  };
  let opt = { ...defaultoptions, ...options };

  let articles = [];

  const response = await axios.get(
    `https://go.epfl.ch/api/v1/aliases?orderby=created_at&sort=desc&per_page=${opt.number}`
  );
  const respdata: any = response.data;
  const godata: any = respdata.data;

  for (let i = 0; i != opt.number; i++) {
    let article: BotonewsItem = {
      src_channel: 'Go EPFL',
      title: `https://go.epfl.ch/${godata[i].alias}`,
      item_url: godata[i].url,
      image_url: new URL(`https://go.epfl.ch/logo/GoEPFL_large_red_white.jpg`),
      image_alt: `Red go EPFL logo`,
      created_at: godata[i].created_at,
    };
    articles.push(article);
  }
  return articles;
};
