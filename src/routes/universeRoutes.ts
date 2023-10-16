import express from 'express';
import { createNewConstellation } from '../controllers/universeController';

const router = express.Router();

router.post('/createConstelation', createNewConstellation); 

export default router;
