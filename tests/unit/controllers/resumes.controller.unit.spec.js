import { beforeEach, jest } from "@jest/globals";
import { ResumesController } from "../../../src/controller/resume.controller.js";

const mockResumesService = {
  getAllResumes: jest.fn(),
  getResumeById: jest.fn(),
  createResume: jest.fn(),
  updateResume: jest.fn(),
  deleteResume: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const mockNext = jest.fn();
const resumesController = new ResumesController(mockResumesService);

describe("Resumes Controller Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockResponse.status.mockReturnValue(mockResponse);
  });

  test("getResumes Method by Success", async () => {
    const sampleResumes = [
      {
        resumeId: 1,
        userId: 1,
        title: "전체 조회용 제목 테스트",
        introduction: "전체 조회용 컨텐츠 테스트",
        author: "전체 조회용 작성자 테스트",
        status: "APPLY",
      },
      {
        resumeId: 2,
        userId: 1,
        title: "전체 조회용 제목 테스트2",
        introduction: "전체 조회용 컨텐츠 테스트2",
        author: "전체 조회용 작성자 테스트2",
        status: "APPLY",
      },
    ];

    mockResumesService.getAllResumes.mockResolvedValue(sampleResumes);
    await resumesController.getAllResumes(mockRequest, mockResponse, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: sampleResumes });
  });

  test("createResume Method by Success", async () => {
    const createResumeRequestBodyParams = {
      userId: 1,
      title: "이력서 생성 컨트롤러 테스트 : 타이틀",
      introduction: "이력서 생성 컨트롤러 테스트 : 본문",
      status: "APPLY",
    };

    mockRequest.body = createResumeRequestBodyParams;
    mockResumesService.createResume.mockReturnValue(
      Promise.resolve("이력서 생성 완료"),
    );

    await resumesController.createResume(mockRequest, mockResponse, mockNext);

    expect(mockResumesService.createResume).toHaveBeenCalledWith(
      createResumeRequestBodyParams.userId,
      createResumeRequestBodyParams.title,
      createResumeRequestBodyParams.introduction,
      createResumeRequestBodyParams.status,
    );
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: "이력서 생성 완료",
    });
  });
});
