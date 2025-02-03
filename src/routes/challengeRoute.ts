import { Router } from "express";
import { 
    createNewChallenge, 
    deleteChallengeController, 
    deletePChallengeController, 
    updateChallengeController, 
    searchChallenge, 
    totalAllChallenges, 
    totalClosedChallenges, 
    totalOpenChallenges, 
    viewAllChallengeController, 
    viewChallengeController, 
    getChallengesByAdmin, 
    getChallengesByStatus 
} from "../controllers/challengeController";
import { auth } from "../middleware/Auth";

const challengeRouter = Router();

challengeRouter.get('/challenges', auth, viewAllChallengeController);
challengeRouter.get('/search/:key', auth, searchChallenge);
challengeRouter.get('/challenge/:id', auth, viewChallengeController);
challengeRouter.get('/allChallenges', auth, totalAllChallenges);
challengeRouter.get('/openChallenges', auth, totalOpenChallenges);
challengeRouter.get('/closedChallenges', auth, totalClosedChallenges);
challengeRouter.get('/admin/:adminId', auth, getChallengesByAdmin);
challengeRouter.get('/status/:status', auth, getChallengesByStatus);
challengeRouter.post('/create', auth, createNewChallenge);
challengeRouter.put('/edit/:id', auth, updateChallengeController);
challengeRouter.put('/update-delete/:id', auth, deleteChallengeController);
challengeRouter.delete('/delete-p/:id', auth, deletePChallengeController);

export default challengeRouter;