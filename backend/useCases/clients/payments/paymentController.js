import Stripe from "stripe";
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const getPaymentDetails = async (req, res) => {
    try {
        const prices = await stripe.prices.list({
            limit: 3
        });
        res.status(200).json({ products: prices.data.reverse() });
    } catch (err) {
        console.log('Error found', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const postPaymentDetails = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id;
    console.log('userId in checkout stripe session', userId)
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: productId,
                    quantity: 1
                }
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_APP_URL}/client/`,
            cancel_url: `${process.env.NEXT_APP_URL}/`,
            subscription_data: {
                metadata: {
                    payingUserId: userId.toString()
                },
                trial_period_days: 14
            }
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