import express from 'express';
import Stripe from "stripe";
import dotenv from 'dotenv';
dotenv.config();
import Client from "../../../../entities/clients/clients.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.ENDPOINT_SECRET;


router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
    let event;
    try {
        console.log('reached in routes')
        const sig = req.headers["stripe-signature"];

        console.log('sig:::', sig)

        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log("✅ Success:", event.id);
    } catch (err) {
        console.error(`Error deleting subscription: ${err.message}`);
        res.status(400).json({ error: { message: `Webhook Error:${err.message}` } })
    }

    try {
        const subscription = event.data.object;
        const subscriptionId = subscription.id;
        const clientId = event.data.object.metadata.payingUserId;

        // Handle the event
        switch (event.type) {
            case 'customer.subscription.created':
                try {
                    const subscription = event.data.object;
                    console.log('subscription details', subscription)
                    const query = { _id: clientId };
                    const update = {
                        stripeCustomerId: subscription.customer,
                        stripeSubscriptionId:subscriptionId,
                        isSubscribed: true
                    };
                    const option = { upsert: false }
                    const updateUser = await Client.updateOne(query, update, option);
                    console.log('user updated in subscription created', updateUser)
                    console.log(`Subscription created: ${subscription.id}`);
                } catch (err) {
                    console.error(`Error updating subscription: ${err.message}`);
                }
                break;
            case 'customer.subscription.deleted':
                try {
                    const subscription = event.data.object;
                    console.log('subscription details', subscription)

                    const query = { _id: clientId };
                    const update = { isSubscribed: false };
                    const option = { upsert: false }
                    const updatedUser = await Client.updateOne(query, update, option);
                    console.log('user updated in subscription created', updatedUser)

                    console.log(`Subscription deleted: ${subscription.id}`);
                } catch (err) {
                    console.error(`Error deleting subscription: ${err.message}`);
                }
                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        // Return a 200 response to acknowledge receipt of the event
        res.status(200).send('Event received');
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).send(`Server Error: ${err.message}`);
        }
    }
});

export default router;
