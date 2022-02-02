import { Request, Response } from 'express';
import { getAllSubscriptions, getSubscription } from '../DB';

const profile = async (req: any, res: Response) => {
  let userSubscriptions = await getAllSubscriptions(req.session.passport.user.provider.userid)
  if(userSubscriptions.length == 0) { // Si la personne n'a aucune subscription
    res.render('profile', {user: req.session.passport.user.provider, path: req.path, subscription: {}});
  } else if(req.params.id_subscription) { // Si la personne est entrain d'éditer une subscription
    var subscriptionId = parseInt(req.params.id_subscription)
    let userSubscription = await getSubscription(subscriptionId)
    res.render('profile', {user: req.session.passport.user.provider, path: req.path, subscription: userSubscription});
  } else {
    res.render('profile', {user: req.session.passport.user.provider, path: req.path, subscriptions: userSubscriptions, subscription: {}});
  }
};

export default profile;
