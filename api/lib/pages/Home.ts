import { Request, Response } from 'express';
import { getAllSubscriptions } from '../DB';
import { fetchActu } from '../FetchActu';
import { fetchGoEpfl } from '../FetchGoEpfl';

const home = async (req: any, res: Response) => {
  if(req.user) { // User is logged in
    let userSubscriptions = await getAllSubscriptions(req.session.passport.user.provider.userid)
    let news:any = [];
    let splashPageSubscriptions:any = [];

    if(userSubscriptions.length == 0) { // User is logged in but doesn't have subscription at all
      splashPageSubscriptions[0] = {
        "subscription": "FAKE",
        "support": {
            "id": 4,
            "title": "SplashPage",
            "is_unique": 1
        },
        "modalities": {},
        "sources": [ {"id": 1, "title": "Go"} ]
      }

      let goEpfl: BotonewsItem[] = await fetchGoEpfl({number: 5});
      news = news.concat(goEpfl);

      return res.render('homepage',  {user: req.session.passport.user.provider, subscriptions: {}, news: news, splashPageSubscription: splashPageSubscriptions[0]});
    }

    userSubscriptions.subscriptions.forEach((element:any) => {
      if(element.support.title == "SplashPage") {
        splashPageSubscriptions.push(element)
      }
    });
    if(!splashPageSubscriptions[0]) { // User is logged in but does not have any splashpage subscription created.

      splashPageSubscriptions[0] = {
        "subscription": "FAKE",
        "support": {
            "id": 4,
            "title": "SplashPage",
            "is_unique": 1
        },
        "modalities": {},
        "sources": [ {"id": 1, "title": "Go"} ]
      }

      let goEpfl: BotonewsItem[] = await fetchGoEpfl({number: 5});
      news = news.concat(goEpfl);

      return res.render('homepage',  {user: req.session.passport.user.provider, subscriptions: userSubscriptions, news: news, splashPageSubscription: splashPageSubscriptions[0]});
    }
    for(let element of splashPageSubscriptions[0].sources) {
      switch(element.title) {
        case "Go":
          let goEpfl: BotonewsItem[] = await fetchGoEpfl({number: 5});
          news = news.concat(goEpfl);
        break;
        case "Actu":
          let actu: BotonewsItem[] = await fetchActu({number: 5});
          news = news.concat(actu);
        break;
      }
    }
    res.render('homepage', {user: req.session.passport.user.provider, subscriptions: userSubscriptions, news: news, splashPageSubscription: splashPageSubscriptions[0]} );
  } else { // User is not logged in
    let news:any = [];

    let goEpfl: BotonewsItem[] = await fetchGoEpfl({number: 5});
    news = news.concat(goEpfl);

    res.render('homepage',  {user: {}, subscriptions: {}, news: news, splashPageSubscription: {}});
  }
};

export default home;
