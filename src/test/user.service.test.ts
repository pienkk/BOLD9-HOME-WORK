import { User } from "@prisma/client";
import { UserService } from "../services/UserService";
import { CreateUserDto } from "../dtos/createUserDto";
import prisma from "../../prisma/context";

describe("UserService 유저 비즈니스 로직", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe("createUser() 유저 생성", () => {
    // 유저 생성 정보
    const createUserDto: CreateUserDto = {
      email: "kisuk623@gmail.com",
      name: "장기석",
      password: "Qwerasd!22",
    };
    // DB 유저 정보
    const existingUser: User = {
      id: 1,
      email: "kisuk623@gmail.com",
      name: "장기석",
      password: "Qwerasd!22",
      createdAt: new Date("2022-03-01"),
    };

    // 성공
    it("유저 가입 성공 시 유저 정보를 반환한다.", async () => {
      // prisma Mock
      const prismaUserFindUniqueSpy = jest
        .spyOn(prisma.user, "findUnique")
        .mockResolvedValue(null);
      const prismaUserCreateSpy = jest
        .spyOn(prisma.user, "create")
        .mockResolvedValue(existingUser);

      const result = await userService.createUser(createUserDto);

      expect(prismaUserFindUniqueSpy).toHaveBeenCalledWith({
        where: { email: "kisuk623@gmail.com" },
      });
      expect(prismaUserCreateSpy).toBeCalledTimes(1);
      expect(result).toEqual({
        id: 1,
        email: "kisuk623@gmail.com",
        name: "장기석",
        password: "Qwerasd!22",
        createdAt: new Date("2022-03-01"),
      });
    });

    // 실패
    it("이미 가입된 유저일 시 이미 가입된 유저라는 예외를 던진다.", async () => {
      // prisma Mock
      const prismaFindUniqueMock = jest
        .spyOn(prisma.user, "findUnique")
        .mockResolvedValue(existingUser);

      const result = async () => {
        return userService.createUser(createUserDto);
      };

      expect(result).rejects.toThrow("이미 가입된 유저입니다.");
    });
  });
});
