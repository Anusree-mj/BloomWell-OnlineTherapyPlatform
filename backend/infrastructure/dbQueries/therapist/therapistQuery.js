
import Therapists from "../../../entities/therapists/therapist.js";
import Reviews from "../../../entities/therapists/reviews.js"
import Client from "../../../entities/clients/clients.js";
import Notifications from "../../../entities/users/notificationModel.js";

const saveTherapistData = async (data) => {
    try {
        const { email, licenseNo, expertise, country, expiryDate, experience,
            gender, description, image } = data
        const currentTherapist = await Therapists.findOne({ email: email });
        const query = { email: email }
        const updatedLicense = {
            ...currentTherapist.license,
            country: country,
            expirationDate: expiryDate
        };
        const update = {
            license: updatedLicense,
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
            await Notifications.insertMany({
                userId: therapist._id,
                userType: 'Therapists',
                head: 'Welcome to BloomWell',
                message: "We are delighted to have you with us. You can start your therapy sessions once your profile has been verified.",
            })
            return { status: 'ok', therapist }
        } else {
            return { status: 'nok', message: 'Therapist not found' }
        }
    } catch (err) {
        console.log(err)
    }
}

const getTherapistDataWithReviews = async (therapistId) => {
    try {
        const therapist = await Therapists.findOne({ _id: therapistId }).select('-password -createdAt -updatedAt')
        if (therapist) {
            const therapistReviews = await Reviews.find({ therapistId: therapistId });
            const ratings = calculateRating(therapistReviews);
            const reviews = [];

            for (const review of therapistReviews) {
                const client = await Client.findById(review.clientId);
                if (client) {  // Ensure client is not null
                    const reviewWithClientName = {
                        ...review.toObject(),
                        clientName: client.name
                    };
                    reviews.push(reviewWithClientName);
                } else {
                    // Handle the case where the client is not found, if necessary
                    console.log(`Client with ID ${review.clientId} not found`);
                }
            }
            console.log('reviews', reviews);
            return { status: 'ok', therapist, ratings, reviews };
        } else {
            console.log('No therapist found');
            return { status: 'nok' };
        }
    }
    catch (err) {
        console.log(err);
        return { status: 'error', message: err.message };
    }
}


const calculateRating = (reviews) => {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const numRatings = reviews.length;
    const averageRating = totalRating / numRatings;
    console.log('average', averageRating)
    return averageRating;
}


const getTherapistData = async (therapistId) => {
    try {
        const therapist = await Therapists.findOne({ _id: therapistId }).select('-password -createdAt -updatedAt');;
        if (therapist) {
            return { status: 'ok', therapist }
        } else {
            return { status: 'nok', message: 'Therapist not found' }
        }
    } catch (err) {
        console.log(err)
    }
}



export default {
    saveTherapistData,
    getTherapistDataWithReviews,
    getTherapistData,
}
