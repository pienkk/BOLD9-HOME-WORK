import { validateOrReject } from "class-validator";
import { CreateUserDto } from "../../dtos/createUserDto";
import { UserService } from "../../services/UserService";
import { User } from "@prisma/client";

const userService = new UserService();

export const userResolvers = {
  Mutation: {
    /**
     * 유저 생성
     */
    async createUser(
      _parent: void,
      args: { input: CreateUserDto }
    ): Promise<User> {
      // input값 할당
      const createUserDto = new CreateUserDto();
      createUserDto.email = args.input.email;
      createUserDto.password = args.input.password;
      createUserDto.name = args.input.name;

      // input값 검증
      await validateOrReject(createUserDto);

      // 유저 생성 결과 반환
      return await userService.createUser(createUserDto);
    },
  },
};
