import axios from 'axios';

export const fetchMotivQuote = async (options = {}) => {

  let defaultoptions = {
    number: 4, // Max is 50
  };
  let opt = { ...defaultoptions, ...options };

  let articles = [];

  const response = await axios.get(
    `https://zenquotes.io/api/quotes`
  );
  const respdata: any = response.data;

  let i = 0;

  for (let quote of respdata) {
    let article: MotivQuoteItem = {
      src_channel: 'Quote',
      quote: quote.q,
      author: quote.a,
    }
    articles.push(article)
    i++;
    if(i == opt.number) {
      break;
    }
  }

  return articles;
};