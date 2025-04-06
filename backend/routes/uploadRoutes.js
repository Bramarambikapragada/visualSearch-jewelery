import express from 'express';
import { uploadProduct } from '../controllers/uploadController.js';
import { upload } from '../middleware/cloudinaryConfig.js';
import { userAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/upload', userAuth ,upload.single('image'), uploadProduct);

export default router;
