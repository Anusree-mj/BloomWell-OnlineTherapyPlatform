import asyncHandler from 'express-async-handler'
import User from '../entities/userModel.js';
import { generateToken } from '../utilitis/token.js';
import userAuthQueries from '../infrastructure/dbQueries/user/userAuthQueries.js';

// auth user
const authUser = async (email, password) => {
    try {
        console.log('entereed in user controllerrrrrrrrr');
        const user = await userAuthQueries.userDoLogin(email, password);
        if (user) {
            const token = generateToken(user._id);
            return { status: 'ok', user, token }
        } else {
            return { status: 'nok' }
        }
    } catch (error) {
        console.log('Error found', error)
    }
}


const auther = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password)) && !user.isBlocked) {
        generateToken(res, user._id)
        res.status(200).json({
            status: 'ok',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                isBlocked: user.isBlocked
            },
        });
    } else if (user.isBlocked) {
        res.status(401).json({ status: 'nok', message: 'User is blocked' });
    } else {
        res.status(401).json({ status: 'nok', message: 'Invalid email or password' });
    }
});


// upload image
// const uploadImage = asyncHandler(async (req, res) => {
//     const relativeImagePath = req.file.path.replace(/\\/g, '/').split('/public')[1];
//     const imageUrl = `${req.protocol}://${req.get('host')}/public${relativeImagePath}`;
//     res.status(200).json({ imageUrl });
// })

// register user
// const registerUser = asyncHandler(async (req, res) => {
//     const { name, email, password, image } = req.body
//     const userExists = await User.findOne({ email })
//     if (userExists) {
//         res.status(401).json({ status: 'nok', message: 'User already exists' });
//     }
//     const user = await User.create({
//         name,
//         email,
//         password,
//         image
//     });

//     if (user) {
//         generateToken(res, user._id)
//         res.status(201).json({
//             status: 'ok',
//             user: {
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 image: user.image,
//                 isBlocked: user.isBlocked
//             }
//         })
//     } else {
//         res.status(400).json({ status: 'nok', message: 'Error Occured' });
//     }

// })
// get user 
// const getUser = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id);

//     if (user && user.isBlocked !== true) {
//         return res.status(200).json({ status: 'ok' });
//     } else {
//         return res.json({ status: 'nok', message: 'User is blocked by the admin' });
//     }
// });


// update user
// const updateUserProfile = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id);

//     if (user) {
//         user.name = req.body.name || user.name;
//         user.email = req.body.email || user.email;
//         user.image = req.body.image || user.image;


//         const updatedUser = await user.save();
//         res.status(201).json({
//             status: 'ok',
//             user: {
//                 _id: updatedUser._id,
//                 name: updatedUser.name,
//                 email: updatedUser.email,
//                 image: updatedUser.image,
//             }
//         })

//     } else {
//         res.status(400).json({ status: 'nok', message: 'Error Occured' });
//     }
// });



export {
    authUser,
    // registerUser,
    // updateUserProfile,
    // uploadImage,
    // getUser
}