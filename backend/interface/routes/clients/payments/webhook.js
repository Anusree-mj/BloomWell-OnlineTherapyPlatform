import express from 'express';
import Stripe from "stripe";
import dotenv from 'dotenv';
dotenv.config();
import Client from "../../../../entities/clients/clients.js";
import bodyParser from 'body-parser';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.ENDPOINT_SECRET;



router.post('/', async (req, res) => {
    try {
        const buf = await req.text();
        const sig = req.headers.get("stripe-signature");

        let event = Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
        } catch (err) {
            console.error(`Error deleting subscription: ${err.message}`);
             res.status(400).json({ error: { message: `Webhook Error:${err.message}` } })
        }
        console.log("✅ Success:", event.id);

        const subscription = event.data.object.subscription;
        const subscriptionId = subscription.id;

        // Handle the event
        switch (event.type) {
            case 'customer.subscription.created':
                try {
                    const subscription = event.data.object;
                    const query = { 'subscription.stripeCustomerId': subscription.customer };
                    const update = {
                        'subscription.stripeSubscriptionId': subscriptionId,
                        isSubscribed: true
                    };
                    await Client.updateOne(query, update);
                    console.log(`Subscription created: ${subscription.id}`);
                } catch (err) {
                    console.error(`Error updating subscription: ${err.message}`);
                }
                break;
            case 'customer.subscription.deleted':
                try {
                    const subscription = event.data.object;
                    const query = { 'subscription.stripeCustomerId': subscription.customer };
                    const update = { isSubscribed: false };
                    await Client.updateOne(query, update);
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
            res.status(400).json({ error: { message: `Webhook Error:${err.message}` } })

    }
});

export default router;
