import { CreateUserDto } from "../dtos/createUserDto";
import prisma from "../../prisma/context";
import { GraphQLError } from "graphql";

export class UserService {
  /**
   * 유저 생성
   **/
  public async createUser(createUserDto: CreateUserDto) {
    // 유저 가입 여부 확인
    const user = await prisma.user.findFirst({
      where: { email: createUserDto.email },
    });
    // 이미 가입한 유저인 경우
    if (user) {
      throw new GraphQLError("이미 가입된 유저입니다.", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    // 유저 생성 후 생성된 유저 반환
    return await prisma.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
        name: createUserDto.name,
      },
    });
  }
}
