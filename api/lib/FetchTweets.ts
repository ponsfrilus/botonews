import axios from 'axios';

export const fetchTweets = async (options = {}) => {
  let defaultoptions = {
    number: 4, // Max is 499
    username: 'Azecko1',
    api_key: '',
  };
  let opt = { ...defaultoptions, ...options };

  let articles = [];

  if (!opt.api_key) {
    throw new Error('Invalid API key provided');
  }

  let config = {
    headers: {
      Authorization: 'Bearer ' + opt.api_key,
    },
  };

  const response = await axios.get(
    `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${opt.username}&count=${opt.number}`,
    config
  );
  const respdata: any = response.data;

  for (let tweet of respdata) {
    let article: BotonewsItem = {
      src_channel: 'Twitter',
      title: `Tweet by ${tweet.user.screen_name}`,
      item_url: new URL(`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`),
      image_url: new URL(
        `https://logosmarken.com/wp-content/uploads/2020/04/Twitter-Zeichen-2010%E2%80%932012.jpg`
      ),
      image_alt: `Twitter logo`,
      created_at: tweet.created_at,
    };
    articles.push(article);
  }
  return articles;
};
