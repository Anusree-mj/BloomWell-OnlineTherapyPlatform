import Stripe from "stripe";
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const getPaymentDetails = async (req, res) => {
    try {
        const prices = await stripe.prices.list({
            limit: 3
        });
        console.log(prices.data, 'reached')
        res.status(200).json({ prices: prices.data.reverse() });
    } catch (err) {
        console.log('Error found', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const postPaymentDetails = async (req, res) => {
    const { priceId } = req.body;
    console.log('reached with id:', priceId)
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            mode: 'subscription',
            ui_mode: 'embedded',
            success_url: `${process.env.NEXT_APP_URL}/client/welcome`,
            cancel_url: `${process.env.NEXT_APP_URL}/`
        })
        res.status(200).json({ url: session.url });

    } catch (err) {
        console.log('Error found', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export {
    getPaymentDetails,
    postPaymentDetails,
}