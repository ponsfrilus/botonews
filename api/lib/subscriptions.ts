import { NextFunction, Request, Response } from 'express';
import { getSubscription, getAllSubscriptions, insertSubscription, insertSubscriptionSources, deleteSubscription, updateSubscription } from './DB';
const validateModalities = (modalities:any) => {
    /* TODO : Validate modalities
        No date and time if mode is auto (when support modalities = time)
    */
    return modalities;
}
const checkIfSubAlreadyExists = (subscription:any, supportId:string) => {
    if(subscription.support.is_unique == 1) {
        if(subscription.support.id.toString() == supportId) {
            return true
        }
    }
    return false
}
const subscriptions = async (req: Request, res: Response, next: NextFunction) => {
    switch (req.method) {
        case "GET":
            var error = {
                status_code: "400",
                error: "Please specify a user id or a subscription id."
            }
            if(req.path.includes('/subscriptions/user/')) {
                if (!req.params.user) return res.status(400) && res.send(error);
                var fetchedSubscriptions:any = await getAllSubscriptions(req.params.user);
                res.send(fetchedSubscriptions);
            } else {
                if(!req.params.id_subscription) return res.status(400) && res.send(error);
                var subscriptionId = parseInt(req.params.id_subscription);
                var fetchedSubscription:any = await getSubscription(subscriptionId);
                res.send(fetchedSubscription);
            }

        break;

        case "POST":
            var error = {
                status_code: "400",
                error: "Please specify a user id, source(s) and a support."
            }
            if (!req.body.userId || !req.body.sources || !req.body.support) return res.status(400) && res.send(error);
            var modalities = req.body.modalities || {};
            modalities = validateModalities(modalities)
            var fetchedSubscriptions:any = await getAllSubscriptions(req.body.userId);
            if(!fetchedSubscriptions.length) {
                var insertedSubscription:any = await insertSubscription(req.body.userId, req.body.support, modalities);
                req.body.sources.forEach(async (element: any) => {
                    var insertedSubscriptionSources:any = await insertSubscriptionSources(insertedSubscription.insertId, element)
                });
                return res.status(201) && res.send(insertedSubscription);
            }
            for (let i = 0; i < fetchedSubscriptions.subscriptions.length; i++) {
                if(checkIfSubAlreadyExists(fetchedSubscriptions.subscriptions[i], req.body.support)) {
                    var uniqueSubError = {
                        status_code: "409",
                        error: "You already have a subscription with this support created."
                    }
                    return res.status(409) && res.send(uniqueSubError);
                }
            }
            var insertedSubscription:any = await insertSubscription(req.body.userId, req.body.support, modalities);
            req.body.sources.forEach(async (element: any) => {
                var insertedSubscriptionSources:any = await insertSubscriptionSources(insertedSubscription.insertId, element)
            });
            res.status(201) && res.send(insertedSubscription);
        break;

        case "DELETE":
            var error = {
                status_code: "400",
                error: "Please specify a subscription id."
            }
            if(!req.params.id_subscription) return res.status(400) && res.send(error)
            var subscriptionId:number = parseInt(req.params.id_subscription);
            var deletedSubscription:any = await deleteSubscription(subscriptionId)
            res.send(deletedSubscription);
        break;

        case "PUT":
            var error = {
                status_code: "400",
                error: "Please specify a user id, subscription id, source(s) and a support."
            }
            if (!req.body.userId || !req.params.id_subscription || !req.body.sources || !req.body.support) return res.status(400) && res.send(error);
            var fetchedSubscriptions:any = await getAllSubscriptions(req.body.userId);
            // Vérifier que le support de fetchSubscriptions est similaire au support qui est puté, et si c'est le cas, ça veut dire que l'utilisateur n'a pas changé le support dans l'édition, et vu qu'elle ne l'a pas changé c'est bon
            for (let i = 0; i < fetchedSubscriptions.subscriptions.length; i++) {
                if(checkIfSubAlreadyExists(fetchedSubscriptions.subscriptions[i], req.body.support)) {
                    var uniqueSubError = {
                        status_code: "409",
                        error: "You already have a subscription with this support created."
                    }
                    if(fetchedSubscriptions.subscriptions[i].subscription == req.params.id_subscription) {
                        break;
                    }
                    return res.status(409) && res.send(uniqueSubError);
                }
            }
            var modalities = req.body.modalities || {};
            modalities = validateModalities(modalities)
            var subscriptionId:number = parseInt(req.params.id_subscription);
            var fetchedUpdateSubscription:any = await updateSubscription(subscriptionId, req.body.userId, req.body.support, modalities, req.body.sources)
            res.status(201) && res.send(fetchedUpdateSubscription)
        break;
    };
}

export default subscriptions;