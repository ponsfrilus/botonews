import { Request, Response } from 'express';
import { getAllSubscriptions, getAllSupports, getSubscription } from '../DB';

const profile = async (req: any, res: Response) => {
  let userSubscriptions = await getAllSubscriptions(req.session.passport.user.provider.userid)
  let allSupports:any = await getAllSupports()
  if(userSubscriptions.length == 0) { // Si la personne n'a aucune subscription
    res.render('profile', {user: req.session.passport.user.provider, path: req.path, subscription: {}, supports: allSupports, subscriptions: {}});
  } else if(req.params.id_subscription) { // Si la personne est entrain d'éditer une subscription
    var subscriptionId = parseInt(req.params.id_subscription)
    let userSubscription = await getSubscription(subscriptionId)
    res.render('profile', {user: req.session.passport.user.provider, path: req.path, subscription: userSubscription, supports: allSupports, subscriptions: {}});
  } else {
    res.render('profile', {user: req.session.passport.user.provider, path: req.path, subscriptions: userSubscriptions, subscription: {}, supports: allSupports});
  }
};

export default profile;
