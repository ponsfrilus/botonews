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
      card_type: 'image',
      src_channel: 'Go EPFL',
      title: `Go/${godata[i].alias}`,
      subtitle: `<a href="https://go.epfl.ch/${godata[i].alias}">https://go.epfl.ch/${godata[i].alias}</a> is a shortlink for <a href="https://go.epfl.ch/${godata[i].alias}">${godata[i].url}</a> that has already been clicked ${godata[i].clicks} times!`,
      item_url: new URL(`https://go.epfl.ch/${godata[i].alias}`),
      image_url: new URL(`https://go.epfl.ch/logo/GoEPFL_large_red_white.jpg`),
      image_alt: `Go EPFL logo red`,
      created_at: godata[i].created_at,
    };
    articles.push(article);
  }
  return articles;
};
