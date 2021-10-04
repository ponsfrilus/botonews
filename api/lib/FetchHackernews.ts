import axios from 'axios';

export const fetchHackernews = async (options = {}) => {
  let defaultoptions = {
    number: 3, // Max is 499
  };
  let opt = { ...defaultoptions, ...options };

  let articles = [];

  const { data } = await axios.get(
    'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
  );
  for (let i = 0; i != opt.number; i++) {
    const articledetail = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${data[i]}.json?print=pretty`
    );
    const articledata: any = articledetail.data;
    var d = new Date(0);
    d.setUTCSeconds(articledata.time);

    let article: BotonewsItem = {
      src_channel: 'Hacker News',
      title: articledata.title,
      subtitle: ``,
      item_url: articledata.url,
      image_url: new URL(
        `https://findlogovector.com/wp-content/uploads/2019/10/y-combinator-logo-vector.png`
      ),
      image_alt: `YCombinator Orange logo`,
      created_at: d,
      author_name: articledata.by,
      author_url: new URL(`https://news.ycombinator.com/user?id=${articledata.by}`),
    };
    articles.push(article);
  }
  return articles;
};
