type BotonewsItem = {
  card_type: string;
  src_channel: string;
  title: string;
  subtitle?: string;
  image_url: URL;
  item_url: URL;
  image_alt: string;
  created_at: Date;
  author_name?: string;
  author_url?: URL;
  extra?: any;
};
