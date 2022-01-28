import { Request, Response } from 'express';
import { getAllSubscriptions, getSubscription } from '../DB';

const profile = async (req: any, res: Response) => {
  let userSubscriptions = await getAllSubscriptions(req.session.passport.user.provider.userid)
  if(userSubscriptions.length == 0) {
    res.render('profile', {user: req.session.passport.user.provider, path: req.path});
  } else if(req.params.id_subscription) {
    console.log("toto")
    var subscriptionId = String(req.params.id_subscription)
    console.log(typeof subscriptionId)
    let userSubscription = await getSubscription(subscriptionId)
    console.log(userSubscription)
    res.render('profile', {user: req.session.passport.user.provider, path: req.path, subscription: userSubscription});
  } else {
    res.render('profile', {user: req.session.passport.user.provider, path: req.path, subscriptions: userSubscriptions, subscription: {}});
  }
};

export default profile;
