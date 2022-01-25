import { NextFunction, Request, Response } from 'express';
import { getSubscription, getAllSubscriptions, insertSubscription, insertSubscriptionSources } from './DB';
const subscriptions = async (req: Request, res: Response, next: NextFunction) => {
    switch (req.method) {
        case "GET":
            var error =
            '{\
                "status_code": 400,\
                "error": "Please specify a user id (you can also specify a subscription id)"\
            }';
            // if (!req.body.userId) return res.status(400) && res.send(JSON.parse(error));
            if(req.params.id_subscription) {
                var subscriptionId;
                subscriptionId = String(req.params.id_subscription);
                var fetchedSubscription:any = await getSubscription(subscriptionId);
                res.send(fetchedSubscription);
            } else if(req.body.userId) {
                var fetchedSubscriptions:any = await getAllSubscriptions(req.body.userId);
                res.send(fetchedSubscriptions);
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
            res.send(insertedSubscription);
        break;
    };
}

export default subscriptions;