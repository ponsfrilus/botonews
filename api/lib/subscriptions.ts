import { NextFunction, Request, Response } from 'express';
import { getSubscription, getAllSubscriptions, insertSubscription, insertSubscriptionSources, deleteSubscription } from './DB';
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
                var subscriptionId;
                subscriptionId = String(req.params.id_subscription);
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
            var subscriptionId;
            subscriptionId = parseInt(req.params.id_subscription);
            var deletedSubscription:any = await deleteSubscription(subscriptionId)
            res.send(deletedSubscription);
        break;
    };
}

export default subscriptions;