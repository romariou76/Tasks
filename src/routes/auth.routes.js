import { Router } from 'express';
import { login, register, logout, verifyToken, getAllUsers } from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
const router = Router()

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", verifyToken, logout);
router.get("/verify", verifyToken);

router.get("/getUsers", getAllUsers);

export default router