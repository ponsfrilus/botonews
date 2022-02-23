import { NextFunction, Request, Response } from 'express';
import { getSubscription, getAllSubscriptions, insertSubscription, insertSubscriptionSources, deleteSubscription, updateSubscription } from './DB';
const subscriptions = async (req: Request, res: Response, next: NextFunction) => {
    switch (req.method) {
        case "GET":
            var error =
            '{\
                "status_code": 400,\
                "error": "Please specify a user id (you can also specify a subscription id)"\
            }';
            // if (!req.body.userId) return res.status(400) && res.send(JSON.parse(error));
            if(req.path.includes('/subscriptions/user/')) {
                var fetchedSubscriptions:any = await getAllSubscriptions(req.params.user);
                res.send(fetchedSubscriptions);
            } else {
                var subscriptionId = parseInt(req.params.id_subscription);
                var fetchedSubscription:any = await getSubscription(subscriptionId);
                res.send(fetchedSubscription);
            }

        break;

        case "POST":
            var error =
            '{\
                "status_code": 400,\
                "error": "Please specify a user id, source(s) and a support"\
            }';
            if (!req.body.userId || !req.body.source || !req.body.support) return res.status(400) && res.send(JSON.parse(error));
            var modalities = req.body.modalities || {};
            var fetchedSubscriptions:any = await getAllSubscriptions(req.body.userId);
            if(!fetchedSubscriptions.length) {
                var insertedSubscription:any = await insertSubscription(req.body.userId, req.body.support, modalities);
                req.body.source.forEach(async (element: any) => {
                    var insertedSubscriptionSources:any = await insertSubscriptionSources(insertedSubscription.insertId, element)
                });
                return res.status(201) && res.send(insertedSubscription);
            }
            for (let i = 0; i < fetchedSubscriptions.subscriptions.length; i++) {
                var subscription = fetchedSubscriptions.subscriptions[i]
                if(subscription.support.is_unique == 1) {
                    if(subscription.support.id.toString() == req.body.support) {
                        var uniqueSubError =
                        '{\
                            "status_code": 409,\
                            "error": "You already have a subscription with this support created."\
                        }';
                        return res.status(409) && res.send(JSON.parse(uniqueSubError));
                    }
                }
            }
            var insertedSubscription:any = await insertSubscription(req.body.userId, req.body.support, modalities);
            req.body.source.forEach(async (element: any) => {
                var insertedSubscriptionSources:any = await insertSubscriptionSources(insertedSubscription.insertId, element)
            });
            res.status(201) && res.send(insertedSubscription);
        break;

        case "DELETE":
            var error =
            '{\
                "status_code": 400,\
                "error": "Please specify a subscription id."\
            }';
            if(!req.params.id_subscription) return res.status(400) && res.send(JSON.parse(error))
            var subscriptionId:number = parseInt(req.params.id_subscription);
            var deletedSubscription:any = await deleteSubscription(subscriptionId)
            res.send(deletedSubscription);
        break;

        case "PUT":
            var error =
            '{\
                "status_code": 400,\
                "error": "Please specify a user id, subscription id, source(s) and a support"\
            }';
            if (!req.body.userId || !req.params.id_subscription || !req.body.source || !req.body.support) return res.status(400) && res.send(JSON.parse(error));
            var modalities = req.body.modalities || {};
            var subscriptionId:number = parseInt(req.params.id_subscription);
            var fetchedUpdateSubscription:any = await updateSubscription(subscriptionId, req.body.userId, req.body.support, modalities, req.body.source)
            res.status(201) && res.send(fetchedUpdateSubscription)
        break;
    };
}

export default subscriptions;