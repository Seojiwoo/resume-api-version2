import { beforeEach, jest } from "@jest/globals";
import { UsersController } from "../../../src/controller/users.controller.js";
import { mockRequest, mockResponse } from "jest-mock-express";

const mockUsersService = {
  loginUser: jest.fn(),
  findAllUsers: jest.fn(),
  updateUserInfo: jest.fn(),
  createUser: jest.fn(),
  deleteUser: jest.fn(),
};

const mockNext = jest.fn();
const usersController = new UsersController(mockUsersService);

describe("Users Controller Unit Test", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = mockRequest();
    res = mockResponse();
  });

  test("userSignUp", async () => {
    const userData = {
      email: "test@example.com",
      password: "password123",
      passwordcheck: "password123",
      name: "서지우",
    };
    req.body = userData;

    await usersController.createUser(req, res, mockNext);

    expect(mockUsersService.createUser).toHaveBeenCalledWith(
      userData.email,
      userData.password,
      userData.passwordcheck,
      userData.name,
      expect.anything(),
    );
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test("userSignIn", async () => {
    await usersController.loginUser(req, res, mockNext);

    expect(mockUsersService.loginUser).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("inquiryUser", async () => {
    await usersController.inquiryUser(req, res, mockNext);

    expect(mockUsersService.findAllUsers).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("deleteUser", async () => {
    req.params.userId = "1";

    await usersController.deleteUser(req, res, mockNext);

    expect(mockUsersService.deleteUser).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    s;
  });
});
