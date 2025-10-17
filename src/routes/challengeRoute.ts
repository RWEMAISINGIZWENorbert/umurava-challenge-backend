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
    getChallengesByStatus,
    viewLimitedChallenges 
} from "../controllers/challengeController";
import { auth } from "../middleware/Auth";

const challengeRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Challenge:
 *       type: object
 *       required:
 *         - title
 *         - deadline
 *         - duration
 *         - moneyPrize
 *         - contactEmail
 *         - description
 *         - brief
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the challenge
 *         title:
 *           type: string
 *           description: Title of the challenge
 *         deadline:
 *           type: string
 *           format: date
 *           description: Deadline for the challenge
 *         duration:
 *           type: string
 *           description: Duration of the challenge
 *         moneyPrize:
 *           type: number
 *           description: Prize money for the challenge
 *         contactEmail:
 *           type: string
 *           description: Contact email for the challenge
 *         description:
 *           type: string
 *           description: Detailed description of the challenge
 *         brief:
 *           type: string
 *           description: Brief overview of the challenge
 *         deliverables:
 *           type: array
 *           items:
 *             type: string
 *           description: List of deliverables for the challenge
 *         status:
 *           type: string
 *           enum: [open, closed]
 *           default: open
 *           description: Status of the challenge
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Date when the challenge was created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: Date when the challenge was last updated
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Challenges
 *   description: Challenge management API
 */

/**
 * @swagger
 * /api/challenges:
 *   get:
 *     summary: Get all challenges
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all challenges
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: boolean
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Challenge'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
challengeRouter.get('/challenges', auth, viewAllChallengeController);

/**
 * @swagger
 * /api/search/{key}:
 *   get:
 *     summary: Search challenges by keyword
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Search keyword
 *     responses:
 *       200:
 *         description: Challenges matching the search criteria
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
challengeRouter.get('/search/:key', auth, searchChallenge);

/**
 * @swagger
 * /api/challenge/{id}:
 *   get:
 *     summary: Get a challenge by ID
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Challenge ID
 *     responses:
 *       200:
 *         description: Challenge details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Challenge'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Challenge not found
 *       500:
 *         description: Server error
 */
challengeRouter.get('/challenge/:id', auth, viewChallengeController);

/**
 * @swagger
 * /api/limitedChallenges/{id}:
 *   get:
 *     summary: Get limited challenges by ID
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Limit ID
 *     responses:
 *       200:
 *         description: Limited challenges
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
challengeRouter.get('/limitedChallenges/:id', auth, viewLimitedChallenges);

/**
 * @swagger
 * /api/allChallenges:
 *   get:
 *     summary: Get total count of all challenges
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total number of challenges
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
challengeRouter.get('/allChallenges', auth, totalAllChallenges);

/**
 * @swagger
 * /api/openChallenges:
 *   get:
 *     summary: Get total count of open challenges
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total number of open challenges
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
challengeRouter.get('/openChallenges', auth, totalOpenChallenges);

/**
 * @swagger
 * /api/closedChallenges:
 *   get:
 *     summary: Get total count of closed challenges
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total number of closed challenges
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
challengeRouter.get('/closedChallenges', auth, totalClosedChallenges);

/**
 * @swagger
 * /api/admin/{adminId}:
 *   get:
 *     summary: Get challenges by admin ID
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: adminId
 *         schema:
 *           type: string
 *         required: true
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: Challenges created by the admin
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
challengeRouter.get('/admin/:adminId', auth, getChallengesByAdmin);

/**
 * @swagger
 * /api/status/{status}:
 *   get:
 *     summary: Get challenges by status
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *           enum: [open, closed]
 *         required: true
 *         description: Challenge status (open or closed)
 *     responses:
 *       200:
 *         description: Challenges with the specified status
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
challengeRouter.get('/status/:status', auth, getChallengesByStatus);

/**
 * @swagger
 * /api/create:
 *   post:
 *     summary: Create a new challenge
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - deadline
 *               - duration
 *               - moneyPrize
 *               - contactEmail
 *               - description
 *               - brief
 *             properties:
 *               title:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date
 *               duration:
 *                 type: string
 *               moneyPrize:
 *                 type: number
 *               contactEmail:
 *                 type: string
 *               description:
 *                 type: string
 *               brief:
 *                 type: string
 *               deliverables:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Challenge created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
challengeRouter.post('/create', auth, createNewChallenge);

/**
 * @swagger
 * /api/edit/{id}:
 *   put:
 *     summary: Update a challenge
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Challenge ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date
 *               duration:
 *                 type: string
 *               moneyPrize:
 *                 type: number
 *               contactEmail:
 *                 type: string
 *               description:
 *                 type: string
 *               brief:
 *                 type: string
 *               deliverables:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 type: string
 *                 enum: [open, closed]
 *     responses:
 *       200:
 *         description: Challenge updated successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Challenge not found
 *       500:
 *         description: Server error
 */
challengeRouter.put('/edit/:id', auth, updateChallengeController);

/**
 * @swagger
 * /api/update-delete/{id}:
 *   put:
 *     summary: Soft delete a challenge
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Challenge ID
 *     responses:
 *       200:
 *         description: Challenge soft deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Challenge not found
 *       500:
 *         description: Server error
 */
challengeRouter.put('/update-delete/:id', auth, deleteChallengeController);

/**
 * @swagger
 * /api/delete-p/{id}:
 *   delete:
 *     summary: Permanently delete a challenge
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Challenge ID
 *     responses:
 *       200:
 *         description: Challenge permanently deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Challenge not found
 *       500:
 *         description: Server error
 */
challengeRouter.delete('/delete-p/:id', auth, deletePChallengeController);

export default challengeRouter;