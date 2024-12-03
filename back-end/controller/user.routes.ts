import express, { Request, Response, NextFunction } from 'express';
import userService from '../service/user.service';
import { UserInput, UserLogin } from '../types';

const userRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The unique identifier of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Get an array of users. Each item in the array represents a user.
 *     responses:
 *       200:
 *         description: An array of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching users', error });
    }
};

userRouter.get('/', getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Get details of a specific user using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.id);
        const user = await userService.getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
};

userRouter.get('/:id', getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username.
 *               email:
 *                 type: string
 *                 description: User's email.
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
// const createUser = async (req: Request, res: Response) => {
//     const { username, email, password, role } = req.body;
//     try {
//         const newUser = await userService.createUser(username, email, password, role);
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(500).json({ message: 'An error occurred while creating the user', error });
//     }
// };
// userRouter.post('/', createUser);

userRouter.post("/", async (req: Request, res:Response) => {
    try{
        const user  = <UserInput>req.body;
        const result = await userService.createUser(user);
        res.status(200).json(result)
    } catch (error){
        res.status(404).json({ message: 'User not created' });
    }

})

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticate a user by providing their username/email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user (optional if using email).
 *               email:
 *                 type: string
 *                 description: The email of the user (optional if using username).
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *               role:
 *                 type: string
 *                 description: The role of the user (optional).
 *             required:
 *               - password
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for the authenticated user.
 *                 username:
 *                   type: string
 *                   description: The username of the authenticated user.
 *                 role:
 *                   type: string
 *                   description: The role of the authenticated user.
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: An error occurred during login
 */
userRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserLogin>req.body;
        console.log("Request Body:", userInput);
        const response = await userService.authenticate(userInput);

        // Assuming response includes a 'token' property
        const { token, username,role } = response;

        res.status(200).json({
            message: "Authentication successful",
            token,
            username,
            role

        });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Login error:", error);

        // Return a standardized error response
        res.status(400).json({
            status: "error",
            errorMessage: "Invalid credentials",
        });

        // Pass the error to the next middleware for further handling (if needed)
        next(error);
    }
});
﻿



// userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { username, role } = req.auth;

//         const users = await userService.getAllUsers({ username }, {role});

//         res.status(200).json(users);
//     } catch (error) {
//         next(error);
//     }
// });

// userRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {

//     try {
//         const userInput = <UserInput>req.body;

//         const response = await userService.loginUser(userInput);

//         const { token, username, role } = response;

//         res.status(200).json({
//             message : "Successfully logged in",
//             token,
//             username,
//             role
//         });
//     } catch (error) {
//         res.status(400).json({ message: "error with authentication"});
//     }
// });


export { userRouter };
