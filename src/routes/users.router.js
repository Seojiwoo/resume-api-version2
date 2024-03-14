import express from "express";
import { UsersController } from "../controller/users.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { UsersService } from "../service/users.service.js";
import { UsersRepository } from "../repository/users.repository.js";
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();
// PostsController를 인스턴스화 시킨다
const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

// 회원가입 api
router.post("/sign-up", usersController.createUser);

// 로그인
router.post("/sign-in", usersController.loginUser);

// 회원조회
router.get("/user", authMiddleware, usersController.inquiryUser);

export default router;
