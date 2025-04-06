import express from 'express';
import { searchJewelry } from '../controllers/searchController.js';
import { upload } from '../middleware/cloudinaryConfig.js';
import { userAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/search',userAuth, upload.single('image'), searchJewelry);

export default router;
