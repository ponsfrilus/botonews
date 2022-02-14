import { Request, Response } from 'express';
import { getAllSubscriptions } from '../DB';
import { fetchGoEpfl } from '../FetchGoEpfl';

const home = async (req: any, res: Response) => {
  if(req.user) {
    let userSubscriptions = await getAllSubscriptions(req.session.passport.user.provider.userid)
    let splashPageSubscriptions:any = []
    userSubscriptions.subscriptions.forEach((element:any) => {
      if(element.support.title == "SplashPage") {
        splashPageSubscriptions.push(element)
      }
    });
    let news:any = [];
    for(let element of splashPageSubscriptions[0].sources) {
      switch(element.title) {
        case "Go":
          console.log("goEPFL detected")
          let goEpfl: BotonewsItem[] = await fetchGoEpfl({number: 5});
          news = news.concat(goEpfl);
        break;
      }
    }
    res.render('homepage', {user: req.session.passport.user.provider, subscriptions: userSubscriptions, news: news} );
  } else {
    let news:any = [];

    let goEpfl: BotonewsItem[] = await fetchGoEpfl({number: 5});
    news = news.concat(goEpfl);

    res.render('homepage',  {user: {}, subscriptions: {}, news: news});
  }
};

export default home;
