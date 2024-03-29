export class ResumeService {
  constructor(resumeRepository) {
    this.resumeRepository = resumeRepository;
  }

  // 회원가입
  createResume = async (userId, title, introduction, author, status) => {
    const createdresume = await this.resumeRepository.createResume(
      userId,
      title,
      introduction,
      author,
      status,
    );

    return createdresume;
  };

  getAllResumes = async () => {
    const getAllResumes = await this.resumeRepository.getAllResumes();

    return getAllResumes;
  };

  getResumeById = async (resumeId, userId) => {
    const getResumeById = await this.resumeRepository.getResumeById(resumeId);

    if (!getResumeById) {
      return null;
    }

    return getResumeById;
  };

  updateResume = async (resumeId, title, introduction, status) => {
    const updateResume = await this.resumeRepository.updateResume(
      resumeId,
      title,
      introduction,
      status,
    );

    if (!updateResume) {
      return null;
    }

    return updateResume;
  };

  deleteResume = async (resumeId) => {
    const deleteResume = await this.resumeRepository.deleteResume(resumeId);

    if (!deleteResume) {
      return null;
    }

    return deleteResume;
  };
}
