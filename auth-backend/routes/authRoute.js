import express, { response } from 'express';
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const router = express.Router();
// const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// Route for Google Sign-In
// router.post('/google-signin', async (request, response) => {
//     try {
//       const { token } = request.body;
  
//       // Verify the Google token
//       const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: GOOGLE_CLIENT_ID,
//       });
  
//       const payload = ticket.getPayload();
//       const { sub: googleId, email, name, picture } = payload;
  
//       // Check if the user already exists
//       let user = await User.findOne({ googleId });
  
//       if (!user) {
//         // If the user doesn't exist, create a new user
//         user = await User.create({
//           googleId,
//           email,
//           username: name, // Using Google name as the username
//           profilePicture: picture, // Optional field for profile picture
//         });
//       }
  
//       const userPageData = {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         profilePicture: user.profilePicture,
//       };
  
//       // Generate a JWT for the user
//       const authToken = jwt.sign(
//         { id: user._id, email: user.email },
//         JWT_SECRET,
//         { expiresIn: '24h' }
//       );
  
//       return response.status(200).json({ userPageData, token: authToken });
//     } catch (error) {
//       console.error('Error during Google Sign-In:', error.message);
//       return response.status(500).json({ message: 'Google Sign-In failed' });
//     }
//   });
  

//route for sign up
router.post('/signup', async (request, response) => {

    try {
        const { username, email, password } = request.body;
        const emailCheck = await User.findOne({ email: email });

        if (emailCheck) {

            return response.status(409).json({ message: "email exists" });
        }

        const usernameCheck = await User.findOne({ username: username });

        if (usernameCheck) {

            return response.status(409).json({ message: "username exists" });
        }

        const newUser = new User({
            username: username,
            email: email,
            password: password,
        });

        const user = await User.create(newUser);

        const userPageData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = jwt.sign(
            { username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }  // Token expires in 24 hour
        );

        return response.status(201).json({ userPageData, token });
    } catch (error) {

        return response.status(500).json({ message: error.message });
    }

});

//route for login
router.post('/login', async (request, response) => {
    try {

        const { emailOrUsername, password } = request.body;
        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
        });

        if (!user) {
            return response.json({ message: 'user doesnt exist' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return response.status(400).json({ message: "Invalid credentials" });
        }

        const userPageData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        // store in config file the process env later


        const token = jwt.sign(
            { username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }  // Token expires in 24 hour
        );

        return response.status(200).json({ userPageData, token });

    } catch (error) {

        return response.status(500).json({ message: error.message })
    }
});




router.delete('/delete', async (request, response) => {

    try {
        // Delete the user's books
        const { username, password } = request.body;

        const user = await User.findOne({ username });


        if (!user) {
            return response.json({ message: 'username or password wrong' });
        }

        const validPassword = (password === user.password);

        if (!validPassword) {
            return response.json({ message: 'username or password wrong' });
        }


        // Delete the user
        const result = await User.findOneAndDelete({ username: username });

        if (result) {
            response.status(200).json({ message: 'User deleted', result });
        } else {
            response.status(404).json({ message: 'No user found with that username' });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
        //   console.log(error.message);
    }
});

export default router;