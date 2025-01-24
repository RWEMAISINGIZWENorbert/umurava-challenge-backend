import { Router } from "express";
import { createNewChallenge, deleteChallengeController, editChallenge, viewAllChallengeController, viewChallengeController, viewLimitedChallenges } from "../controllers/challengeController.js";
import { auth } from "../middleware/Auth.js";
const challengeRouter = Router();

challengeRouter.get('/challenges', auth, viewAllChallengeController);
challengeRouter.get('/challenge/:id', auth, viewChallengeController);
challengeRouter.get('/limitedChallenges/:id', auth, viewLimitedChallenges);
challengeRouter.post('/create', auth, createNewChallenge);
challengeRouter.put('/edit', auth, editChallenge);
challengeRouter.put('/update-delete', auth, deleteChallengeController);

export default challengeRouter;