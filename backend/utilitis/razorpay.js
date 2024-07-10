import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const instance = new Razorpay({
  key_id: 'rzp_test_mj8FaMjD2VYPW4',
  key_secret: process.env.RAZORPAY_SECRET_KEY
})

const createRazorpayOrder = async (orderId, total) => {
  const totalAmount = parseInt(total, 10)
  const options = {
    amount: totalAmount * 100,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "" + orderId
  };
  try {
    const order = await instance.orders.create(options);
    return order;
  } catch (error) {
    throw error;
  }
}

const verifyPayment = (payment) => {
  console.log('reached verifyyyyyyyyyyyyyyyyyyy')
  const secret = process.env.RAZORPAY_SECRET_KEY;
  const orderId = payment.razorpay_order_id;
  const paymentId = payment.razorpay_payment_id;
  const razorpaySignature = payment.razorpay_signature;
  // Create the hash using the payment information
  const generatedSignature = crypto.createHmac('sha256', secret)
    .update(orderId + "|" + paymentId)
    .digest('hex');
  if (generatedSignature === razorpaySignature) {
    // Payment is successful
    return { status: 'ok' }
  } else {
    console.log('payment doesnt match')
  }
}

export {
  createRazorpayOrder,
  verifyPayment
}