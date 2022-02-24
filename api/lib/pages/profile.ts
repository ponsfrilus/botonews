import { Request, Response } from 'express';
import { getAllSources, getAllSubscriptions, getAllSupports, getSubscription } from '../DB';

const profile = async (req: any, res: Response) => {
  let userSubscriptions = await getAllSubscriptions(req.session.passport.user.provider.userid)
  let allSupports:any = await getAllSupports()
  let allSources:any = await getAllSources()
  if(userSubscriptions.length == 0) { // Si la personne n'a aucune subscription
    res.render('profile', {user: req.session.passport.user.provider, path: req.path, subscription: {}, supports: allSupports, subscriptions: {}, sources: allSources});
  } else if(req.params.id_subscription) { // Si la personne est entrain d'éditer une subscription
    var subscriptionId = parseInt(req.params.id_subscription)
    let userSubscription = await getSubscription(subscriptionId)
    res.render('profile', {user: req.session.passport.user.provider, path: req.path, subscription: userSubscription, supports: allSupports, subscriptions: {}, sources: allSources});
  } else {
    res.render('profile', {user: req.session.passport.user.provider, path: req.path, subscriptions: userSubscriptions, subscription: {}, supports: allSupports, sources: allSources});
  }
};

export default profile;
