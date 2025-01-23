import { Router } from "express";
import { createNewChallenge, deleteChallengeController, editChallenge, viewAllChallengeController } from "../controllers/challengeController.js";
import { auth } from "../middleware/Auth.js";
const challengeRouter = Router();

challengeRouter.get('/challenges', auth, viewAllChallengeController);
challengeRouter.post('/create', auth, createNewChallenge);
challengeRouter.put('/edit', auth, editChallenge);
challengeRouter.put('/update-delete', auth, deleteChallengeController);

export default challengeRouter;