import express from "express";
import { register, login, getMe, logout, refreshToken } from "../controllers/authController.js";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";
import protect from "../middleware/authmiddleware.js";

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: "Too many attempts, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});


const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),

  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Valid email required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain a number"),
];

const loginValidation = [
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Valid email required"),

  body("password").notEmpty().withMessage("Password is required"),
];


const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};

router.post("/register", authLimiter, registerValidation, validate, register);

router.post("/login", authLimiter, loginValidation, validate, login);

router.post("/logout", logout);

router.post("/refresh-token", refreshToken);

router.get("/me",protect, getMe);

export default router;
