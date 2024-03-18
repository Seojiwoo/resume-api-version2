import express from "express";
import { ResumeController } from "../controller/resume.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { ResumeService } from "../service/resume.service.js";
import { ResumeRepository } from "../repository/resume.repository.js";
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();
// PostsController를 인스턴스화 시킨다
const resumeRepository = new ResumeRepository(prisma);
const resumeService = new ResumeService(resumeRepository);
const resumeController = new ResumeController(resumeService);

router.post("/resume", authMiddleware, resumeController.createResume);

router.get("/resume", resumeController.getAllResumes);

router.get("/resume/:resumeId", authMiddleware, resumeController.getResumeById);

router.put("/resume/:resumeId", authMiddleware, resumeController.updateResume);

router.delete(
  "/resume/:resumeId",
  authMiddleware,
  resumeController.deleteResume,
);

export default router;
