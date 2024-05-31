
import Therapists from "../../../entities/therapists/therapist.js";
import Reviews from "../../../entities/therapists/reviews.js"
import Client from "../../../entities/clients/clients.js";

const saveTherapistData = async (data) => {
    try {
        const { email, licenseNo, expertise, country, expiryDate, experience,
            gender, description, image } = data

        const query = { email: email }
        const update = {
            license: {
                licenseNo: licenseNo,
                country: country,
                expirationDate: expiryDate
            },
            expertise: expertise,
            experience: experience,
            gender: gender,
            description: description,
            image: image
        }
        const options = { upsert: true }
        const response = await Therapists.updateOne(query, update, options)
        if (response) {
            const therapist = await Therapists.findOne({ email: email }).select('-password -createdAt -updatedAt');
            return { status: 'ok', therapist }
        } else {
            return { status: 'nok', message: 'Therapist not found' }
        }
    } catch (err) {
        console.log(err)
    }
}

const getTherapistData = async (therapistId) => {
    try {
        const therapist = await Therapists.findOne({ _id: therapistId }).select('-password-createdAt -updatedAt')
        if (therapist) {
            const therapistReviews = await Reviews.find({ therapistId: therapistId });
            const ratings = calculateRating(therapistReviews);
            const reviews = [];

            for (const review of therapistReviews) {
                const client = await Client.findById(review.clientId);
                const reviewWithClientName = {
                    ...review.toObject(),
                    clientName: client.name
                };
                reviews.push(reviewWithClientName);
            }
            console.log('reviewsss', reviews)
            return { status: 'ok', therapist, ratings, reviews }
        } else {
            console.log('no therapist found')
            return { status: 'nok' }
        }
    }
    catch (err) {
        console.log(err)
    }
}

 const calculateRating = (reviews) => {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const numRatings = reviews.length;
    const averageRating = totalRating / numRatings;
    console.log('average', averageRating)
    return averageRating;
}
export default {
    saveTherapistData,
    getTherapistData,
}
