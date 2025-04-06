import express from 'express';
import { signup,loginUser, logoutUser } from '../controllers/authController.js';
import { userAuth } from '../middleware/auth.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);
authRouter.get('/', userAuth, async (req, res) => {
    res.status(200).json({ message: 'Authenticated' });
  });

export default authRouter;
