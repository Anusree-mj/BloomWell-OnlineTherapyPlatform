import Stripe from 'stripe';
import express from 'express';
import bodyParser from 'body-parser';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'application/json' }));

app.post('/webhook', (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('⚠️ Webhook signature verification failed.', err.message);
        return res.sendStatus(400);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            handleCheckoutSessionCompleted(session);
            break;
        case 'invoice.payment_succeeded':
            const invoice = event.data.object;
            handleInvoicePaymentSucceeded(invoice);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
});

const handleCheckoutSessionCompleted = (session) => {
    console.log('Session Completed:', session);
    // Example: Save session to your database
    // const userId = session.client_reference_id;
    // const subscriptionId = session.subscription;
    // Save userId, subscriptionId, and other relevant details to your database
};

const handleInvoicePaymentSucceeded = (invoice) => {
    console.log('Invoice Payment Succeeded:', invoice);
    // Example: Save invoice to your database
    // const subscriptionId = invoice.subscription;
    // Save subscriptionId and other relevant details to your database
};

app.listen(3000, () => {
    console.log('Webhook server is running on port 3000');
});

export default app;
