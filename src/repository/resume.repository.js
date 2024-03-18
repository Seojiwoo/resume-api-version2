export class ResumeRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  // 데이터베이스 입력
  createResume = async (userId, title, introduction, author, status) => {
    const resume = await this.prisma.resume.create({
      data: {
        userId: +userId,
        title,
        introduction,
        author,
        status,
      },
    });
    return resume;
  };

  getAllResumes = async () => {
    const resumes = await this.prisma.resume.findMany({
      select: {
        resumeId: true,
        title: true,
        introduction: true,
        author: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return resumes;
  };

  getResumeById = async (resumeId) => {
    const resume = await this.prisma.resume.findFirst({
      where: { resumeId: +resumeId },
      select: {
        resumeId: true,
        title: true,
        introduction: true,
        author: true,
        status: true,
        createdAt: true,
        userId: true,
      },
    });
    return resume;
  };

  updateResume = async (resumeId, title, introduction, status) => {
    const resume = await this.prisma.resume.update({
      data: {
        title,
        introduction,
        status: status || "APPLY",
      },
      where: {
        resumeId: +resumeId,
      },
    });

    if (!resume) {
      return null;
    }

    return resume;
  };

  deleteResume = async (resumeId) => {
    await this.prisma.resume.delete({
      where: { resumeId: +resumeId },
    });
  };
}
