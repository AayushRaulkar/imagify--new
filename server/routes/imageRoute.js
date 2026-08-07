import express from 'express';
import { 
  generateImage, 
  enhancePrompt, 
  getUserHistory, 
  deleteHistoryItem 
} from '../controllers/imageController.js';
import userAuth from '../middlewares/auth.js';

const imageRouter = express.Router();

imageRouter.post('/generate-image', userAuth, generateImage);
imageRouter.post('/enhance-prompt', userAuth, enhancePrompt);
imageRouter.get('/user-history', userAuth, getUserHistory);
imageRouter.delete('/history/:id', userAuth, deleteHistoryItem);

export default imageRouter;
