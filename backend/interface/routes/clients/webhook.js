import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
import Client from '../../../entities/clients/clients.js';
import Admin from '../../../entities/admin/adminModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

const endpointSecret = process.env.ENDPOINT_SECRET;

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
    let event;
    try {
        console.log('reached in webhooks');
        const sig = req.headers["stripe-signature"];
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log("✅ Success:", event.id);
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).json({ error: { message: `Webhook Error: ${err.message}` } });
    }

    try {
        const subscription = event.data.object;
        const subscriptionId = subscription.id;
        const clientId = subscription.metadata.payingUserId;
        const stripeCustomerId = subscription.customer;
        const amount = subscription.plan.amount / 100;
        const trialEnd = subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null;
        const currentPeriodEnd = subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null;
        const currentPeriodStart = subscription.current_period_start ? new Date(subscription.current_period_start * 1000).toISOString() : null;
        const productName = subscription.plan.product;

        switch (event.type) {
            case 'customer.subscription.created':
                try {
                    console.log('subscription details', subscription);

                    const query = { _id: clientId };
                    const update = {
                        subscription: {
                            stripeCustomerId: stripeCustomerId,
                            stripeSubscriptionId: subscriptionId,
                            stripePriceId: subscription.plan.id,
                            stripeCurrentPeriodEnd: currentPeriodEnd,
                            stripeCurrentPeriodStart: currentPeriodStart,
                            stripeTrialEnd: trialEnd,
                            amount: amount,
                            productName: productName,
                            status: 'active'
                        },
                        isSubscribed: true,
                        isAnUser: true,
                    };
                    const option = { upsert: true };
                    const updateUser = await Client.updateOne(query, update, option);
                    await Admin.updateOne({ name: 'Emily' }, { $inc: { totalEarnings: amount } })

                    console.log('user updated in subscription created', updateUser);
                    console.log(`Subscription created: ${subscription.id}`);
                } catch (err) {
                    console.error(`Error updating subscription: ${err.message}`);
                }
                break;
            case 'customer.subscription.updated':
                try {
                    console.log('subscription details', subscription);

                    if (subscription.cancel_at_period_end) {
                        const query = { _id: clientId };
                        const update = {
                            $set: {
                                'subscription.status': 'cancelled',
                                isSubscribed: false
                            }
                        };
                        const option = { upsert: false };
                        const updatedUser = await Client.updateOne(query, update, option);
                        console.log('user updated in subscription updated', updatedUser);
                    }

                    console.log(`Subscription updated: ${subscription.id}`);
                } catch (err) {
                    console.error(`Error updating subscription: ${err.message}`);
                }
                break;
            case 'customer.subscription.deleted':
                try {
                    console.log('subscription details', subscription);

                    const query = { _id: clientId };
                    const update = {
                        $set: {
                            'subscription.status': 'cancelled',
                            isSubscribed: false
                        }
                    };
                    const option = { upsert: false };
                    const updatedUser = await Client.updateOne(query, update, option);
                    console.log('user updated in subscription deleted', updatedUser);

                    console.log(`Subscription deleted: ${subscription.id}`);
                } catch (err) {
                    console.error(`Error deleting subscription: ${err.message}`);
                }
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.status(200).send('Event received');
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).send(`Server Error: ${err.message}`);
        }
    }
});

export default router;
