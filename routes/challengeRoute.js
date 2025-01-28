import { Router } from "express";
import { createNewChallenge, deleteChallengeController, editChallenge, searchChallenge, totalAllChallenges, totalClosedChallenges, totalOpenChallenges, viewAllChallengeController, viewChallengeController, viewLimitedChallenges } from "../controllers/challengeController.js";
import { auth } from "../middleware/Auth.js";
const challengeRouter = Router();

challengeRouter.get('/challenges', auth, viewAllChallengeController);
challengeRouter.get('/search/:key', auth, searchChallenge);
challengeRouter.get('/challenge/:id', auth, viewChallengeController);
challengeRouter.get('/limitedChallenges/:id', auth, viewLimitedChallenges);
challengeRouter.get('/allChallenges', auth, totalAllChallenges);
challengeRouter.get('/openChallenges', auth, totalOpenChallenges);
challengeRouter.get('/closedChallenges', auth, totalClosedChallenges);
challengeRouter.post('/create', auth, createNewChallenge);
challengeRouter.put('/edit/:id', auth, editChallenge);
challengeRouter.put('/update-delete/:id', auth, deleteChallengeController);

export default challengeRouter;