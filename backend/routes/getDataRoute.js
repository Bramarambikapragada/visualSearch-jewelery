import express from 'express';
import {getAllData} from '../controllers/getAllDataController.js';
import { getData } from '../controllers/getDataController.js';
import { upload } from '../middleware/cloudinaryConfig.js';
import { userAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/',  userAuth,getAllData);
router.get('/:id',userAuth,getData)

export default router;