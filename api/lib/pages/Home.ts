import { Request, Response } from 'express';
import { getAllSources, getAllSubscriptions } from '../DB';
import { fetchActu } from '../FetchActu';
import { fetchGoEpfl } from '../FetchGoEpfl';

const home = async (req: any, res: Response) => {

  // let's set our variables
  let news:any = [];
  let user:any = {};
  let subscriptions:any = [];
  let splashPageSubscription:any = {}

  let sources = await getAllSources()

  if (req.session.passport?.user?.provider?.userid && req.user) { // User is logged in

    user = req.session.passport.user.provider
    subscriptions = await getAllSubscriptions(req.session.passport.user.provider.userid)

    if (subscriptions && subscriptions.subscriptions && Array.isArray(subscriptions.subscriptions)) {
      splashPageSubscription = subscriptions.subscriptions.find((e:any) => e.support.title === 'SplashPage')
    } else {
      splashPageSubscription = false
    }

    if (!splashPageSubscription) {
      // Set the default subscription
      splashPageSubscription = {
        "subscription": "FAKE",
        "support": {
            "title": "SplashPage",
            "is_unique": 1
        },
        "modalities": { "random": true},
        "sources": [ {"title": "Go"}, {"title": "Actu"} ]
      }
    }
    for (let element of splashPageSubscription.sources) {
      // TODO: find a way to dynamically call fetch method based on element.title
      switch(element.title) {
        case "Go":
          let goEpfl: BotonewsItem[] = await fetchGoEpfl({number: 6});
          news = news.concat(goEpfl);
        break;
        case "Actu":
          let actu: BotonewsItem[] = await fetchActu({number: 6});
          news = news.concat(actu);
        break;
      }
    }

  } else { // User is not logged in

    splashPageSubscription = {
      "modalities": {
        "random": true
      }
    }

    let goEpfl: BotonewsItem[] = await fetchGoEpfl({number: 6});
    news = news.concat(goEpfl);
    let actu: BotonewsItem[] = await fetchActu({number: 6});
    news = news.concat(actu);

  }

  if (splashPageSubscription.modalities?.random) {
    news = news.sort( () => Math.random() - 0.5)
  }
  res.render('homepage',  {user, subscriptions, news, splashPageSubscription, sources});
};

export default home;
